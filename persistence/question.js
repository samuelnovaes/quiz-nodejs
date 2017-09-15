const {nSQL} = require('nano-sql')

const question = {
	insert(question, options, right, user){
		return new Promise((resolve, reject) => {
			if(question == ''){
				reject('Insira sua pergunta!')
			}
			else if(options.some(x => x == '')){
				reject('Preencha todas as respostas!')
			}
			else if(right == ''){
				reject('Escolha a resposta certa!')
			}
			else {
				nSQL('Questions').query('upsert', {question, options, right, user: user.id}).exec().then(()=>{
					resolve()
				})
			}
		})
	},
	get(user){
		return new Promise((resolve, reject)=>{
			nSQL('Questions').query('select').where(['user', '=', user.id]).orderBy({id: 'desc'}).exec().then((rows)=>{
				resolve(rows)
			})
		})
	},
	getAll(user){
		return new Promise((resolve, reject)=>{
			nSQL('Questions').query('select').where([['user', '!=', user.id], 'AND', ['id', 'NOT IN', user.answers]]).orderBy({id: 'desc'}).exec().then((rows)=>{
				resolve(rows)
			})
		})
	},
	delete(id, user){
		return new Promise((resolve, reject)=>{
			nSQL('Questions').query('delete').where([['user', '=', user.id], 'AND', ['id', '=', id]]).exec().then(()=>{
				resolve()
			})
		})
	},
	check(id, ans, user){
		return new Promise((resolve, reject)=>{
			nSQL('Questions').query('select').where([['user', '!=', user.id], 'AND', ['id', 'NOT IN', user.answers], 'AND', ['id', '=', id], 'AND', ['right', '=', ans]]).orderBy({id: 'desc'}).exec().then((rows)=>{
				user.answers.push(id)
				if(rows.length > 0){
					nSQL('Users').query('upsert', {score: user.score + 1, answers: user.answers}).where(['id', '=', user.id]).exec().then(()=>{
						resolve(true)
					})
				}
				else {
					nSQL('Users').query('upsert', {answers: user.answers}).where(['id', '=', user.id]).exec().then(()=>{
						resolve(false)
					})
				}
			})
		})
	}
}

module.exports = question
