import express from "express";
import multer from "multer";
import cors from "cors";
import { deletarArquivo, listarArquivos, postarNovoArquivo, uploadArquivo } from "../controllers/filesController.js";

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
  // Permite que o servidor receba dados no formato JSON
  app.use(express.json());

  app.use(cors(corsOptions));
  
  app.get("/arquivos", listarArquivos);
  app.post("/arquivos", postarNovoArquivo);
  app.put("/arquivos/upload/:id", upload.single("arquivo"), uploadArquivo);
  app.post("/delete/:id", deletarArquivo);
}

export default routes;