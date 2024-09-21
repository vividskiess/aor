import pandas as pd
import numpy as np
# import os 
# from sklearn.model_selection import train_test_split, cross_val_score
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.preprocessing import LabelEncoder
# from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error, median_absolute_error
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn import datasets

# read file
filePath = './Datasets/MELBOURNE_HOUSE_PRICES_LESS (full).csv'
df = pd.read_csv(filePath)
df.drop_duplicates(inplace=True)

# count null values
# print(df.isnull().sum().sort_values(ascending = False))
# print('\n')

# remove null values
cleaneddf = df[df['Price'].notnull()]
# print(cleaneddf.isnull().sum())
# print('\n')

df = cleaneddf.copy()
# print(df['Regionname'].unique())

# plt.figure(figsize=(10, 6))
# plt.scatter(df['Rooms'], df['Price'], alpha=0.6, color='b')
# plt.title('Scatter Plot of Average Rooms vs. House Price')
# plt.xlabel('Average Number of Rooms per Household (AveRooms)')
# plt.ylabel('House Price (in $100,000)')
# plt.grid(True)
# plt.show()

plt.figure(figsize=(12, 10))
corr_matrix = df.corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', linewidths=0.5)
plt.title('Correlation Matrix Heatmap')
plt.show()

