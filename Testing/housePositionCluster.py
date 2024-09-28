import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.cluster import KMeans
import seaborn as sns

df = pd.read_csv("Datasets/melb_data (snapshot).csv")

df.dropna(inplace=True)

# X = df.loc[:, ["Lattitude", "Longtitude"]]

# model = KMeans(n_clusters=5, random_state=5)

# model.fit(X)

# all_predictions = model.predict(X)

# plt.figure(figsize=(12, 6))
# plt.scatter(X["Lattitude"], X["Longtitude"], c=all_predictions, cmap='viridis')
# plt.title('Cluster of houses?')
# plt.xlabel('Lattitude')
# plt.ylabel('Longtitude')
# plt.colorbar(label='Cluster')
# plt.show()

school_df = pd.read_csv('./Datasets/victoria-schools-2018.csv')
# df = df[(df['Lattitude'] in range(-38.2 to -37.4) )]
# df = df[(df["Rooms"] == roomAmount) & (df["Bathroom"] == bathroomAmount)]

school_df = school_df[(school_df['Y'] >= -38.2) & (school_df['Y'] <= -37.4) & (school_df['X'] >= 144) & (school_df['X'] <= 145.6)] 

X = df['Longtitude']
Y = df['Lattitude']

schools_X = school_df["X"]
schools_Y = school_df["Y"]

plt.figure(figsize=(12, 6))
plt.scatter(X, Y, color='blue')
plt.scatter(schools_X, schools_Y, color='pink')
plt.title('Cluster of houses?')
plt.xlabel('Longtitude')
plt.ylabel('Lattitude')
plt.colorbar(label='Cluster')
plt.show()



# latitude in range of -38.2 to -37.4
# longitude in range of 144 to 145.6
