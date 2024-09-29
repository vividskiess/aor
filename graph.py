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

# Creates a scatter plot, that clusters groups of houses that have similar landsizes.
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

# Creates a scatter plot, that clusters groups of houses based on the amount of schools.
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



distrubution_house_prices()
bar_house_region()
correlation_data()
scatter_landsize_location()
scatter_school_location()
scatter_distance_price()
scatter_room_price()