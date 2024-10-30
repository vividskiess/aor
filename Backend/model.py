import pandas as pd
from sqlalchemy import Column, Integer, String, Float
from typing import Dict, Union, List, Optional
from pydantic import BaseModel, Field
    
class PropertyFilter(BaseModel):
    Postcode: Optional[int] = Field(None, ge=3000, le=3999)
    Type: Optional[str] = Field(None, pattern="^[htu]$", description="Property type: 'h' for house, 't' for townhouse, 'u' for unit")
    min_price: Optional[int] = Field(None, gt=0)
    max_price: Optional[int] = Field(None, gt=0)

class HousingDataAnalyzer:
    def __init__(self, csv_file: str):
        # Load the CSV file data
        try:
            self.data = pd.read_csv(csv_file)
            print("Loaded columns:", self.data.columns)
            print("Data types:\n", self.data.dtypes)
        except Exception as e:
            print(f"Failed to load data from {csv_file}: {str(e)}")
            raise ValueError(f"Failed to load data from {csv_file}: {str(e)}")
        
    
    def get_suburb_analytics(self, Postcode: int) -> Union[Dict[str, float], str]:
        try:
            # Filter the data for the specified postcode
            filtered_data = self.data[self.data['Postcode'] == Postcode]
            # Check if there are any records for this postcode
            if filtered_data.empty:
                return f"No data available for postcode {Postcode}."
            
            # Calculate analytics
            try:
                min_price = filtered_data['Price'].min()
                max_price = filtered_data['Price'].max()
                avg_price = filtered_data['Price'].mean()
            except Exception as e:
                print(f"Error calculating analytics: {str(e)}")  # Debugging line
                return "Error calculating analytics."

            # Return the analytics as a dictionary
            return {
                "postcode": Postcode,
                "min_price": round(min_price, 2),
                "max_price": round(max_price, 2),
                "avg_price": round(avg_price, 2)
            }
        except KeyError as e:
            return f"Key error: {str(e)} - Check if 'postcode' and 'price' columns exist in the dataset."
        except Exception as e:
            return f"An error occurred: {str(e)}"
        

    def get_filtered_properties(self, Postcode: int = None, Type: str = None, Price_range: tuple = None) -> Union[List[Dict[str, Union[str, float]]], str]:
        try:
            filtered_data = self.data

            if Postcode:
                filtered_data = filtered_data[filtered_data['Postcode'] == Postcode]

            if Type in ['h', 't', 'u']:
                filtered_data = filtered_data[filtered_data['Type'] == Type]

            if Price_range:
                filtered_data = filtered_data[(filtered_data['Price'] >= Price_range[0]) & (filtered_data['Price'] <= Price_range[1])]

            # Check if there are any records after filtering
            if filtered_data.empty:
                return "No properties found with the specified criteria."

            # Limit to 6 properties and return relevant information
            properties = filtered_data.head(6).to_dict(orient='records')
            return [
                {
                    "Price": round(property['Price'], 2),
                    "Bedroom": property['Rooms'],
                    "Bathroom": property['Bathroom'],
                    "LandSize": property['Landsize'],
                }
                for property in properties
            ]
        except Exception as e:
            print(f"Error in filtering properties: {e}")  # Log error details
            return "Error filtering properties"