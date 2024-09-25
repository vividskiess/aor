import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.cluster import KMeans
import seaborn as sns

df = pd.read_csv("prices.csv")

df.dropna(inplace=True)

X = df.loc[:, ["Lattitude", "Longtitude"]]

model = KMeans(n_clusters=5, random_state=5)

model.fit(X)

all_predictions = model.predict(X)

plt.figure(figsize=(12, 6))
plt.scatter(X["Lattitude"], X["Longtitude"], c=all_predictions, cmap='viridis')
plt.title('Cluster of houses?')
plt.xlabel('Lattitude')
plt.ylabel('Longtitude')
plt.colorbar(label='Cluster')
plt.show()
