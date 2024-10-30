from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from pydantic import BaseModel
import matplotlib.pyplot as plt
from model import HousingDataAnalyzer, PropertyFilter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

analyzer = HousingDataAnalyzer("../MachineLearning/datasets/processed/processed_housing_market.csv")

@app.get("/")
async def root():
    return {"message": "Welcome to ROA API"}

#initialise model below
#model = modelName() #replace modelName


@app.get("/SuburbAnalytics/{Postcode}")
async def suburb_analytics(Postcode: int):
    try:
        analytics = analyzer.get_suburb_analytics(Postcode)
        if isinstance(analytics, str):  # If no data found, return a 404 error
            raise HTTPException(status_code=404, detail=analytics)
        return analytics
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.post("/filter_properties")
async def filter_properties(filter: PropertyFilter):
    try:
        print(f"Received filter: {filter.dict()}")
        Price_range = (filter.min_price, filter.max_price) if filter.min_price is not None and filter.max_price is not None else None
        
        properties = analyzer.get_filtered_properties(filter.Postcode, filter.Type, Price_range)
        
        if isinstance(properties, str):  # If no data found, return a 404 error
            raise HTTPException(status_code=404, detail=properties)
        
        return properties  
    
    except Exception as e:
        print(f"Error occurred: {e}")  # Log the error for debugging
        raise HTTPException(status_code=500, detail="Internal Server Error")

    # Create Price_range tuple if min_price and max_price are provided
    #Price_range = (filter.min_price, filter.max_price) if filter.min_price and filter.max_price else None
    
    # Get filtered properties based on the request body filters
    #properties = analyzer.get_filtered_properties(filter.Postcode, filter.Type, Price_range)
    
    #if isinstance(properties, str):  # If no data found, return a 404 error
    #    raise HTTPException(status_code=404, detail=properties)
    
    # Limit to 6 properties
    #return properties[:6]



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



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)