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
        console.log(req.body);

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


        // Ruta del script de Python y el modelo
        const scriptPath = path.resolve(__dirname, '../modelo_prueba/script_de_prediccion.py');
        const modelPath = path.resolve(__dirname, '../modelo_prueba/modelo_entrenado.pkl');

        // Convertir objeto JavaScript a cadena JSON
        const inputDataJSON = JSON.stringify(inputData);

        // Configuración de la ejecución del script de Python
        const pythonProcess = spawn('python', [scriptPath, inputDataJSON]);

        let prediccion = []; // Variable para almacenar las predicciones

        // Capturar la salida estándar del proceso de Python
        pythonProcess.stdout.on('data', (data) => {
            try {
                prediccion = JSON.parse(data.toString().trim()).prediccion; // Parsear la respuesta JSON
                // Aquí puedes enviar las predicciones de vuelta al cliente si es necesario
                res.json({ prediccion });
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

      

    } catch (error) {
        console.error('Error en la predicción:', error);
        return res.status(500).json({
            message: "Algo fue mal en la predicción",
            error: error.message
        });
    }
};
