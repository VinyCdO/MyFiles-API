# MyFiles-API
API para CRUD de uploads de arquivos

<p><b>Stack</b></p>
Node.Js
<br>MongoDB

<br><p>Para testar o projeto basta rodar os comandos:</p>
npm install
<br>npm run dev

<br>Aplicação está configurada para rodar na porta 8000:
<br>http://localhost:8000
<p>Há um arquivo no projeto <b>MyFiles-API.postman_collection.json</b>, com a collection para importação no postman para caso deseje testar os endpoints da API.</p>
<br>O fluxo esperado pela aplicação é:
<br><br>POST: /documentos 
<br>Body: {
<br>"title": "Título do documento",
<br>"description": "Descrição do documento",
<br>"filePath": "",
<br>"fileName": "",
<br>"createdAt": "",
<br>"updatedAt": ""
<br>}
<p>Em seguida, em posse do ID gerado pela criação do registro, recebido na response.insertedId, realizar a chamada para upload do arquivo físico:</p>
<br>PUT: /documentos/upload/:id
<br>Form-data: file ( anexando o arquivo que deseja realizar o upload)
<p><br>As demais operações seguem padrão de get, delete e put para atualização das informações do registro em si sem upload do arquivo.</p>
