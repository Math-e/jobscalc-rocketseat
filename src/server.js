const express = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')

//mudar localização padrão para a pasta views
server.set('views', path.join(__dirname, 'views'))

//definir template
server.set('view engine', 'ejs')
//habilitar arquivos static
server.use(express.static("public"))
//usar o req.body em Requests
server.use(express.urlencoded({ extended: true }))
//definir rotas
server.use(routes)

server.listen(3000, () => {console.log('Running')})