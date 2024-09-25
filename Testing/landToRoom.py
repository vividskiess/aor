import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

dataset = pd.read_csv("prices.csv")

data = pd.DataFrame(dataset)
data.dropna(inplace=True)

# Original data
X = data[['Price']]
Y = data['Landsize']

# X train varaibles are X variables that haven been sepertaed and trained? X_test is the  
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, Y_train)

Y_pred = model.predict(X_test)

print(Y_pred)
plt.figure()
plt.scatter(X_test, Y_test)
plt.plot(X_test, Y_pred, color='blue', linewidth=3, label='Predicted values')
plt.xlabel('Price')
plt.ylabel('Distance from CBD')
plt.title('Three House Bedroom Prices based on distance from CBD')
plt.show()
