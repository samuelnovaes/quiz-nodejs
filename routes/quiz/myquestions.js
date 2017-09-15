const express = require('express')
const router = express.Router()
const question = require('../../persistence/question.js')

router.route('/')
.get((req, res)=>{
	question.get(req.session.user).then((rows)=>{
		res.render('quiz/myquestions', {user: req.session.user, questions: rows})
	})
})
.post((req, res)=>{
	let right = req.body.right || ''
	question.insert(req.body.question, [
		req.body.r0,
		req.body.r1,
		req.body.r2,
		req.body.r3,
		req.body.r4
	], right, req.session.user)
	.then(()=>{
		res.redirect('/quiz/myquestions')
	})
	.catch(err => {
		question.get(req.session.user).then((rows)=>{
			res.render('quiz/myquestions', {err, fields: req.body, user: req.session.user, questions: rows})
		})
	})
})

module.exports = router
