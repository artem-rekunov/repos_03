const { Schema, model, ObjectId } = require('mongoose')


const User = model('users',
  
  new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    disc_space: { type: Number, default: 1024*3*10 },
    disc_usage: { type: Number, default: 0 },
    avatar: { type: String },
    files: [{ type: ObjectId, ref: 'File' }]
  })

)

module.exports =  User