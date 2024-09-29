# COS30049 Assignment 2
This project contains files, and code necessary for machine learning.

## Team members: 
**Bennett Biju Mathew, Chee Chen Guo, Danny Cao**



## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install necessary dependencies.


## How to run the code:
Install all dependencies:
- pandas 
```bash
pip install pandas
```
- sklearn
```bash
pip install scikit-learn
```
- seaborn
```bash
pip install seaborn
```
- matplotlib
```bash
pip install matplotlib
```
- numpy
```bash
pip install numpy
```

## data_processing.py
This file contains code that handles cleaning & processing datasets. This will be used later. 
### - Reading datasets from .csv type files
```python
import pandas as pd  

first_housing_dataset = pd.read_csv('datasets/raw/housing_market_1.csv', usecols=['Suburb', 'Rooms', 'Price', 'Distance', 'Postcode', 'Bathroom', 'Landsize', 'Lattitude', 'Longtitude', 'Regionname'])
second_housing_dataset = pd.read_csv('datasets/raw/housing_market_2.csv', usecols=['Suburb', 'Rooms', 'Price', 'Distance', 'Postcode', 'Bathroom', 'Landsize', 'Lattitude', 'Longtitude', 'Regionname'])
school_dataset = pd.read_csv('datasets/raw/victoria-schools-2018.csv', usecols=['Address_Postcode'])

```
### - Merging & combining data
```python
# Combines both datasets into one data frame variable. 
df = pd.concat([first_housing_dataset, second_housing_dataset])

# Groups schools into their postcodes, and counts how much schools are within the postcode. 
schools_count = school_dataset.groupby('Address_Postcode').size().reset_index(name='SchoolCount')

# Merges the address postcode and school count into the dataframe. 
df = df.merge(schools_count, left_on='Postcode', right_on='Address_Postcode', how='left')

```
### - Drop duplicates
```python
# Fills the missing school count values with 0.  
df['SchoolCount'].fillna(0)

# Drops the address postcode column from the schools dataste as its no longer needed.
df.drop(columns='Address_Postcode', inplace=True)

# Drops the duplicates in the data.
df.drop_duplicates(inplace=True)
```
### - Converting data types from objects to categories
```python
# Converts the columns using the object type into a category type.
object_type_cols = df.select_dtypes(["object"]).columns
df[object_type_cols] = df[object_type_cols].astype('category') 

# Convert the postcode type from data to category. 
df["Postcode"] = df["Postcode"].astype('category')
```
### - Remove outliers utilizing threshold checks & null values
```python
# Removes houses with landsizes outside of the range of 0 - 10000  
df.drop(df[(df['Landsize'] < 0) | (df['Landsize'] > 10000)].index, inplace = True)

# Removes rows where there is no values in the columns. 
df.dropna(inplace=True)

# Removes outliers where prices were less than $100,000 or more than $7,000,000.
df.drop(df[(df['Price'] <= 100000) | (df['Price'] >= 7000000)].index, inplace = True)

# Removes outliers where the rooms amount of the house are over 10
df.drop(df[(df['Rooms'] > 10)].index, inplace = True)

```
### - Converts processed data to a CSV File
```python
df.to_csv('datasets/processed/processed_housing_market.csv', index=False)
```


## models/cluster.py
Contains cluster models that are used in the graphs. 

### - Trains the model to cluster data based on the land size. 
```python
# Trains the data using the land size of an area, to cluster groups of houses with similar land sizes.
def train_landsize_cluster():
	landsize_x = df.loc[:, ["Landsize"]]

	# Creates a KMeans model that groups data. 
	model = KMeans(n_clusters=10, random_state=10)
	model.fit(landsize_x)

	# Clusters the houses into 8 groups based on the land size of the house. 
	landsize_x["Cluster"] = model.predict(landsize_x)

	# Returns the the landsize count and cluster column.
	return landsize_x
```
### - Trains the model to cluster data based on the schools within the postcode.
```python
# Trains the data using the school count of an area, to cluster groups of houses with similar school counts.
def train_school_cluster():
	school_count_X = df.loc[:, ["SchoolCount"]]

	# Creates a KMeans model that groups data. 
	model = KMeans(n_clusters=10, random_state=10)
	model.fit(school_count_X)

	# Clusters the houses into 8 groups based on the land size of the house. 
	school_count_X["Cluster"] = model.predict(school_count_X)
	
	# Returns the the school count and cluster column.
	return school_count_X
```

### - Evaluates the cluster model using Silhouette Score and V-Measure Score.
```python
# Evaluates the KMeans Model using Silhouette Score + V-Measure Score.
# Silhouette Score: Ranges from -1 to 1, where a higher score indicates that the data point is well-clustered
# V-Measure Score: Ranges from 0 to 1, higher scores equals more valid cluster.
def evaluate_kmeans():
	x = train_landsize_cluster()

	# Evaluating the clusters for land size. 
	print('Evaluating Clusters for Land Size')
	print('- Silhouette Score: %.2f' % silhouette_score(x, x["Cluster"]))
	print('- V-Measure Score: %.2f\n' % v_measure_score(x["Landsize"], x["Cluster"]))
    
	x = train_school_cluster()

	# Evaluating the clusters for school count within postcode. 
	print('Evaluating Clusters for School Count')
	print('- Silhouette Score: %.2f' % silhouette_score(x, x["Cluster"]))
	print('- V-Measure Score: %.2f' % v_measure_score(x["SchoolCount"], x["Cluster"]))

```

## models/regression.py

### - Trains the model based on distance from CBD and house price.  
```python
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

```

