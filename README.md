# MyFiles-API
API para CRUD de uploads de arquivos

<p>   Node.Js</p>
<p>   React</p>
<p>   MongoDB</p>

Para testar o projeto basta rodar os comandos:

<p>   npm install</p>
<p>   npm run dev</p>

Aplicação está configurada para rodar na porta 8000:

<p>   http://localhost:8000</p>

Há um arquivo no projeto MyFiles-API.postman_collection.json, com a collection para importação no postman para caso deseje testar os endpoints da API.

O fluxo esperado pela aplicação é:

  POST: /documentos 
<br>
<br>Body: {
<br>"title": "Título do documento",
<br>"description": "Descrição do documento",
<br>"filePath": "",
<br>"fileName": "",
<br>"createdAt": "",
<br>"updatedAt": ""
<br>}

Em seguida, em posse do ID gerado pela criação do registro, recebido na response.insertedId, realizar a chamada para upload do arquivo físico:

<br>PUT: /documentos/upload/:id
<br>Form-data: file ( anexando o arquivo que deseja realizar o upload)


As demais operações seguem padrão de get, delete e put para atualização das informações do registro em si sem upload do arquivo.
