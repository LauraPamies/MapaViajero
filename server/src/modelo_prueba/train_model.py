import pickle
import pandas as pd
import os
from sklearn.neural_network import MLPRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Datos de ejemplo
data = {
    'destino': [0, 1, 2, 3, 4, 0, 5,6,7,0,8,1,9,2,10,11,10,12,13,2,3,14,6,15,16,17,18,8,7,12],
    'dias': [3, 5, 7, 2, 4, 6,5,7,3,4,6,5,3,2,7,6,4,5,3,4,6,5,3,2,6,3,3,2,4,3],
    'viajeros': [2,4,3,1,2,3,2,4,1,3,2,1,2,1,4,3,2,1,2,3,2,1,2,1,2,2,2,1,3,2],
    'precio': [444,1160,965,220,369,1248,724,1311,185,740,471,280,225,161,1155,941,358,411,298,537,690,399,243,70,686,278,237,112,480,358]
}

df = pd.DataFrame(data)

X = df[['destino', 'dias', 'viajeros']]
y = df['precio']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = MLPRegressor(hidden_layer_sizes=(30, 30), max_iter=1000, random_state=42)
model.fit(X_train_scaled, y_train)

script_dir = os.path.dirname(os.path.abspath(__file__))

modelo_entrenado_path = os.path.join(script_dir, 'modelo_entrenado.pkl')

with open(modelo_entrenado_path, 'wb') as f:
    pickle.dump({'model': model, 'scaler': scaler}, f)
