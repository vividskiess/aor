import matplotlib.pyplot as plt
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Reads data from the CSV file and puts it into data variable.
sales = pd.read_csv("Datasets/melb_data (snapshot).csv")
rates = pd.read_csv("Datasets/rba_interest_rates.csv", skiprows=10, usecols=['Series ID', 'FIRMMCRTD'])

# Changes the sales and rates date to have the same date type. 
sales["Date"] = sales["Date"].astype('datetime64[ns]')
rates["Series ID"] = rates["Series ID"].astype('datetime64[ns]')

# Changes the current data and removes the rows with null values.
sales.dropna(inplace=True)
rates.dropna(inplace=True)

# price to interest rate, 
# find the price, match the house sale date to interest rate . 