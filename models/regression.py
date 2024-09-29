from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pandas as pd  

# Associates a variable with the processed data. 
df = pd.read_csv('datasets/processed/processed_housing_market.csv')

# Trains distance and price on a linear regression model so that the relation between them can be understood. 
def train_distance_price():
    distance_x = df[['Distance']]
    price_y = df['Price']

    # Splits the data so that 80% of the data is used to train the model, while the other 20% is used to test the model 
    distance_x_train, distance_x_test, price_y_train, price_y_test = train_test_split(distance_x, price_y, train_size=0.8, test_size=0.2, random_state=0)

    # Create a linear regression model that creates a fit that best represents the data using the trained data. 
    model = LinearRegression()
    model.fit(distance_x_train, price_y_train)

    # The future trajectory of the data is then prdeicted using the tested variables. 
    price_y_prediction = model.predict(distance_x_test)

    return distance_x_test, price_y_test, price_y_prediction

# Trains price and room on a linear regression model so that the relation between them can be understood. 
def train_room_price():
    price_x = df[['Price']]
    rooms_y = df['Rooms']

    # Splits the data so that 80% of the data is used to train the model, while the other 20% is used to test the model 
    price_x_train, price_x_test, rooms_y_train, rooms_y_test = train_test_split(price_x, rooms_y, train_size=0.8, test_size=0.2, random_state=0)

    # Create a linear regression model that creates a fit that best represents the data using the trained data. 
    model = LinearRegression()
    model.fit(price_x_train, rooms_y_train)

    # The future trajectory of the data is then prdeicted using the tested variables. 
    rooms_y_predictions = model.predict(price_x_test)

    # Returns the test values for the Price and Rooms columns, and Price Prediciton Value 
    return price_x_test, rooms_y_test, rooms_y_predictions

# Evaluates the regression model using Mean Squared Error and R^2 Score. 
# Mean Squared Error: Calculates the average squared difference between actual and predicted values
# R^2 Score: Measures the relationship between linear model and the dependent variables. A score closer to 1 suggest that model explain most of its variances.
def evaluate_regression():
    x_test, y_test, y_prediction = train_distance_price()

    print('Evaluating Linear Regression of Distance vs Price')
    print('- Mean Squared Error: %.2f' % mean_squared_error(y_test, y_prediction))
    print('- R^2 Score: %.2f\n' % r2_score(y_test, y_prediction))

    x_test, y_test, y_prediction = train_room_price()

    print('Evaluating Linear Regression of Room vs Price')
    print('- Mean Squared Error: %.2f' % mean_squared_error(y_test, y_prediction))
    print('- R^2 Score: %.2f' % r2_score(y_test, y_prediction))

# To evaluate the linear regression, uncomment the code below:
# evaluate_regression()