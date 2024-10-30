from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from pydantic import BaseModel
import matplotlib.pyplot as plt
from model import HousingDataAnalyzer, PropertyFilter

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

#initialise model below
#model = modelName() #replace modelName
YearModel = modelName()


# Endpoint for returning analytic data based on postcode
@app.get("/SuburbAnalytics/{Postcode}")
async def suburb_analytics(Postcode: int):
    try:
        # Get suburb analytics based on postcode
        analytics = analyzer.get_suburb_analytics(Postcode)

        # If no data found, return a 404 error
        if isinstance(analytics, str):
            raise HTTPException(status_code=404, detail=analytics)
        
        return analytics
    
    except Exception as e:
        # Return a 500 status code with error details with any unexpected errors
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Endpoint for filtering properties based on criteria specified
@app.post("/property")
async def filter_properties(filter: PropertyFilter):
    try:
        # Define price range tuple based on min and max price 
        Price_range = (filter.min_price, filter.max_price) if filter.min_price is not None and filter.max_price is not None else None

        # Get filtered properties from analyzer based on the criteria specified
        properties = analyzer.get_filtered_properties(filter.Postcode, filter.Type, Price_range)
        
        # If no data found, return a 404 error
        if isinstance(properties, str):
            raise HTTPException(status_code=404, detail=properties)
        
        return properties  
    
    except Exception as e:
        # Return a 500 status code with error details with any unexpected errors
        raise HTTPException(status_code=500, detail="Internal Server Error")





@app.get("/Infographics/{year}")
async def predict_property_prices(year: int):
    if year < 2016 or year > 2100:  
        raise HTTPException(status_code=400, detail="Year must be between 2020 and 2050.")
    try:
        predictions = analyzer.predict_monthly_prices(year)
        
        if isinstance(predictions, str): 
            raise HTTPException(status_code=500, detail=predictions)

        return {"year": year, "monthly_predictions": predictions}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")











#class PredictionInput(BaseModel):
#    land_size: int = Field(...,gt=0, description=":and size of property")
#    bedroom: int = Field(..., ge=1, le=10, description="Number of bedrooms")
#    postcode: int = Field(..., ge=3000, le=3999, description="Postcode of property")


#@app.get("/infographics/{land_size}/{bedroom}/{Postcode}")
#async def predict_price(land_size: int, bedroom: int, Postcode: int):
#    price = model.predict(land_size, bedroom, Postcode)[0]
#    return {"predicted_price": round(price, 2)}

#@app.post("/infographics")
#async def predict_price(input: PredictionInput):
#    try:
#        price = model.predict(input.land_size, input.bedroom, input.Postcode)[0]
#        return {"predicted_price": round(price, 2)}
#    except Exception as e:
#        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


# Run the FastAPI application if the script is executed directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)