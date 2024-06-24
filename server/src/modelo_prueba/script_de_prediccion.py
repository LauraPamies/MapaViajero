import pickle
import sys
import os
import pandas as pd
from sklearn.preprocessing import StandardScaler
import json

# Función para cargar el modelo y hacer predicciones
def predict(destination, days, travelers):
    # Obtener la ruta absoluta del archivo modelo_entrenado.pkl
    model_path = os.path.join(os.path.dirname(__file__), 'modelo_entrenado.pkl')
    
    # Cargar el modelo desde el archivo
    with open(model_path, 'rb') as f:
        loaded_data = pickle.load(f)

    loaded_model = loaded_data['model']
    loaded_scaler = loaded_data['scaler']

    # Crear un DataFrame con los datos de entrada
    input_data = pd.DataFrame({
        'destination': [destination],
        'days': [days],
        'travelers': [travelers]
    })

    # Escalar los datos de entrada usando el escalador cargado
    input_data_scaled = loaded_scaler.transform(input_data)

    # Hacer predicciones con el modelo cargado
    predictions = loaded_model.predict(input_data_scaled)

    # Devolver las predicciones como una lista de resultados
    return predictions.tolist()

if __name__ == "__main__":
    # Recuperar los argumentos pasados desde Node.js
    try:
        input_data = json.loads(sys.argv[1])  # Convertir el primer argumento JSON a diccionario
    except json.JSONDecodeError as e:
        print(f'Error decoding JSON: {str(e)}')
        sys.exit(1)
    
    # Extraer los valores de destino, días y viajeros del diccionario
    destination = float(input_data['destination'])
    days = float(input_data['days'])
    travelers = float(input_data['travelers'])

    # Llamar a la función de predicción con los argumentos
    results = predict(destination, days, travelers)

    # Crear un diccionario con las predicciones
    predictions_dict = {'predictions': results}

    # Imprimir el diccionario como JSON para que Node.js pueda leerlo
    print(json.dumps(predictions_dict))
