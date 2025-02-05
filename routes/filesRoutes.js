import express from "express";
import multer from "multer";
import cors from "cors";
import { deletarDocumento, listarDocumentos, listarDocumentosPorId, postarNovoDocumento, uploadDocumento, updateDocumento } from "../controllers/filesController.js";

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8000"],
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({dest:"./uploads", storage});

const routes = (app) => {
  
  app.use(express.json());

  app.use(cors(corsOptions));
  
  app.get("/documentos", listarDocumentos);
  app.get("/documentos/:id", listarDocumentosPorId);
  app.post("/documentos", postarNovoDocumento);
  app.put("/documentos/upload/:id", upload.single("documento"), uploadDocumento);
  app.put("/documentos/:id", updateDocumento);
  app.delete("/documentos/:id", deletarDocumento);
}

export default routes;