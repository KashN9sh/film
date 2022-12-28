import typer
from lib.database import engine
from config import MODEL_MODULES

manager = typer.Typer()

@manager.command()
def syncdb():
    SyncManager(
        engine=engine,
        model_modules=MODEL_MODULES,
    ).run()

if __name__ == "__main__":
    manager()
