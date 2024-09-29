# COS30049 Assignment 2
This project contains files, and code necessary for machine learning.

## Team memberss: 
**Bennett, Jack, Danny**



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
This file contains code that handles:
- Reading datasets from .csv type files
```python
first_housing_dataset = pd.read_csv('datasets/raw/housing_market_1.csv', usecols=['Suburb', 'Rooms', 'Price', 'Distance', 'Postcode', 'Bathroom', 'Landsize', 'Lattitude', 'Longtitude', 'Regionname'])
second_housing_dataset = pd.read_csv('datasets/raw/housing_market_2.csv', usecols=['Suburb', 'Rooms', 'Price', 'Distance', 'Postcode', 'Bathroom', 'Landsize', 'Lattitude', 'Longtitude', 'Regionname'])
school_dataset = pd.read_csv('datasets/raw/victoria-schools-2018.csv', usecols=['Address_Postcode'])

```
- Merging & combining data
```python
# Combines both datasets into one data frame variable. 
df = pd.concat([first_housing_dataset, second_housing_dataset])

# Groups schools into their postcodes, and counts how much schools are within the postcode. 
schools_count = school_dataset.groupby('Address_Postcode').size().reset_index(name='SchoolCount')

# Merges the address postcode and school count into the dataframe. 
df = df.merge(schools_count, left_on='Postcode', right_on='Address_Postcode', how='left')

```
- Drop duplicates
```python
# Fills the missing school count values with 0.  
df['SchoolCount'].fillna(0)

# Drops the address postcode column from the schools dataste as its no longer needed.
df.drop(columns='Address_Postcode', inplace=True)

# Drops the duplicates in the data.
df.drop_duplicates(inplace=True)
```
- Converting data types from objects to categories
```python
# Converts the columns using the object type into a category type.
object_type_cols = df.select_dtypes(["object"]).columns
df[object_type_cols] = df[object_type_cols].astype('category') 

# Convert the postcode type from data to category. 
df["Postcode"] = df["Postcode"].astype('category')
```
- Remove outliers utilizing threshold checks & null values
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
- Converts processed data to a CSV File
```python
df.to_csv('datasets/processed/processed_housing_market.csv', index=False)
```
