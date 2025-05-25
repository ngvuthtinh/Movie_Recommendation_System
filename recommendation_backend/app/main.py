from fastapi import FastAPI
from app.cores.cors import setup_cors
from app.cores.database import get_db
from app.api.routes import register_route
from app.api.routes import login_route
# from app.models.movie import Movie

# FastAPI App
app = FastAPI()

# Add CORS middleware to the FastAPI app
setup_cors(app)

# db = next(get_db())
# movies = db.query(Movie)
# print(movies[0].title)

# Database connection
get_db()

# Include routers
app.include_router(register_route.router)
app.include_router(login_route.router)

