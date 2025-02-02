import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { getTodosDocumentos, criarArquivo, atualizarArquivo, deletarArquivoCriado } from "../models/filesModel.js";

export async function listarArquivos(req, res) {
  const posts = await getTodosDocumentos();
  
  res.status(200).json(posts);
}

export async function postarNovoArquivo(req, res) {
  const novoArquivo = req.body;
  
  try {
    const arquivo = await criarArquivo(novoArquivo);

    res.status(201).json(novoArquivo);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({"Falha na requisição": erro.message});
  }
}

export async function uploadArquivo(req, res) {
  const id = req.params.id;
  const pathAtualizado = `uploads/${id}-${req.file.originalname}`;
  const urlImg = `http://localhost:8000/uploads/${id}-${req.file.originalname}`;

  const novoArquivo = {
    filePath: urlImg,
    fileName: req.file.originalname    
  };
  
  try {
    fs.renameSync(req.file.path, pathAtualizado);

    const arquivoAtualizado = await atualizarArquivo(id, novoArquivo);
        
    res.status(200).json(arquivoAtualizado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({"Falha na requisição": erro.message});
  }
}

export async function deletarArquivo(req, res) {
  const id = req.params.id;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  const uploadsDir = path.join(__dirname, '../uploads');

  try {
    const files = fs.readdirSync(uploadsDir);
    const fileToDelete = files.find(file => file.includes(id));

    if (fileToDelete) {
      fs.unlinkSync(path.join(uploadsDir, fileToDelete));
    } 

    const arquivoDeletado = await deletarArquivoCriado(id);
    
    res.status(200).json(arquivoDeletado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição."})
  }
}