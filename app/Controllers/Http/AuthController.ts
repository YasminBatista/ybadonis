import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from '../../Validators/UserValidator'

export default class AuthController {
  public async Register({request}: HttpContextContract) {
    const data = await request.validate(UserValidator)
    const user = await User.create(data)
    return user

  }

  public async login({request, auth, response}: HttpContextContract){
    try {
      const{email,password} = request.all()
      const token = await auth.use('api').attempt(email, password,{
        expiesIn: '1day'
      })
      const user = await User.findByOrFail('email',email)
      return{ token, user}
      
    } catch (error) {
      response.status(401).send("login ou senha incorretos")
    }
  }
  
}
