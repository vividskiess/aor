from sklearn.metrics import silhouette_score, v_measure_score
from sklearn.cluster import KMeans
import pandas as pd  

class ClusterModel:
	# Intialises a variable with the processed data and creates a new Kmeans model. 
	def __init__(self, data): 
		self.df = pd.read_csv(data)
		self.model = KMeans(n_clusters=10, random_state=10)

	# Trains the data using the land size of an area, to cluster groups of houses with similar land sizes.
	def train_landsize_cluster(self):
		landsize_x = self.df.loc[:, ["Landsize"]]

		# Creates a KMeans model that groups data. 
		model = KMeans(n_clusters=10, random_state=10)
		model.fit(landsize_x)

		# Clusters the houses into 10 groups based on the land size of the house. 
		landsize_x["Cluster"] = model.predict(landsize_x)

		# Returns the the landsize count and cluster column.
		return landsize_x

	# Trains the data using the school count of an area, to cluster groups of houses with similar school counts.
	def train_school_cluster(self):
		school_count_X = self.df.loc[:, ["SchoolCount"]]

		# Creates a KMeans model that groups data. 
		model = KMeans(n_clusters=10, random_state=10)
		model.fit(school_count_X)

		# Clusters the houses into 10 groups based on the land size of the house. 
		school_count_X["Cluster"] = model.predict(school_count_X)
		
		# Returns the the school count and cluster column.
		return school_count_X

	# Evaluates the KMeans Model using Silhouette Score + V-Measure Score.
	def evaluate_kmeans(self):
		x = self.train_landsize_cluster()

		# Evaluating the clusters for land size. 
		print('Evaluating Clusters for Land Size')

		# Silhouette Score: Ranges from -1 to 1, where a higher score indicates that the data point is well-clustered
		print('- Silhouette Score: %.2f' % silhouette_score(x, x["Cluster"]))
		
		# V-Measure Score: Ranges from 0 to 1, higher scores equals more valid cluster.
		print('- V-Measure Score: %.2f\n' % v_measure_score(x["Landsize"], x["Cluster"]))
		
		x = self.train_school_cluster()

		# Evaluating the clusters for school count within postcode. 
		print('Evaluating Clusters for School Count')
		print('- Silhouette Score: %.2f' % silhouette_score(x, x["Cluster"]))
		print('- V-Measure Score: %.2f' % v_measure_score(x["SchoolCount"], x["Cluster"]))

# This part is run when the user runs this python file.
if __name__ == "__main__":
	model = ClusterModel('MachineLearning/datasets/processed/processed_housing_market.csv')

	# To evaluate the KMeans, uncomment the code below:
	# model.evaluate_kmeans()

	