import pandas as pd
from typing import Dict
from pathlib import Path


class MovieDataProcessor:
    # Constructor
    def __init__(self, data_path: str):
        self.data_path = Path(data_path)
        
        # Columns to keep
        self.columns_to_keep = [
            "id", "title", "vote_average", "vote_count", "status",
            "release_date", "runtime", "adult", "backdrop_path", "original_language",
            "overview", "popularity", "poster_path", "tagline", "genres",
            "production_companies", "production_countries", "spoken_languages", "keywords"
        ]
        
        # Columns in movie table
        self.movie_table_columns = [
            "id", "title", "vote_average", "vote_count", "status", "release_date",
            "runtime", "adult", "backdrop_path", "original_language",
            "overview", "popularity", "poster_path", "tagline"
        ]
        
        # Columns in the data that need to be normalized
        self.columns_to_normalize = [
            "genres", "production_companies", "production_countries", 
            "spoken_languages", "keywords"
        ]
        
    
    # Clean data method
    def clean_data(self) -> pd.DataFrame:
        try:
            df = pd.read_csv(self.data_path)
            return df[self.columns_to_keep].copy()
        except FileNotFoundError:
            raise FileNotFoundError(f"File not found at {self.data_path}")
        except Exception as e:
            raise Exception(f"An error occurred while reading the CSV file: {e}")
        
    
    # Methods to normalize data
    @staticmethod
    def extract_multivalue_to_tables(df: pd.DataFrame, column_name: str) -> pd.DataFrame:
        processed_df = df[column_name].str.split(", ").explode().reset_index(drop=True)
        return processed_df.to_frame(name=f"{column_name}_name").drop_duplicates()


    @staticmethod
    def create_associative_table(df: pd.DataFrame, column_name: str) -> pd.DataFrame:
        exploded_df = df.copy()
        exploded_df[column_name] = exploded_df[column_name].str.split(', ')
        exploded_df = exploded_df.explode(column_name).reset_index(drop=True)
        return exploded_df[['id', column_name]].rename(columns={column_name: f"{column_name}_name"})
    
    
    def process(self) -> Dict[str, pd.DataFrame]:
        # Get cleaned data
        clean_df = self.clean_data()
        
        result = {
            'movie': clean_df[self.movie_table_columns],
        }
        
        # Normalize data
        for column in self.columns_to_normalize:
            result[column] = self.extract_multivalue_to_tables(clean_df, column)
            result[f"{column}_associative"] = self.create_associative_table(clean_df, column)
        
        return result
    

# Example usage
if __name__ == "__main__":
    data_processor = MovieDataProcessor("movie_data.csv")
    processed_data = data_processor.process()
    
    # Print the processed data
    for key, value in processed_data.items():
        print(f"{key}:\n{value.head()}\n")