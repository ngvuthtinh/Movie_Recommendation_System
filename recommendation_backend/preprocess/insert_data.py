from .inserter import insert_all
from app.cores.database import get_db
from pathlib import Path
from app.cores.database import Base


def main():
    db = next(get_db())
    
    # Create tables if they do not exist
    Base.metadata.create_all(bind=db.bind)
    
    data_path = Path(__file__).parent /'data'/'normalized_movie_data.pkl' 
    
    insert_all(db, data_path)
    print("Data insertion completed successfully.")


if __name__ == "__main__":
    main()