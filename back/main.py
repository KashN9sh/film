from fastapi import FastAPI

from user.router  import router as user_router
from film.router  import router as film_router
from developer.router  import router as developer_router


# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_router)
app.include_router(film_router)
app.include_router(developer_router)
