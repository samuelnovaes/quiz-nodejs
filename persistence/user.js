const {nSQL} = require('nano-sql')
const crypto = require('crypto')

function md5(text){
	return crypto.createHash('md5').update(text).digest('hex')
}

const user = {
	insert(login, password, confirm, name){
		return new Promise((resolve, reject) => {
			if(!/\w{6,}/.test(login)){
				reject('O login deve ter pelo menos 6 caracteres sendo letras, números ou underline!')
			}
			else if(!/\w{6,}/.test(password)){
				reject('A senha deve ter pelo menos 6 caracteres sendo letras, números ou underline!')
			}
			else if(confirm != password){
				reject('As senhas não confirmam!')
			}
			else if(name == ''){
				reject('Insira seu nome!')
			}
			else {
				nSQL('Users').query('select').where(['login', '=', login]).exec().then((rows)=>{
					if(rows.length != 0){
						reject('Usuário já cadastrado!')
					}
					else {
						nSQL('Users').query('upsert', {login, password: md5(password), name}).exec().then(()=>{
							resolve()
						})
					}
				})
			}
		})
	},
	auth(login, password){
		return new Promise((resolve, reject) => {
			nSQL('Users').query('select').where([['login', '=', login], 'AND', ['password', '=', md5(password)]]).exec().then((rows)=>{
				if(rows.length == 0){
					reject('Usuário ou senha inválida!')
				}
				resolve(rows[0])
			})
		})
	},
	getRanking(){
		return new Promise((resolve, reject) => {
			nSQL('Users').query('select',['name', 'score']).orderBy({score: 'desc'}).exec().then((rows)=>{
				resolve(rows)
			})
		})
	}
}

module.exports = user
