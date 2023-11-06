import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import { Queue } from '@ioc:Rlanz/Queue'

export default class SendPushesController {
    public async send({request}: HttpContextContract){
        const { id, title, body} = request.all()
        const userDB = await User.findOrFail(id)
        Queue.dispatch('App/Jobs/SendPush', {
            to: userDB.token,
            title,
            body
        });
        return userDB
    }
}