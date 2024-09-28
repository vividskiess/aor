import pandas as pd  

def get_data():
    # Reads data from the three CSV files and puts it into these variables.
    first_housing_dataset = pd.read_csv('Datasets/housing_market_1.csv')
    second_housing_dataset = pd.read_csv('Datasets/housing_market_2.csv')
    school_dataset = pd.read_csv('Datasets/victoria-schools-2018.csv')

    # Combines both datasets into one data frame variable. 
    df = pd.concat([first_housing_dataset, second_housing_dataset])

    # Groups schools into their postcodes, and counts how much schools are within the postcode. 
    schools_count = school_dataset.groupby('Address_Postcode').size().reset_index(name='SchoolCount')

    # Merges the address postcode and school count into the dataframe. 
    df = df.merge(schools_count, left_on='Postcode', right_on='Address_Postcode', how='left')

    # Fills the missing school count values with 0.  
    df['SchoolCount'].fillna(0)

    # Drops the address postcode column from the schools dataste as its no longer needed.
    df.drop(columns='Address_Postcode', inplace=True)

    # Drops the duplicates in the data.
    df.drop_duplicates(inplace=True)

    # Converts the columns using the object type into a category type.
    object_type_cols = df.select_dtypes(["object"]).columns
    df[object_type_cols] = df[object_type_cols].astype('category') 

    # Convert the date type from category to datetime.
    df['Date'] =  pd.to_datetime(df['Date'], format='%d/%m/%Y')

    # Convert the postcode type from data to category. 
    df["Postcode"] = df["Postcode"].astype('category')

    # drop columns where alot of data is missing TODO: Might have to change this code for the training? 
    df.drop(['Bedroom2', 'BuildingArea', 'YearBuilt'], axis=1, inplace = True)

    # Removes houses with landsizes outside of the range of 0 - 10000  
    df.drop(df[(df['Landsize'] < 0) | (df['Landsize'] > 10000)].index, inplace = True)

    # Removes rows where there is no values in the columns. 
    df.dropna(inplace=True)

    # Removes outliers where prices were less than $100,000 or more than $7,000,000.
    df.drop(df[(df['Price'] <= 100000) | (df['Price'] >= 7000000)].index, inplace = True)

    # Removes outliers where the rooms amount of the house are over 10
    df.drop(df[(df['Rooms'] > 10)].index, inplace = True)

    # Returns the processed data frame back to the caller. 
    return df

