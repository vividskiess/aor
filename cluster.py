from data_processing import get_data
from sklearn.cluster import KMeans

# Associates a variable with the processed data. 
df = get_data()

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
