const express = require('express')
const router = express.Router()
const user = require('../../persistence/user.js')

router.route('/')
.get((req, res)=>{
	res.render('auth/register')
})
.post((req, res)=>{
	user.insert(req.body.login, req.body.password, req.body.confirm, req.body.name)
	.then(()=>{
		req.session.success = true
		res.redirect('/')
	})
	.catch(err => {
		res.render('auth/register', {err, fields: req.body})
	})
})

module.exports = router
