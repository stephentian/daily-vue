/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 
 **/

// 在 Mongoose 中，任何事情都是从 Schema（模式）开始的
// 每一个模式映射到 MongoDB 集合，并且定义了这个集合中文档的模型

/**
 *** Schema中的数据类型
 *** String
 *** Number
 *** Date
 *** Boolean
 *** Buffer
 *** ObjectId
 *** Mixed
 *** Array
 **/

const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 类似 PrimaryKey
let ObjectId = Schema.Types.ObjectId

const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
  UserId: {
    type: ObjectId
  },
  userName: {
    unique: true,
    type: String
  },
  password: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'user'
})

// 每次都执行

userSchema.pre('save', function (next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return err
      this.password = hash
      next()
    })
  })
})

userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}


mongoose.model('User', userSchema)