import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosDocumentos() {
  const db = conexao.db("DbMeusDocumentos");

  const colecao = db.collection("meusDocumentos");

  return colecao.find().toArray();
}

export async function criarArquivo(novoArquivo) {
  const db = conexao.db("DbMeusDocumentos");

  if (!novoArquivo.title || !novoArquivo.description) {
    throw new Error("Título e descrição são obrigatórios.");  
  }

  if (novoArquivo.title.length > 100) {
    throw new Error("Título deve ter no máximo 100 caracteres.");
  }

  if (novoArquivo.description.length > 2000) {
    throw new Error("Descrição deve ter no máximo 2000 caracteres.");
  }

  const extensoesInvalidas = [".exe", ".zip", ".bat"];
  const extensaoArquivo = novoArquivo.fileName.split('.').pop();

  if (extensoesInvalidas.includes(`.${extensaoArquivo}`)) {
    throw new Error("Extensão de arquivo não permitida.");
  }

  const arquivoExistente = await verificarArquivoExistente(novoArquivo.title);
  if (arquivoExistente) {
    throw new Error("Arquivo com este título já existe.");
  }

  const colecao = db.collection("meusDocumentos");

  novoArquivo.createdAt = new Date();

  return colecao.insertOne(novoArquivo);
}

export async function pesquisarPorTitulo(title) {
  const db = conexao.db("DbMeusDocumentos");

  const colecao = db.collection("meusDocumentos");

  return colecao.find({ title: { $regex: title, $options: "i" } }).toArray();
}

export async function atualizarArquivo(id, arquivo) {
  const db = conexao.db("DbMeusDocumentos");

  const colecao = db.collection("meusDocumentos");

  const objId = ObjectId.createFromHexString(id);
  
  arquivo.updatedAt = new Date();
  
  return colecao.updateOne({_id: new ObjectId(objId)}, {$set:arquivo});
}

export async function deletarArquivoCriado(id) {
  const db = conexao.db("DbMeusDocumentos");

  const colecao = db.collection("meusDocumentos");

  const objId = ObjectId.createFromHexString(id);
  
  return colecao.deleteOne({_id: new ObjectId(objId)});
}

//sessão tratamentos de validação de registros
export async function verificarArquivoExistente(title) {
  const db = conexao.db("DbMeusDocumentos");

  const colecao = db.collection("meusDocumentos");

  const documentoExistente = await colecao.findOne({ title: title });

  return documentoExistente !== null;
}
