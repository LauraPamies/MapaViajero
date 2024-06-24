import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promises as fs } from 'fs';

// Obtener __filename y __dirname en un módulo ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const preddicion = async (req, res) => {
    try {
        const { destino, dias, viajeros } = req.body;

        // Validar que se recibieron los parámetros necesarios
        if (destino === undefined || dias === undefined || viajeros === undefined) {
            return res.status(400).json({
                message: "Los parámetros 'destino', 'dias' y 'viajeros' son requeridos"
            });
        }

        // Crear objeto con los datos de entrada para la predicción
        const inputData = {
            destino: Number(destino), // Convertir a número si es necesario
            dias: Number(dias),
            viajeros: Number(viajeros)
        };

        console.log(`Received request with data: destino=${inputData.destino}, dias=${inputData.dias}, viajeros=${inputData.viajeros}`);

        // Ruta del script de Python y el modelo
        const scriptPath = path.resolve(__dirname, '../modelo_prueba/script_de_prediccion.py');
        const modelPath = path.resolve(__dirname, '../modelo_prueba/modelo_entrenado.pkl');

        // Verificar si el script y el modelo existen
        try {
            await fs.access(scriptPath);
            console.log('Python script exists');
        } catch (err) {
            console.error('Python script does not exist');
            return res.status(500).json({
                message: "El archivo de script de Python no existe"
            });
        }

        try {
            await fs.access(modelPath);
            console.log('Model file exists');
        } catch (err) {
            console.error('Model file does not exist');
            return res.status(500).json({
                message: "El archivo del modelo no existe"
            });
        }

        // Convertir objeto JavaScript a cadena JSON
        const inputDataJSON = JSON.stringify(inputData);

        // Configuración de la ejecución del script de Python
        const pythonProcess = spawn('python', [scriptPath, inputDataJSON]);

        let predictions = []; // Variable para almacenar las predicciones

        // Capturar la salida estándar del proceso de Python
        pythonProcess.stdout.on('data', (data) => {
            console.log(`Salida de Python: ${data}`);
            try {
                predictions = JSON.parse(data.toString().trim()).predictions; // Parsear la respuesta JSON
                console.log('Predicciones:', predictions);
                // Aquí puedes enviar las predicciones de vuelta al cliente si es necesario
                res.json({ predictions });
            } catch (error) {
                console.error('Error al parsear las predicciones:', error);
                res.status(500).json({
                    message: "Error al parsear las predicciones",
                    error: error.message
                });
            }
        });

        // Capturar errores del proceso de Python
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error de Python: ${data}`);
            res.status(500).json({
                message: "Error en el script de Python",
                error: data.toString()
            });
        });

        // Manejar el cierre del proceso de Python
        pythonProcess.on('close', (code) => {
            console.log(`Proceso de Python finalizado con código ${code}`);
        });

    } catch (error) {
        console.error('Error en la predicción:', error);
        return res.status(500).json({
            message: "Algo fue mal en la predicción",
            error: error.message
        });
    }
};
