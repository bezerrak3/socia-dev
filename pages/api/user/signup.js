import Joi from "joi"
import createHandler from "../../../lib/middlewares/nextConnect"
import { withIronSessionApiRoute } from "iron-session/next"
import { ironConfig } from "../../../lib/middlewares/ironSession"

import validate from "../../../lib/middlewares/validation"

import {signupUser} from "../../../modules/user/user.service"
import { signupSchema } from "../../../modules/user/user.schema"
    
const signup = createHandler() // definição de verbo http
  signup.post(validate({body: signupSchema}), async (req, res) =>{  
    try{
      const user = await signupUser(req.body)

      req.session.user = {
        id: user._id,
        user: user.user
      }
      await req.session.save()

      res.status(201).json({ ok: true })
    }catch(err){
      console.error(err)
      throw err
    }
    
 })

export default withIronSessionApiRoute(signup,ironConfig)