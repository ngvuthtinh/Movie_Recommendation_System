# main.py
from fastapi import FastAPI
from app.cores.cors import setup_cors
from app.api.routes import login_route
from app.api.routes import register_route
from app.api.routes import recommendation_route
from app.api.routes import utils_route
from app.api.routes import create_room_route
from app.api.routes import login_room_route
from app.api.routes import user_route
from app.api.routes import movie_route
from app.api.routes import room_route

app = FastAPI()

setup_cors(app)

# Include the authentication and registration routes
app.include_router(login_route.router)
app.include_router(register_route.router)
# Include the recommendation and movie retrieval routes
app.include_router(recommendation_route.router)
app.include_router(utils_route.router)

# Include the room-related routes
app.include_router(create_room_route.router)
app.include_router(login_room_route.router)

# Include the user profile routes
app.include_router(user_route.router)
app.include_router(room_route.router)

# Include the movie-related routes
app.include_router(movie_route.router)
