import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener __filename y __dirname en un módulo ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const preddicion = async (req, res) => {
    try {
        const { destino, dias, viajeros } = req.body;
        console.log(req.body);

        if (destino === undefined || dias === undefined || viajeros === undefined) {
            return res.status(400).json({
                message: "Los parámetros 'destino', 'dias' y 'viajeros' son requeridos"
            });
        }

        const inputData = {
            destino: Number(destino),
            dias: Number(dias),
            viajeros: Number(viajeros)
        };


        const scriptPath = path.resolve(__dirname, '../modelo_prueba/script_de_prediccion.py');

        const inputDataJSON = JSON.stringify(inputData);

        const pythonProcess = spawn('python', [scriptPath, inputDataJSON]);

        let prediccion = [];

        pythonProcess.stdout.on('data', (data) => {
            try {
                prediccion = JSON.parse(data.toString().trim()).prediccion;
                res.json({ prediccion });
            } catch (error) {
                console.error('Error al parsear las predicciones:', error);
                res.status(500).json({
                    message: "Error al parsear las predicciones",
                    error: error.message
                });
            }
        });

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