### - Trains the model based on rooms and house price.  
```python
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
```

### - Evaluates the linear regression model using Mean Squared Error and R^2 Score. 
```
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
```

## graph.py
Contains code that is responsible for data visualization that analyze relationships between data. Code relating to graphs are grouped into its own respective functions.

### - Import libraries and processed dataset, assign dataset to a variable and add styling for charts.
```python
from models.cluster import train_landsize_cluster, train_school_cluster
from models.regression import train_distance_price, train_room_price
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd  

# Associates a variable with the processed data. 
df = pd.read_csv('datasets/processed/processed_housing_market.csv')

# Adds styling to the plot. 
plt.rcParams['figure.figsize'] = (14,4)
plt.rcParams['axes.edgecolor'] = 'black'
plt.rcParams['axes.linewidth'] = 1.5
plt.rcParams['figure.frameon'] = True
plt.rcParams['axes.spines.top'] = False
plt.rcParams['axes.spines.right'] = False
plt.rcParams["font.family"] = "monospace"

```
### - Distribution graph comparing the number of houses vs the house prices
```python
# Creates a distribution graph of number of houses vs average house prices. 
def distrubution_house_prices(): 
	sns.displot(df['Price'], color ='blue')
	plt.axvline(x = df['Price'].mean(), color='red', linestyle='--', linewidth=2)
	plt.xlabel('House Prices')
	plt.ylabel('Number of Houses')
	plt.title('Distrubution of Average Houses Prices')
	
	plt.show()
```
### - Bar graph showing the distribution of houses across regions in Victoria
```python
# Creates a new bar plot showing the distribution of houses across regions. 
def bar_house_region():
	region_count = df['Regionname'].value_counts()
	sns.barplot(region_count, alpha = 0.8)
	plt.title("Houses distribution in regions")
	plt.xlabel('Region')
	plt.ylabel('Number of houses')

	plt.show()

```
### - Correlation Matrix
```python
# Creates a correlation matrix that shows the correlation between the data.  
def correlation_data():
	numerical_dataset = df.select_dtypes(include=['number'])
	plt.figure(figsize=(12, 6))
	plt.title('Correlation Matrix Heat Map')
	sns.heatmap(
		numerical_dataset.corr(),
	    cmap = 'BrBG',
	    fmt = '.2f',
	    linewidths = 2,
	    annot = True
	)
	
	plt.show()
```

### - Scatter plot that forms clusters of houses together with similar land size.
```python
# Creates a scatter plot, that clusters groups of houses that have similar land sizes.
def scatter_landsize_location(): 
    x = train_landsize_cluster()
    
	# Creates a scatter plot that shows the location of houses, along with a color that shows the grouping of each house. 
    plt.figure(figsize=(10, 6))
    plt.scatter(df['Longtitude'], df['Lattitude'], c=x["Cluster"], cmap='viridis', edgecolors='white', linewidth=0.3)
    plt.title('Scatter Plot of Houses, Grouped by Land Sizes')
    plt.xlabel('Longtitude')
    plt.ylabel('Lattitude')
    plt.colorbar(label='Color Groups of Land Size')

	# Creates a scatter plot that shows the clusters along with the landsize. 
    plt.figure(figsize=(8, 6))
    plt.scatter(x['Landsize'], x['Cluster'], c=x["Cluster"], cmap='viridis', edgecolors='white', linewidth=0.3, s=100)
    plt.title('Scatter Plot of Landsize to Group of Houses')
    plt.xlabel('Land Size')
    plt.ylabel('Clusters')
    plt.grid(True)

    plt.show()
```
### - Scatter plot that clusters groups of houses based on schools
```python
# Creates a scatter plot, that clusters groups of houses based on schools.
def scatter_school_location():
    x = train_school_cluster()

    # Creates a scatter plot that shows the location of houses, along with a color that shows the grouping of each house. 
    plt.figure(figsize=(10, 6))
    plt.scatter(df['Longtitude'], df['Lattitude'], c=x["Cluster"], cmap='viridis', edgecolors='white', linewidth=0.3)
    plt.title('Clusters of Schools, Depicted by Longtitude and Lattitude')
    plt.xlabel('Longtitude')
    plt.ylabel('Lattitude')
    plt.colorbar(label='Color Clusters of Schools')

    plt.show()
```
### - Scatter plot that shows prices vs distance from the CBD
```python
# Creates a graph that shows prices to distance from the CBD. It uses a model to predict the trajectory of the prices.
def scatter_distance_price():
	x_test, y_test, y_prediction = train_distance_price()

    # Shows the scatter plot and the regression. 
	plt.figure()
	plt.scatter(x_test, y_test, alpha=0.5)
	plt.plot(x_test, y_prediction, color='blue', linewidth=3, label='Predicted values')
	plt.xlabel('Distance from the CBD')
	plt.ylabel('House Price')
	plt.title('House Prices vs Distance from the CBD')

	plt.show()
```

### - Scatter plot that shows house prices vs the room number amount
```python
# Creates a scatter plot that shows the house prices based on the average room amount.
def scatter_room_price():
	x_test, y_test, y_predicition = train_room_price()

	# Shows the scatter plot using the new prediciton values.
	plt.figure(figsize=(12, 10))
	plt.scatter(x_test, y_test, alpha=0.5, color='blue')
	plt.plot(x_test, y_predicition, color='red', linewidth=3, label='Predicted values')
	plt.title('Scatter Plot of Average Rooms vs. House Price')
	plt.xlabel('House Price (in $1,000,000)')
	plt.ylabel('Number of Rooms per Household')
	plt.grid(True)
	
	plt.show()
```
