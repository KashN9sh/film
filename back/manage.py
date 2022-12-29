#!/usr/bin/env python

import typer
from lib.database import engine
from lib.syncdb import SyncManager
from config import MODEL_MODULES

manager = typer.Typer()

@manager.command()
def syncdb():
    SyncManager(
        engine=engine,
        model_modules=MODEL_MODULES,
    ).run()
    print('Hi')

if __name__ == "__main__":
    manager()
