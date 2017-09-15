const express = require('express')
const router = express.Router()

router.route('/')
.get((req, res)=>{
	delete req.session.user
	res.redirect('/')
})

module.exports = router
