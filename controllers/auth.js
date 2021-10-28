const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')


const logger = require('../services/logger')
const User = require('../services/db/user.methods')
const { gen_hash, verify } = require('../services/_crypto/crypto')
const config = require('../config/dev')


const router = new Router

router.post('/registration', 
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Password must be longer then 3 and shorter then 12').isLength(3, 12)
  ], async (req, res)=>{

  try {
    
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Uncorrect request', errors }) 
    }

    const { email, password } = req.body
    const user = await User.findOne(email)

    if (user) {
      res.status(400).json({ message: 'email is already in use' })
    } else {

      const hash = await gen_hash(password)
      const user = await User.create(email, hash)

      return res.send('User was created')
    }

  } catch (error) {
    logger.error(error)
    res.send({ message:'Server err' })

  }

})



router.post('/login', 
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Password must be longer then 3 and shorter then 12').isLength(3, 12)
  ], async (req, res)=>{

  try {
    
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Uncorrect request', errors }) 
    }

    const { email, password } = req.body
    const user = await User.findOne(email)

    if (!user) {
      res.status(400).json({ message: 'you are not registered' })
    } else {

      const match = await verify(password, user.password)

      if (!match) {
        return res.status(400).json('Invalid password or login')
      }

      const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: '1h' });
      
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          disc_space: user.disc_space,
          disc_usage: user.disc_usage,
          avatar: user.avatar
        }
      })
    }

  } catch (error) {
    logger.error(error)
    res.send({ message:'Server err' })

  }

})

module.exports = router