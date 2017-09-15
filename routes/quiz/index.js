const express = require('express')
const router = express.Router()
const user = require('../../persistence/user.js')

router.use((req, res, next)=>{
	if(!req.session.user){
		res.redirect('/')
	}
	else {
		next()
	}
})

router.use('/', require('./questions.js'))
router.use('/myquestions', require('./myquestions.js'))
router.use('/ranking', require('./ranking.js'))
router.use('/delete', require('./delete.js'))
router.use('/check', require('./check.js'))

module.exports = router
