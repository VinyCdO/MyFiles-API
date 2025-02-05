import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosDocumentos() {
  const db = conexao.db("DbMeusDocumentos");

  const colecao = db.collection("meusDocumentos");

  return colecao.find().toArray();
}

export async function getDocumentoPorId(id) {
  const db = conexao.db("DbMeusDocumentos");

  const colecao = db.collection("meusDocumentos");

  const objId = ObjectId.createFromHexString(id);

  return colecao.findOne({ _id: new ObjectId(objId) });
}

export async function criarDocumento(novoDocumento) {
  const db = conexao.db("DbMeusDocumentos");

  if (!novoDocumento.title || !novoDocumento.description) {
    console.log(novoDocumento);
    throw new Error("Título e descrição são obrigatórios.");  
  }

  if (novoDocumento.title.length > 100) {
    throw new Error("Título deve ter no máximo 100 caracteres.");
  }

  if (novoDocumento.description.length > 2000) {
    throw new Error("Descrição deve ter no máximo 2000 caracteres.");
  }

  const extensoesInvalidas = [".exe", ".zip", ".bat"];
  const extensaoDocumento = novoDocumento.fileName.split('.').pop();

  if (extensoesInvalidas.includes(`.${extensaoDocumento}`)) {
    throw new Error("Extensão de Documento não permitida.");
  }

  const DocumentoExistente = await verificarDocumentoExistente(novoDocumento.title);
  if (DocumentoExistente) {
    throw new Error("Documento com este título já existe.");
  }

  const colecao = db.collection("meusDocumentos");

  novoDocumento.createdAt = new Date();

  return colecao.insertOne(novoDocumento);
}

export async function pesquisarPorTitulo(title) {
  const db = conexao.db("DbMeusDocumentos");

  const colecao = db.collection("meusDocumentos");

  return colecao.find({ title: { $regex: title, $options: "i" } }).toArray();
}

export async function atualizarDocumento(id, Documento) {
  const db = conexao.db("DbMeusDocumentos");

  const colecao = db.collection("meusDocumentos");

  const objId = ObjectId.createFromHexString(id);
  
  Documento.updatedAt = new Date();
  
  return colecao.updateOne({_id: new ObjectId(objId)}, {$set:Documento});
}

export async function deletarDocumentoCriado(id) {
  const db = conexao.db("DbMeusDocumentos");

  const colecao = db.collection("meusDocumentos");

  const objId = ObjectId.createFromHexString(id);
  
  return colecao.deleteOne({_id: new ObjectId(objId)});
}

//sessão tratamentos de validação de registros
export async function verificarDocumentoExistente(title) {
  const db = conexao.db("DbMeusDocumentos");

  const colecao = db.collection("meusDocumentos");

  const DocumentoExistente = await colecao.findOne({ title: title });

  return DocumentoExistente !== null;
}
