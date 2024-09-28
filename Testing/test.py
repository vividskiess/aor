import pandas as pd
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
from sklearn.cluster import KMeans
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import numpy as np


# Reads data from both CSV file and puts it into variables.
first_dataset = pd.read_csv('/Datasets/melb_data (snapshot).csv')
second_dataset = pd.read_csv('/Datasets/Melbourne_housing_FULL.csv')

# Combines both datasets into one data frame variable. 
df = pd.concat([first_dataset, second_dataset])

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


schools_df = pd.read_csv('/Datasets/victoria-schools-2018.csv')


