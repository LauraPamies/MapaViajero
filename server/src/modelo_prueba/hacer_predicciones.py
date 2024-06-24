import pickle

# Cargar el modelo y el escalador desde el archivo
with open('modelo_entrenado.pkl', 'rb') as f:
    loaded_data = pickle.load(f)

loaded_model = loaded_data['model']
loaded_scaler = loaded_data['scaler']

# Supongamos que tienes nuevos datos para predecir
# Ejemplo de nuevos datos (destino, días, viajeros)
new_data = [[0, 3, 2]]  

# Escalar los nuevos datos con el escalador cargado
new_data_scaled = loaded_scaler.transform(new_data)

# Hacer predicciones con el modelo cargado
predictions = loaded_model.predict(new_data_scaled)

# Imprimir las predicciones
print(predictions)
