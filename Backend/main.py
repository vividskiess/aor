from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from pydantic import BaseModel
import matplotlib.pyplot as plt
from model import HousingDataAnalyzer, PropertyFilter, LandSizePredictionRequest, BedroomPredictRequest

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow requests from the frontend, specifically from localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize an instance of the housing data analyzer with processed housing market CSV file
analyzer = HousingDataAnalyzer("../MachineLearning/datasets/processed/processed_housing_market.csv")

# Root endpoint with basic API status check
@app.get("/")
async def root():
    return {"message": "Welcome to ROA API"}

# Endpoint for returning analytic data based on postcode
@app.get("/SuburbAnalytics/{Postcode}")
async def suburb_analytics(Postcode: int):
    try:
        # Get suburb analytics based on postcode
        analytics = analyzer.get_suburb_analytics(Postcode)

        # If no data found, return a 404 error
        if isinstance(analytics, str):
            raise HTTPException(status_code=404, detail=analytics)
        
        # Get rooms vs prices data for the specified postcode
        rooms_vs_prices = analyzer.get_rooms_vs_prices(Postcode)
        
        # If rooms_vs_prices returns an error string, handle it appropriately
        if isinstance(rooms_vs_prices, str):
            rooms_vs_prices = {"error": rooms_vs_prices}
        return {
            "analytics": analytics,
            "rooms_vs_prices": rooms_vs_prices
        }
    
    except Exception as e:
        # Return a 500 status code with error details with any unexpected errors
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Endpoint to get paginated properties
@app.get("/properties")
async def get_properties(page: int = 1, page_size: int = 64):
    # Fetch a paginated list of properties. If no properties are found, a 404 error is raised.
    try:
        # Get paginated data using the analyzer instance
        response = analyzer.get_paginated_data(page=page, page_size=page_size)

        # Check if the response has no items, and return 404 error if empty
        if not response["items"]:
            raise HTTPException(status_code=404, detail="No properties found.")

        return response

    except Exception as e:
        # Handle unexpected errors with a 500 status code
        raise HTTPException(status_code=500, detail="Internal server error")

# Endpoint for getting the predicted price of a house based on the amount of bedroom
@app.post("/Infographics/Bedroom")
async def predict_property_prices(request: BedroomPredictRequest):
    if request.bedroom < 1 or request.bedroom > 10: 
        raise HTTPException(status_code=400, detail="Bedroom amount must be between 1 and 10.")

    try:
        # Gets the prediected price from the analyzer based on the given postcode and bedrrom 
        predictions = analyzer.get_prices_by_bedroom(request.postcode, request.bedroom)
        
        # If no data found, return a 404 error
        if isinstance(predictions, str): 
            raise HTTPException(status_code=404, detail=predictions)

        return predictions

    except Exception as e:
        # Return a 500 status code with error details with any unexpected errors
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    
# Endpoint for getting the predicted price of a house based on the landsize
@app.post("/Infographics/Landsize")
async def predict_prices_landsize(request: LandSizePredictionRequest):
    if request.landsize < 10 or request.landsize > 10000:
        raise HTTPException(status_code=400, detail="Landsize value must be between 10 and 10000.")

    try:
        # Gets the predicted price from analyzer based on given landsize and postcode from the request body
        predict = analyzer.get_prices_by_landsize(request.postcode, request.landsize)

        # If no data found, return a 404 error
        if isinstance(predict, str):
            raise HTTPException(status_code=404, detail=predict)

        return predict
    
    except Exception as e:
        # Return a 500 status code with error details with any unexpected errors
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    
# Endpoint for getting the years and clusters of a house sold based on the postcode
@app.get("/Infographics/YearBuilt/{postcode}")
async def predict_prices_landsize(postcode: int):
    try: 
        predict = analyzer.get_clusters_of_years(postcode)

        # If no data found, return a 404 error
        if isinstance(predict, str):
            raise HTTPException(status_code=404, detail=predict)
        
        return predict
    
    except Exception as e:
        # Return a 500 status code with error details with any unexpected errors
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


# Endpoint for getting random properties
@app.get("/properties/random-properties")
async def get_random_properties():
    try:
        # Fetch all property data from the analyzer
        all_properties = analyzer.get_all_properties()
        
        # Check if there are enough properties in the dataset
        if len(all_properties) < 6:
            raise HTTPException(status_code=404, detail="Not enough properties in the dataset.")

        # Select six random properties from the dataset
        random_properties = all_properties.sample(6).to_dict(orient="records")

        return random_properties

    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


# Run the FastAPI application if the script is executed directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
