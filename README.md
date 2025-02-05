# MyFiles-API
API para CRUD de uploads de arquivos

   Node.Js
   React
   MongoDB

Para testar o projeto basta rodar os comandos:

   npm install
   npm run dev

Aplicação está configurada para rodar na porta 8000:

   http://localhost:8000

Há um arquivo no projeto MyFiles-API.postman_collection.json, com a collection para importação no postman para caso deseje testar os endpoints da API.

O fluxo esperado pela aplicação é:

  POST: /documentos 
  Body: {
        "title": "Título do documento",
        "description": "Descrição do documento",
        "filePath": "",
        "fileName": "",
        "createdAt": "",
        "updatedAt": ""
      }

Em seguida, em posse do ID gerado pela criação do registro, recebido na response.insertedId, realizar a chamada para upload do arquivo físico:

PUT: /documentos/upload/:id
Form-data: file ( anexando o arquivo que deseja realizar o upload)


As demais operações seguem padrão de get, delete e put para atualização das informações do registro em si sem upload do arquivo.
