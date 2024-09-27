import matplotlib.pyplot as plt
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Reads data from the CSV file and puts it into data variable.
df = pd.read_csv("Datasets/melb_data (snapshot).csv")

# Changes the current data and removes the rows with null values.
df.dropna(inplace=True)

# Variables that are used to determine the amount of rooms and bathrooms. 
roomAmount = int(input("Room Amount: "))
bathroomAmount = int(input("Bathroom Amount: "))

# The data is then sorted to only have the specfied room and bathroom amount. 
df = df[(df["Rooms"] == roomAmount) & (df["Bathroom"] == bathroomAmount)]

# Setting the X value to house distance and Y value to house price
X = df[["Distance"]]
Y = df["Price"]

# Splits the data so that 80% of the data is used to train the model, while the other 20% is used to test the model 
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, train_size=0.8, test_size=0.2, random_state=0)

# Create a linear regression model that creates a fit that best represents the data using the trained data. 
model = LinearRegression()
model.fit(X_train, Y_train)

# The future trajectory of the data is then prdeicted using the tested variables. 
Y_pred = model.predict(X_test)

# Shows the scatter plot and the regression. 
plt.figure()
plt.scatter(X_test, Y_test)
plt.plot(X_test, Y_pred, color='blue', linewidth=3, label='Predicted values')
plt.xlabel('Distance from the CBD')
plt.ylabel('House Price')
plt.title('Three House Bedroom Prices based on distance from CBD')
plt.show()
# Shows the scatter plot and the regression. 
plt.figure()
plt.scatter(X_test, Y_test)
plt.plot(X_test, Y_pred, color='blue', linewidth=3, label='Predicted values')
plt.xlabel('Distance from the CBD')
plt.ylabel('House Price')
plt.title('Three House Bedroom Prices based on distance from CBD')
plt.show()

# Measures the average squared difference between actual and predicted values. Lower MSE = better fit
print('Mean Squared Error: %.2f' % mean_squared_error(Y_test, Y_pred))

# Indicates the proportion of variance in the dependent variable that is predictable from the independent variables, R^2 closer to 1 = better fit
print('R^2 Score: %.2f' % r2_score(Y_test, Y_pred))
