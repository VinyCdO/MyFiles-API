import express from "express";
import routes from "./routes/filesRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar o servidor para servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

routes(app);

const port = 8000;

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`)
});
