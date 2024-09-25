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
filePath = './Datasets/MELBOURNE_HOUSE_PRICES_LESS (full).csv'
df = pd.read_csv(filePath)
df.drop_duplicates(inplace=True)
# print(df.head(5))

# count null values
# print(df.isnull().sum().sort_values(ascending = False))
# print('\n')

# remove null values
# cleaneddf = df[df['Price'].notnull()]
# print(cleaneddf.isnull().sum())
# print('\n')

df['Price'] = df['Price'].fillna(df['Price'].mean())

cleaned_dataset = df.dropna()
df = cleaned_dataset.copy()

# print(df['Regionname'].unique())

plt.figure(figsize=(14, 12))
plt.scatter(df['Rooms'], df['Price'], alpha=0.6, color='b')
plt.title('Scatter Plot of Average Rooms vs. House Price')
plt.xlabel('Average Number of Rooms per Household (AveRooms)')
plt.ylabel('House Price (in $100,000)')
plt.grid(True)
# plt.show()


# creates correlation matrix 
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


s = (df.dtypes == 'object')
object_cols = list(s[s].index)
print("Categorical variables:")
print(object_cols)
print('No. of. categorical features: ', len(object_cols))

df_final = df.drop(object_cols, axis=1)
df_final = pd.concat([df_final, OH_cols], axis=1)

X = df_final.drop(['Price'], axis = 1)
Y = df_final['Price']

# Split the training set into training and validation set
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, train_size=0.8, test_size=0.2, random_state=0)

# Standardize the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model_LR = LinearRegression()
model_LR.fit(X_train, Y_train)
Y_pred = model_LR.predict(X_test)

print('Mean Squared Error: %.2f' % mean_squared_error(Y_test, Y_pred))
print('R^2 Score: %.2f' % r2_score(Y_test, Y_pred))
