import pickle
import pandas as pd
from sklearn.neural_network import MLPRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Datos de ejemplo
data = {
    'destination': [0, 1, 0, 2, 1, 0],  # 0: Madrid, 1: Barcelona, 2: Valencia
    'days': [3, 4, 2, 5, 1, 3],
    'travelers': [2, 1, 4, 3, 2, 1],
    'price': [300, 400, 250, 500, 150, 280]
}

df = pd.DataFrame(data)

# Variables predictoras y variable objetivo
X = df[['destination', 'days', 'travelers']]
y = df['price']

# Dividir los datos en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Escalar los datos
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Crear y entrenar el modelo
model = MLPRegressor(hidden_layer_sizes=(10, 10), max_iter=1000, random_state=42)
model.fit(X_train_scaled, y_train)

# Guardar el modelo y el escalador usando pickle
with open('modelo_entrenado.pkl', 'wb') as f:
    pickle.dump({'model': model, 'scaler': scaler}, f)
