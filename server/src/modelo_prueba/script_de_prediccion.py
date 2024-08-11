import pickle
import sys
import os
import pandas as pd
from sklearn.preprocessing import StandardScaler
import json

def predict(destino, dias, viajeros):
    model_path = os.path.join(os.path.dirname(__file__), 'modelo_entrenado.pkl')
    
    with open(model_path, 'rb') as f:
        loaded_data = pickle.load(f)

    loaded_model = loaded_data['model']
    loaded_scaler = loaded_data['scaler']

    input_data = pd.DataFrame({
        'destino': [destino],
        'dias': [dias],
        'viajeros': [viajeros]
    })

    input_data_scaled = loaded_scaler.transform(input_data)

    prediccion = loaded_model.predict(input_data_scaled)

    return prediccion.tolist()

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.argv[1])
    except json.JSONDecodeError as e:
        print(f'Error decoding JSON: {str(e)}')
        sys.exit(1)
    
    destino = float(input_data['destino'])
    dias = float(input_data['dias'])
    viajeros = float(input_data['viajeros'])

    results = predict(destino, dias, viajeros)

    predictions_dict = {'prediccion': results}

    print(json.dumps(predictions_dict))
