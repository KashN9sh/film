from fastapi import FastAPI

from user.router  import router as user_router
from film.router  import router as film_router

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_router)
app.include_router(film_router)
