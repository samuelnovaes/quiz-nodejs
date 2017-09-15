const express = require('express')
const router = express.Router()
const user = require('../../persistence/user.js')

router.route('/')
.get((req, res)=>{
	let success = req.session.success
	delete req.session.success
	res.render('auth/login', {success})
})
.post((req, res)=>{
	user.auth(req.body.login, req.body.password)
	.then((usr)=>{
		req.session.user = usr
		res.redirect('/quiz')
	})
	.catch(err => {
		res.render('auth/login', {err, fields: req.body})
	})
})

module.exports = router
