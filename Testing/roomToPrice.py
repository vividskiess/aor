import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.cluster import KMeans
import seaborn as sns

df = pd.read_csv("Datasets/melb_data (snapshot).csv")
# df = df["Rooms"]
df = df[(df["Rooms"] == 3) & (df["Bathroom"] == 2)]

df.dropna(subset=['Price'], inplace=True)

X = df.loc[:, ["Price", "Distance"]]

kmeans = KMeans(n_clusters=10)
X["Cluster"] = kmeans.fit_predict(X)
X["Cluster"] = X["Cluster"].astype("category")

sns.relplot(
    x="Distance", y="Price", hue="Cluster", data=X, height=6,
)

plt.show()
