const express = require('express')
const router = express.Router()
const question = require('../../persistence/question.js')

router.route('/')
.get((req, res)=>{
	question.getAll(req.session.user).then((rows)=>{
		res.render('quiz/questions', {user: req.session.user, questions: rows})
	})
})

module.exports = router
