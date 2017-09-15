const express = require('express')
const {nSQL} = require('nano-sql')
const compression = require('compression')
const serveStatic = require('serve-static')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const LevelStore = require('level-session-store')(session)
const app = express()
const port = process.env.PORT || 8080

app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({store: new LevelStore(), secret: 'quiz', resave: false, saveUninitialized: true}));
app.use(bodyParser.json())
app.set('view engine', 'vash')
app.use(serveStatic(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
	res.redirect('/auth')
})

app.use('/auth', require('./routes/auth/index.js'))
app.use('/quiz', require('./routes/quiz/index.js'))
app.use('/logout', require('./routes/logout.js'))

nSQL().config({
	persistent: true,
	history: false,
	memory: false
})

nSQL('Users').model([
	{key: 'id', type: 'int', props: ['pk', 'ai']},
	{key: 'login', type: 'string'},
	{key: 'password', type: 'string'},
	{key: 'name', type: 'string'},
	{key: 'score', type: 'int', default: 0},
	{key: 'answers', type: 'int[]', default: []}
])

nSQL('Questions').model([
	{key: 'id', type: 'int', props: ['pk', 'ai']},
	{key: 'question', type: 'string'},
	{key: 'options', type: 'string[]'},
	{key: 'right', type: 'int'},
	{key: 'user', type: 'int'}
])

nSQL().connect().then(()=>{
	app.listen(port, ()=>{
		console.log('Server running in http://localhost:'+port)
	})
})
