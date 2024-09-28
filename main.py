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
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Reads data from both CSV file and puts it into variables.
first_dataset = pd.read_csv('./Datasets/melb_data (snapshot).csv')
second_dataset = pd.read_csv('./Datasets/Melbourne_housing_FULL.csv')

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

# Adds styling to the plot. 
plt.rcParams['figure.figsize'] = (14,4)
plt.rcParams['axes.edgecolor'] = 'black'
plt.rcParams['axes.linewidth'] = 1.5
plt.rcParams['figure.frameon'] = True
plt.rcParams['axes.spines.top'] = False
plt.rcParams['axes.spines.right'] = False
plt.rcParams["font.family"] = "monospace"

# Creates a distribution graph of number of houses vs average house prices. 
def distrubution_house_prices(): 
	sns.displot(df['Price'], color ='blue')
	plt.axvline(x = df['Price'].mean(), color='red', linestyle='--', linewidth=2)
	plt.xlabel('House Prices')
	plt.ylabel('Number of Houses')
	plt.title('Distrubution of Average Houses Prices')
	plt.show()
# Creates a new bar plot showing the distribution of houses across regions. 
def bar_house_region():
	region_count = df['Regionname'].value_counts()
	sns.barplot(region_count, alpha = 0.8)
	plt.title("Houses distribution in regions")
	plt.xlabel('Region')
	plt.ylabel('Number of houses')
	plt.show()

# Machine Learning for scatter_distance_price()
X = df[['Distance']]
Y = df['Price']

# Splits the data so that 80% of the data is used to train the model, while the other 20% is used to test the model 
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, train_size=0.8, test_size=0.2, random_state=0)

# Create a linear regression model that creates a fit that best represents the data using the trained data. 
model = LinearRegression()
model.fit(X_train, Y_train)

# The future trajectory of the data is then prdeicted using the tested variables. 
Y_pred = model.predict(X_test)

# Creates a graph that shows prices to distance from the CBD. It uses a model to predict the trajectory of the prices.
def scatter_distance_price():
	# X = df[['Distance']]
	# Y = df['Price']

	# # Splits the data so that 80% of the data is used to train the model, while the other 20% is used to test the model 
	# X_train, X_test, Y_train, Y_test = train_test_split(X, Y, train_size=0.8, test_size=0.2, random_state=0)

	# # Create a linear regression model that creates a fit that best represents the data using the trained data. 
	# model = LinearRegression()
	# model.fit(X_train, Y_train)

	# # The future trajectory of the data is then prdeicted using the tested variables. 
	# Y_pred = model.predict(X_test)

	# Shows the scatter plot and the regression. 
	plt.figure()
	# plt.scatter(X_test, Y_test, alpha=0.5)
	# plt.plot(X_test, Y_pred, color='blue', linewidth=3, label='Predicted values')
	plt.scatter(df[['Distance']], df['Price'], alpha=0.5)
	plt.plot(df[['Distance']], df['Price'], color='blue', linewidth=3, label='Predicted values')
	plt.xlabel('Distance from the CBD')
	plt.ylabel('House Price')
	plt.title('House Prices Based on the Distance from the CBD')
	plt.show()

# Machine Learning for scatter_room_price()
X = df[['Price']]
Y = df['Rooms']

# Splits the data so that 80% of the data is used to train the model, while the other 20% is used to test the model 
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, train_size=0.8, test_size=0.2, random_state=0)

# Create a linear regression model that creates a fit that best represents the data using the trained data. 
model = LinearRegression()
model.fit(X_train, Y_train)

# The future trajectory of the data is then prdeicted using the tested variables. 
Y_pred = model.predict(X_test)


