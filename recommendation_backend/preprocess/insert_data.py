from processor import MovieDataProcessor
from inserter import DataInserter
from pathlib import Path


def main():
    DATABASE_URL = "mysql+mysqlconnector://root:123456Aa@localhost:3307/recommendation_backend"
    DATA_FILE_URL = Path(__file__).parent / "movie_data.csv"
    
    processor = MovieDataProcessor(DATA_FILE_URL)
    inserter = DataInserter(DATABASE_URL)
    
    try:
        # Process the data
        processed_data = processor.process()
        
        # Insert the data into the database
        inserter.insert_all_data(processed_data)
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()