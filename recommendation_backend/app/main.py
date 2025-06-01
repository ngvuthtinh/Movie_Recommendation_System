# main.py
from fastapi import FastAPI
from app.cores.cors import setup_cors
from app.api.routes import login_route
from app.api.routes import register_route
from app.api.routes import recommendation_route
from app.api.routes import get_all_movie_route
from app.api.routes import create_room_route

app = FastAPI()

setup_cors(app)

app.include_router(login_route.router)
app.include_router(register_route.router)
app.include_router(recommendation_route.router)
app.include_router(get_all_movie_route.router)
app.include_router(create_room_route.router)
# Các route khác nếu có