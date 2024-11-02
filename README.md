
# Assignment 3 - Computing Technology Innovation Project

Develop a full-stack web application that integrates the AI model created in Assignment 2. Using React.js for the front end and FastAPI for the back end paired wit the AI model.


## Group Name: Alpha Omega Realtors (84)

- @Danny Cao (ID: 103031155)
- @Bennett Biju Matthew(ID: 104584883)
- @Jack Guo (ID: 104829801)


## Tech Stack

**Front-end:** React, React Router, Material UI, Axios, JavaScript

**Backend:** FastAPI, Python, Pandas, Scikit-learn, Seaborn, Matplotlib, Numpy, Uvicorn


## Installation

#### Front-end installation:
Prerequisites
- npm
- node.js

```bash
  cd Frontend/
  npm install
```
Please ensure .env is located in the root directory on the Frontend/ to ensure the api key is accessible in the front end code. (By default the .env file should exist in the frontend already)

#### Back-end installation:

Prerequisites
- Python 3.12
- Anaconda

#### Create the .conda enviroment in terminal
```python
conda create -p venv
```
Press "y" to proceed. 

#### Activate the .conda enviroment
```python
conda activate <path-to-venv-folder>
```

#### Install pip within .conda enviroment
```python
conda install pip
```

#### Install all of the dependencies
```bash
pip install pandas
pip install scikit-learn
pip install seaborn
pip install matplotlib
pip install numpy
pip install fastapi uvicorn
```

## Running the project 
To run the project locally you must run two different instances of the command terminal (bash, powershell ect)
You must ensure that .conda enviroment is activated before running the backend.

### Front-end:
```bash
  cd Frontend/
  npm start
```

### Back-end (FastAPI):
```bash
   cd Backend/
   python -m uvicorn main:app --reload
```
