const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
	if(req.session.user){
		res.redirect('/quiz')
	}
	else {
		next()
	}
})

router.use('/', require('./login.js'))
router.use('/register', require('./register.js'))

module.exports = router
