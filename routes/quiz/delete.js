const express = require('express')
const router = express.Router()
const question = require('../../persistence/question.js')

router.route('/:id')
.get((req, res)=>{
	question.delete(parseInt(req.params.id), req.session.user).then(()=>{
		res.redirect('/quiz/myquestions')
	})
})

module.exports = router
