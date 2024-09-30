from sklearn.metrics import silhouette_score, v_measure_score
from sklearn.cluster import KMeans
import pandas as pd  

# Associates a variable with the processed data. 
df = pd.read_csv('datasets/processed/processed_housing_market.csv')

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

# To evaluate the KMeans, uncomment the code below:
# evaluate_kmeans()