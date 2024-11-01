import sys

sys.path.append('..')
import pandas as pd
from sqlalchemy import Column, Integer, String, Float
from typing import Dict, Union, List, Optional
from pydantic import BaseModel, Field
from MachineLearning.models.regression import RegressionModel
from MachineLearning.models.cluster import ClusterModel

# Define a pydantic model for property filtering criteria
class PropertyFilter(BaseModel):
    Postcode: Optional[int] = Field(None, ge=3000, le=3999)
    Type: Optional[str] = Field(None, pattern="^[htu]$", description="Property type: 'h' for house, 't' for townhouse, 'u' for unit")
    min_price: Optional[int] = Field(None, gt=0)
    max_price: Optional[int] = Field(None, gt=0)

# Class for loading and analyzing housing data
class HousingDataAnalyzer:
    def __init__(self, csv_file: str):
        # Loads the data from the CSV file and creates a linear regression model with the CSV file
        try:
            self.data = pd.read_csv(csv_file)
            self.regression_model = RegressionModel(csv_file)
            self.cluster_model = ClusterModel(csv_file)

        except Exception as e:
            # Print and raise error if file fails to load
            print(f"Failed to load data from {csv_file}: {str(e)}")
            raise ValueError(f"Failed to load data from {csv_file}: {str(e)}")
        
    # Method for getting min, max and average price based on postcode
    def get_suburb_analytics(self, Postcode: int) -> Union[Dict[str, float], str]:
        try:
            # Filter the data for the specified postcode
            filtered_data = self.data[self.data['Postcode'] == Postcode]
            # Check if there are any records for this postcode
            if filtered_data.empty:
                return f"No data available for postcode {Postcode}."
            

            try:
                # Calculate min, max and average 
                min_price = filtered_data['Price'].min()
                max_price = filtered_data['Price'].max()
                avg_price = filtered_data['Price'].mean()
                median_price = filtered_data['Price'].median()
                
                # Calculate land size statistics
                min_land_size = filtered_data['Landsize'].min()
                max_land_size = filtered_data['Landsize'].max()
                avg_land_size = filtered_data['Landsize'].mean()
                
                # Calculate room statistics
                min_rooms = filtered_data['Rooms'].min()
                max_rooms = filtered_data['Rooms'].max()
                avg_rooms = filtered_data['Rooms'].mean()
                
                # Get suburb name, region name, and school count (if available)
                suburb_name = filtered_data['Suburb'].iloc[0] if 'Suburb' in filtered_data else None
                region_name = filtered_data['Regionname'].iloc[0] if 'Regionname' in filtered_data else None
                school_count = filtered_data['SchoolCount'].iloc[0] if 'SchoolCount' in filtered_data else 0

            except Exception as e:
                # Print and raise error if fail to calculate analytics
                print(f"Error calculating analytics: {str(e)}") 
                return "Error calculating analytics."

            # Return the analytics as a dictionary
            return {
                "postcode": Postcode,
                "min_price": round(min_price, 2),
                "max_price": round(max_price, 2),
                "avg_price": round(avg_price, 2),
                "median_price": round(median_price, 2),
                "min_land_size": round(min_land_size, 2) if min_land_size is not None else None,
                "max_land_size": round(max_land_size, 2) if max_land_size is not None else None,
                "avg_land_size": round(avg_land_size, 2) if avg_land_size is not None else None,
                "suburb": suburb_name,
                "region_name": region_name,
                "school_count": school_count,
            }
        except KeyError as e:
            return f"Key error: {str(e)} - Check if 'postcode' and 'price' columns exist in the dataset."
        except Exception as e:
            return f"An error occurred: {str(e)}"
    
    def get_paginated_data(self, page: int = 1, page_size: int = 64) -> Dict[str, Union[List[Dict[str, Union[str, float]]], int, int]]:
        
        # Fetch paginated data from the dataset
        # Returns all fields for each property.
        start = (page - 1) * page_size
        end = start + page_size

        # Get a slice of the data for the requested page
        paginated_data = self.data.iloc[start:end]

        # Convert to a list of dictionaries including all columns
        items = paginated_data.to_dict(orient="records")

        # Return the paginated response
        return {
            "items": items,
            "total": len(self.data),
            "page": page,
            "page_size": page_size
        }
        
    def get_rooms_vs_prices(self, Postcode: Optional[int] = None) -> Union[Dict[str, List[float]], str]:
        try:
            # Filter data by postcode if provided
            data = self.data[self.data['Postcode'] == Postcode] if Postcode else self.data
            
            # Check if data is available
            if data.empty:
                return "No data available for the specified criteria."

            # Extract rooms and prices for plotting
            rooms = data['Rooms'].tolist()
            prices = data['Price'].tolist()

            return {
                "rooms": rooms,
                "prices": prices
            }
        except KeyError as e:
            return f"Key error: {str(e)} - Check if 'Rooms' and 'Price' columns exist in the dataset."
        except Exception as e:
            return f"An error occurred: {str(e)}"
        
    # Method to get all property data
    def get_all_properties(self) -> pd.DataFrame:
        return self.data

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
            #
            return "Error filtering properties"
        

    def predict_monthly_prices(self, year: int) -> Union[Dict[str, float], str]:
        if not hasattr(self, "YearModel") or not self.YearModel:
            return "Prediction model not loaded."
        
        try:
            monthly_predictions = {}
            for month in range(1, 13):
                prediction = self.YearModel.predict(year, month)
                monthly_predictions[f"{year}-{month:02}"] = round(prediction, 2)
            
            return monthly_predictions

        except Exception as e:
            print(f"Error in monthly predictions: {e}")
            return "Error generating monthly predictions."



    def get_prices_by_bedroom(self, Postcode: int, Bedroom: int) -> Union[Dict[str, float], str]:
        try:
            # Gets the predicted price from the linear regression model using postcode and bedroom
            predicted_price = self.regression_model.predict_price_by_room(Postcode, Bedroom)

            # Returns the relevant information
            return {
                "price": predicted_price
            }
        
        except KeyError as e:
            return f"Key error: {str(e)} - Check if 'postcode' and 'price' columns exist in the dataset."
        
        except Exception as e:
            return f"An error occurred: {str(e)}"


    def get_prices_by_landsize(self, Postcode: int, Landsize: int) -> Union[Dict[str, float], str]:
        try:
            # Gets the predicted price from the linear regression model using postcode and landsize
            predicted_price_landsize = self.regression_model.predict_price_by_landsize(Postcode, Landsize)
            # Returns the relevant information
            return {
                "price": predicted_price_landsize
            }
        
        except KeyError as e:
            return f"Key error: {str(e)} - Check if 'postcode' and 'price' columns exist in the dataset."
        
        except Exception as e:
            return f"An error occurred: {str(e)}"
        

    def get_clusters_of_years(self, Postcode: int): 
        try:
            # Gets the predicted price from the linear regression model using postcode and bedroom
            clusters = list(self.cluster_model.cluster_year_built(Postcode)['Cluster'])
            year_built = list(self.cluster_model.cluster_year_built(Postcode)['YearBuilt'])

            # Returns the relevant information
            return {
                "clusters": clusters,
                "year_built": year_built
            }
        
        except KeyError as e:
            return f"Key error: {str(e)} - Check if 'postcode' and 'price' columns exist in the dataset."
        
        except Exception as e:
            return f"An error occurred: {str(e)}"
