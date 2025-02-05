import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { getTodosDocumentos, getDocumentoPorId, criarDocumento, atualizarDocumento, deletarDocumentoCriado } from "../models/filesModel.js";

export async function listarDocumentos(req, res) {  
  try {
    const Documentos = await getTodosDocumentos();
    
    res.status(200).json(Documentos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({"Erro":"Falha na requisição."});
  }
}

export async function listarDocumentosPorId(req, res) {
  try {
    const id = req.params.id;
    const Documento = await getDocumentoPorId(id);
    
    if (Documento) {
      res.status(200).json(Documento);
    } else {
      res.status(404).json({"Erro":"Documento não encontrado."});
    }
  } catch (erro) {
    console.error(erro);
    res.status(500).json({"Erro":"Falha na requisição."});
  }
} 

export async function postarNovoDocumento(req, res) {
  const novoDocumento = req.body;
  
  try {
    const Documento = await criarDocumento(novoDocumento);

    res.status(201).json(Documento);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({"Erro": erro.message});
  }
}

export async function uploadDocumento(req, res) {
  const id = req.params.id;
  const pathAtualizado = `uploads/${id}-${req.file.originalname}`;
  const urlImg = `http://localhost:8000/uploads/${id}-${req.file.originalname}`;

  const novoDocumento = {
    filePath: urlImg,
    fileName: req.file.originalname    
  };

  try {
    await apagarDocumentoFisico(id);

    fs.renameSync(req.file.path, pathAtualizado);

    const DocumentoAtualizado = await atualizarDocumento(id, novoDocumento);
        
    res.status(200).json(DocumentoAtualizado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({"Erro": erro.message});
  }
}

export async function deletarDocumento(req, res) {
  const id = req.params.id;

  try {
    await apagarDocumentoFisico(id);

    const DocumentoDeletado = await deletarDocumentoCriado(id);
    
    res.status(200).json(DocumentoDeletado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição."})
  }
}

async function apagarDocumentoFisico(id) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  const uploadsDir = path.join(__dirname, '../uploads');

  const files = fs.readdirSync(uploadsDir);
  const fileToDelete = files.find(file => file.includes(id));

  if (fileToDelete) {
    fs.unlinkSync(path.join(uploadsDir, fileToDelete));
  } 
}