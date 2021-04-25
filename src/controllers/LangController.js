let lang = require('../lang/en.json')
console.log(lang)

module.exports = {
    async update(req, res){//trocar language
        lang = require('../lang/' + req.body.lang + '.json')
        
        res.redirect('back')
    },
    get(req, res){//pegar language atual
        return lang
    },
    getAll(req, res){//puxar todos os idiomas disponiveis
        //?
    }
}