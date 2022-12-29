from importlib import import_module

from alembic.autogenerate import compare_metadata
from alembic.migration import MigrationContext

from .database import Base


class SyncManager:

    def __init__(self, engine, clean=False, model_modules: list = None):
        """
        Конструктор.
        :param clean: Удалять лишние объекты (таблицы, колонки, индексы)
        """
        self._clean = clean
        self._engine = engine
        self._model_modules = model_modules or []

    def run_ddl(self, connection):
        # Загрузим модули с моделями, чтобы ddl увидел
        # все модели приложения перед вычислением diff
        for model_module in self._model_modules:
            import_module(model_module)

        delay_ops = []
        created_tables = []

        # Информация о состоянии БД
        migration_context = MigrationContext.configure(
            connection=connection,
        )

        diff = compare_metadata(migration_context, Base.metadata)

        for op in diff:
            try:
                name = op[0]
                if type(name) == tuple:
                    name = name[0]

                if name == "add_column":
                    print("Добавляю колонку", op[3])
                    migration_context.impl.add_column(table_name=op[2], column=op[3], schema=op[1])

                elif name == "add_table":
                    migration_context.impl.create_table(table=op[1])
                    print("Добавляю таблицу", op[1].name)
                    created_tables.append(op[1].name)

                elif name == "remove_column":
                    if self._clean:
                        print("Удаляю колонку", op[2], op[3].name)
                        migration_context.impl.drop_column(table_name=op[2], column=op[3], schema=op[1])

                elif name == "remove_table":
                    if self._clean:
                        try:
                            print("Удаляю таблицу", op[1].name)
                            migration_context.impl.drop_table(table=op[1])
                        except Exception as exc:
                            print(exc)

                elif name == "add_constraint":
                    print("Добавляю ограничение", op[1])
                    migration_context.impl.add_constraint(const=op[1])

                elif name == "remove_constraint":
                    if self._clean:
                        print("Удаляю ограничение", op[1])
                        migration_context.impl.drop_constraint(const=op[1])

                elif name == "remove_fk":
                    pass  # Ничего не делаем - и так удалиться при удалении колонки

                elif name == "remove_index":
                    if self._clean:
                        print("Удаляю индекс", op[1])
                        migration_context.impl.drop_index(index=op[1])

                elif name in ("add_index", "add_fk"):
                    delay_ops.append(op)

                elif name == "modify_nullable":
                    for op_ in op:
                        print("Изменяю nullable", op_[2], op_[3], op_[6])
                        migration_context.impl.alter_column(
                            table_name=op_[2],
                            column_name=op_[3],
                            nullable=op_[6],
                            server_default=op_[4]["existing_server_default"],
                            existing_type=op_[4]["existing_type"],
                            existing_nullable=op_[5],
                        )

                elif name == "modify_comment":
                    for op_ in op:
                        print("Изменяю комментарий", op_[2], op_[3], op_[6])
                        migration_context.impl.alter_column(
                            table_name=op_[2],
                            column_name=op_[3],
                            comment=op_[6],
                            existing_comment=op_[5],
                        )

                else:
                    print("Неизвестная операция", op)

            except Exception as exc:
                print("Error apply %s: %s" % (op, exc))

        for op in delay_ops:
            name = op[0]

            if name == "add_index":
                print("Добавляю индекс", op[1])

                try:
                    # Если была создана таблица, то все инжексы создались вместе
                    # с инструкцией по созданию таблицы и так
                    table_name = op[1].table.name
                    if table_name not in created_tables:
                        migration_context.impl.create_index(index=op[1])
                except Exception as exc:
                    print(exc)

            if name == "add_fk":
                print(f"Добавляю внешний ключ {op[1]}")
                try:
                    migration_context.impl.add_constraint(const=op[1])
                except Exception as exc:
                    print(exc)

    def run(self):
        """Вычислить расхождения и применить изменения в базу данных"""
        with self._engine.begin() as connection:
            self.run_ddl(connection=connection)
