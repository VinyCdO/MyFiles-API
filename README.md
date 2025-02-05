# MyFiles-API
API para CRUD de uploads de arquivos
<br>
<b>Stack</b>
<br>
<br>
<p>   Node.Js</p>
<p>   React</p>
<p>   MongoDB</p>

Para testar o projeto basta rodar os comandos:
<br>
<br>
<p>   npm install</p>
<p>   npm run dev</p>

<br>
Aplicação está configurada para rodar na porta 8000:

<p>   http://localhost:8000</p>

<br>
Há um arquivo no projeto <b>MyFiles-API.postman_collection.json</b>, com a collection para importação no postman para caso deseje testar os endpoints da API.

<br>
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

<br>
<br>
As demais operações seguem padrão de get, delete e put para atualização das informações do registro em si sem upload do arquivo.
