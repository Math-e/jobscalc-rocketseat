const express = require('express');
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')
const LangController = require('./controllers/LangController')
//const views = __dirname + "/views/"

routes.get('/', DashboardController.index)//pagina principal
routes.get('/job', JobController.create)//pagina criar job
routes.post('/job', JobController.save)//confirmar criar job
routes.get('/job/:id', JobController.show)//pagina editar job
routes.post('/job/:id', JobController.update)//mandar atualizar job
routes.post('/job/delete/:id', JobController.delete)//confirmar excluir job
routes.get('/profile', ProfileController.index)//ver perfil
routes.post('/profile', ProfileController.update)//confirmar editar perfil

routes.post('/lang', LangController.update)//configurar idioma
 
module.exports = routes;