# Creates a scatter plot that shows the house prices based on the average room amount.
def scatter_room_price():
	# X = df[['Price']]
	# Y = df['Rooms']


	# # Splits the data so that 80% of the data is used to train the model, while the other 20% is used to test the model 
	# X_train, X_test, Y_train, Y_test = train_test_split(X, Y, train_size=0.8, test_size=0.2, random_state=0)

	# # Create a linear regression model that creates a fit that best represents the data using the trained data. 
	# model = LinearRegression()
	# model.fit(X_train, Y_train)

	# # The future trajectory of the data is then prdeicted using the tested variables. 
	# Y_pred = model.predict(X_test)

	plt.figure(figsize=(12, 10))
	# plt.scatter(X_test, Y_test, alpha=0.5, color='blue')
	# plt.plot(X_test, Y_pred, color='red', linewidth=3, label='Predicted values')
	plt.scatter(df[['Price']], df['Rooms'], alpha=0.5, color='blue')
	plt.plot(df[['Price']], df['Rooms'], color='red', linewidth=3, label='Predicted values')
	plt.title('Scatter Plot of Average Rooms vs. House Price')
	plt.xlabel('House Price (in $1,000,000)')
	plt.ylabel('Number of Rooms per Household')
	plt.grid(True)
	plt.show()

# Creates a correlation matrix that shows the correlation between the data.  
def correlation_data():
	numerical_dataset = df.select_dtypes(include=['number'])
	plt.figure(figsize=(12, 6))
	sns.heatmap(
		numerical_dataset.corr(),
	    cmap = 'BrBG',
	    fmt = '.2f',
	    linewidths = 2,
	    annot = True
	)
	plt.title('Correlation Matrix Heat Map')
	plt.show()


# Machine learning for scatter_landsize_location()
X = df.loc[:, ["Landsize"]]

# Creates a KMeans model that groups data. 
model = KMeans(n_clusters=10, random_state=10)
model.fit(X)

# Clusters the houses into 8 groups based on the land size of the house. 
X["Cluster"] = model.predict(X)

# Creates a scatter plot, that clusters groups of houses that have similar landsizes.
def scatter_landsize_location(): 
	# X = df.loc[:, ["Landsize"]]

	# # Creates a KMeans model that groups data. 
	# model = KMeans(n_clusters=10, random_state=10)
	# model.fit(X)

	# # Clusters the houses into 8 groups based on the land size of the house. 
	# X["Cluster"] = model.predict(X)

	# Creates a scatter plot that shows the location of houses, along with a color that shows the grouping of each house. 
	plt.figure(figsize=(10, 6))
	plt.scatter(df['Longtitude'], df['Lattitude'], edgecolors='white', linewidth=0.3)
	# plt.scatter(df['Longtitude'], df['Lattitude'], c=X["Cluster"], cmap='viridis', edgecolors='white', linewidth=0.3)
	plt.title('Scatter Plot of Houses, Grouped by Land Sizes')
	plt.xlabel('Longtitude')
	plt.ylabel('Lattitude')
	plt.colorbar(label='Color Groups of Land Size')

	# Creates a scatter plot that shows the clusters along with the landsize. 
	# plt.figure(figsize=(8, 6))
	# plt.scatter(X['Landsize'], X['Cluster'], c=X["Cluster"], cmap='viridis', edgecolors='white', linewidth=0.3, s=100)
	# plt.title('Scatter Plot of Landsize to Group of Houses')
	# plt.xlabel('Land Size')
	# plt.ylabel('Clusters')
	# plt.grid(True)

	# Shows both of the graphs.
	plt.show()
# distrubution_house_prices()
# bar_house_region()
# scatter_distance_price()
# scatter_room_price()
# correlation_data()
# scatter_landsize_location()

# model training
s = (df.dtypes == 'object')
object_cols = list(s[s].index)
print("Categorical variables:")
print(object_cols)
print('No. of. categorical features: ', len(object_cols))

df_final = df.drop(object_cols, axis=1)

X = df_final.drop(['Price'], axis = 1)
Y = df_final['Price']

# Split the training set into training and validation set
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, train_size=0.8, test_size=0.2, random_state=0)

# Create and train the linear regression model
model = LinearRegression()
model.fit(X_train, Y_train)

# Predict the results on the test set
Y_pred = model.predict(X_test)

# Print model performance
print('Mean Squared Error: %.2f' % mean_squared_error(Y_test, Y_pred))
print('R^2 Score: %.2f' % r2_score(Y_test, Y_pred))

# Standardize the features
# scaler = StandardScaler()
# X_train_scaled = scaler.fit_transform(X_train)
# X_test_scaled = scaler.transform(X_test)
# amount of schools in location? 
