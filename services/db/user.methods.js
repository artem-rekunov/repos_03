const User = require('../../models/user')
const logger = require('../logger')


class Users_methods {

  constructor(){}

  async findOne( email ){
    
    try {
      
      const user = await User.findOne({email})
      
      return user
    
    } catch (error) {

      logger.error(error)
      
      // TODO:
      return 'err'
    
    }
  }

  async create( email, password ){
    
    try {
      
      const user = new User({ email, password })
      await user.save()

      return user
    
    } catch (error) {

      logger.error(error)
      
      // TODO:
       return 'err'
    
    }
  }

}


module.exports = new Users_methods()