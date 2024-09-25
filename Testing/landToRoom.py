import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Reads data from the CSV file and puts it into data variable.
data = pd.read_csv("Datasets/melb_data (snapshot).csv")

# Changes the current data and removes the rows with null values.
data.dropna(inplace=True)

# Original data
X = data[['Price']]
Y = data['Landsize']


X_train, X_test, Y_train, Y_test = train_test_split(X, Y, train_size=0.8, test_size=0.2, random_state=0)

model = LinearRegression()

# X_train and Y_train used to train the model, so 80% of the data is used to train, while the rest is used to predict
model.fit(X_train, Y_train)

# We predict using the test model
Y_pred = model.predict(X_test)

plt.figure()
plt.scatter(X_test, Y_test)
plt.plot(X_test, Y_pred, color='blue', linewidth=3, label='Predicted values')
plt.xlabel('Price')
plt.ylabel('Distance from CBD')
plt.title('Three House Bedroom Prices based on distance from CBD')
plt.show()
