from app.cores.database import get_db
from app.models import Movie
from sqlalchemy.orm import Session


def insert_movie_link(db: Session, movie_id: int, link: str):
    """
    Insert a movie link into the database.

    Args:
        db (Session): The database session.
        movie_id (int): The ID of the movie.
        link (str): The link to be inserted.

    Returns:
        Movie: The movie object with the inserted link.
    """
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        raise ValueError(f"Movie with id {movie_id} does not exist.")
    
    movie.movie_link = link
    db.commit()
    db.refresh(movie)
    
    return movie


if __name__ == "__main__":
    db = next(get_db())
    try:
        # movie_id = 1  # Replace with a valid movie ID
        # link = "https://example.com/movie-link"  # Replace with the actual link
        # updated_movie = insert_movie_link(db, movie_id, link)
        # print(f"Inserted link for movie: {updated_movie.title}")
        movie_link = [
            {
                "movie_id": 304, 
                "link": "https://www.youtube.com/embed/w7pYhpJaJW8?si=bl1rDEoLVSm8hImS"
            },
            
            {
                "movie_id": 16,
                "link": "https://www.youtube.com/embed/8ugaeA-nMTc?si=bl1rDEoLVSm8hImS"
            },
            
            {
                "movie_id": 110,
                "link": "https://www.youtube.com/embed/DYYtuKyMtY8?si=4Ve5VR_jzenIt2R9"
            },
            
            {
                "movie_id": 84,
                "link": "https://www.youtube.com/embed/MkvUNfySGQU?si=YVG9w4CpMq4_aJKu"
            },
            
            {
                "movie_id": 384,
                "link": "https://www.youtube.com/embed/4-BTxXm8KSg?si=lb_BjGmvOZOC-4pL"
            },
            
            {
                "movie_id": 288,
                "link": "https://www.youtube.com/embed/L3pk_TBkihU?si=kP-k9H4gZVmWZ3ML"
            },
            
            {
                "movie_id": 1297,
                "link": "https://www.youtube.com/embed/90T7iLuzFgg?si=DCD5gM69xf0oOSxI"
            },
            
            {
                "movie_id": 93,
                "link": "https://www.youtube.com/embed/m4NCribDx4U?si=oOCfgTwe4bjMPOmF"
            },
            
            {
                "movie_id": 114,
                "link": "https://www.youtube.com/embed/cSp1dM2Vj48?si=BneZgQDKj7oR9s9R"
            },
            
            {
                "movie_id": 143,
                "link": "https://www.youtube.com/embed/vw61gCe2oqI?si=BRBsYS3l5otnISIc"
            },
            
            {
                "movie_id": 300,
                "link": "https://www.youtube.com/embed/WBdyLyijZhU?si=NyylK7rV7oyqU7gU"
            },
            
            {
                "movie_id": 264,
                "link": "https://www.youtube.com/embed/ybji16u608U?si=yqQpu9d53OWiVHa8"
            },
            
            {
                "movie_id": 15,
                "link": "https://www.youtube.com/embed/TcMBFSGVi1c?si=AlRLJlbbbq7lmc9_"
            },
            
            {
                "movie_id": 33,
                "link": "https://www.youtube.com/embed/dW1BIid8Osg?si=5n_RmkWnRjJ2iVqv"
            }, 
            
            {
                "movie_id": 113,
                "link": "https://www.youtube.com/embed/pK2zYHWDZKo?si=YwOkWExTk5H11Fb8"
            },
            
            {
                "movie_id": 48,
                "link": "https://www.youtube.com/embed/1g3_CFmnU7k?si=6i50gRmXWPYyDB7s"
            },
            
            {
                "movie_id": 13,
                "link": "https://www.youtube.com/embed/8ugaeA-nMTc?si=Hh_wVk8YIm5g2SZI"
            }, 
            
            {
                "movie_id": 29,
                "link": "https://www.youtube.com/embed/hEJnMQG9ev8?si=sMgkLSnxXzJ7cjft"
            },
            
            {
                "movie_id": 76,
                "link": "https://www.youtube.com/embed/-UaGUdNJdRQ?si=0DEMmcsqUBfhP1Zq"
            }
        ]
        
        for movie in movie_link:
            movie_id = movie["movie_id"]
            link = movie["link"]
            updated_movie = insert_movie_link(db, movie_id, link)
            print(f"Inserted link for movie: {updated_movie.title}")
            
    except ValueError as e:
        print(e)