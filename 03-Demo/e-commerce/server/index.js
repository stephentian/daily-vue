const Koa = require('koa')
const app = new Koa()
const {
  connect,
  initSchemas
} = require('./database/init.js')

const mongoose = require('mongoose')
// const bodyParser = require('koa-bodyparser')
// const cors = require('koa2-cors')
// const Router = require('koa-router')

// app.use(bodyParser())
// app.use(cors())

// let user = require('./appApi/user.js')
// let home = require('appApi/home.js')
// let goods = require('appApi/goods.js')

// let router = new Router()

// router.use('/use', user.routes())
// router.use('home', home.routes())
// router.use('goods', goods.routes())

// app.use(router.routes())
// app.use(router.allowedMethods)

;
(async () => {
  await connect()
  initSchemas()
  const User = mongoose.model('User')
  let oneUser = new User({
    username: 'stephen',
    password: '11111'
  })
  oneUser.save().then(() => {
    console.log('save success!')
  })
  let users = await User.findOne({}).exec()
  console.log('users:', users)
})()

app.use(async (ctx) => {
  ctx.body = '<h1>Hello Service</h1>'
})

app.listen(3000, () => {
  console.log('Server is starting at port 3000...')
})