const express = require('express')
const router = express.Router()
const user = require('../../persistence/user.js')

router.route('/')
.get((req, res)=>{
	user.getRanking().then((rows)=>{
		res.render('quiz/ranking', {user: req.session.user, ranking: rows})
	})
})

module.exports = router
