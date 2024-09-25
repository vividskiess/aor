import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

dataset = pd.read_csv("prices.csv")

data = pd.DataFrame(dataset)

data = data[(data['Rooms']) == 3]

plt.figure()
plt.scatter(data['Price'], data['Distance'])
plt.xlabel('Price')
plt.ylabel('Distance from CBD')
plt.title('Three House Bedroom Prices based on distance from CBD')
plt.show()
