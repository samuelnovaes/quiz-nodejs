const express = require('express')
const router = express.Router()
const question = require('../../persistence/question.js')

router.route('/:id/:ans')
.get((req, res)=>{
	question.check(parseInt(req.params.id), parseInt(req.params.ans), req.session.user).then((won)=>{
		if(won){
			req.session.user.score++
		}
		res.redirect('/quiz')
	})
})

module.exports = router
