import pandas as pd
import numpy as np
# import os 
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler

# read file
filePath = './Datasets/melb_data (snapshot).csv'
df = pd.read_csv(filePath)
df.drop_duplicates(inplace=True)

# count null values
print(df.isnull().sum().sort_values(ascending = False))


# change object data types to category 
objdtype_cols = df.select_dtypes(["object"]).columns
df[objdtype_cols] = df[objdtype_cols].astype('category')
# convert data from category to datetime 
df['Date'] =  pd.to_datetime(df['Date'], format='%d/%m/%Y')
# convert postcode from data to category
df["Postcode"] = df["Postcode"].astype('category')

# Shows missing values
sns.heatmap(df.isnull(), yticklabels = False, cmap = 'viridis')
plt.show()

# drop columns where alot of data is missing
df = df.drop(['Bedroom2', 'Landsize', 'BuildingArea', 'YearBuilt'], axis=1)

# remove null values
df.dropna(subset=["Price"], inplace=True)

# remove outliers where prices were less than $100,000 or more than $7,000,000
df.drop(df[(df['Price'] <= 100000) | (df['Price'] >= 7000000)].index, inplace = True )

# remove outliers where rooms were over 10
df.drop(df[(df['Rooms'] > 12)])

# print(df.describe().T)


# plt.rcParams['figure.figsize'] = (14,4)
# plt.rcParams['axes.edgecolor'] = 'black'
# plt.rcParams['axes.linewidth'] = 1.5
# plt.rcParams['figure.frameon'] = True
# plt.rcParams['axes.spines.top'] = False
# plt.rcParams['axes.spines.right'] = False
# plt.rcParams["font.family"] = "monospace"

# Distribution graph of house prices vs number of houses
sns.displot(df['Price'], color ='b')
plt.axvline(x = df['Price'].mean(), color='b', linestyle='--', linewidth=2)
plt.title('Sales')
# plt.show()

# Bar plot showing distribution of houses
region_count = df['Regionname'].value_counts()
# plt.figure(figsize = (10, 5))
sns.barplot(region_count, alpha = 0.8)
plt.title("Houses distribution in regions")
plt.xlabel('Region')
plt.ylabel('Number of houses')
# plt.show()

# Pricing based on distance
sns.lmplot(x="Distance", y="Price", data=df, x_estimator=np.mean);
# plt.show()

# Scatter plot
plt.figure(figsize=(14, 12))
plt.scatter(df['Rooms'], df['Price'], alpha=0.6, color='b')
plt.title('Scatter Plot of Average Rooms vs. House Price')
plt.xlabel('Average Number of Rooms per Household (AveRooms)')
plt.ylabel('House Price (in $100,000)')
plt.grid(True)
# plt.show()

# Correlation matrix 
numerical_dataset = df.select_dtypes(include=['number'])
plt.figure(figsize=(12, 6))
corr_matrix = numerical_dataset.corr()
sns.heatmap(
  numerical_dataset.corr(),
  cmap = 'BrBG',
  fmt = '.2f',
  linewidths = 2,
  annot = True)
plt.title('Correlation Matrix Heatmap')
# plt.show()




# model training
# s = (df.dtypes == 'object')
# object_cols = list(s[s].index)
# print("Categorical variables:")
# print(object_cols)
# print('No. of. categorical features: ', len(object_cols))

# df_final = df.drop(object_cols, axis=1)

# X = df_final.drop(['Price'], axis = 1)
# Y = df_final['Price']

# # Split the training set into training and validation set
# X_train, X_test, Y_train, Y_test = train_test_split(X, Y, train_size=0.8, test_size=0.2, random_state=0)

# # Standardize the features
# scaler = StandardScaler()
# X_train_scaled = scaler.fit_transform(X_train)
# X_test_scaled = scaler.transform(X_test)

# model_LR = LinearRegression()
# model_LR.fit(X_train, Y_train)
# Y_pred = model_LR.predict(X_test)

# print('Mean Squared Error: %.2f' % mean_squared_error(Y_test, Y_pred))
# print('R^2 Score: %.2f' % r2_score(Y_test, Y_pred))
