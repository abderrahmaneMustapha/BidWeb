import express from "express";
import makeHttpCallback from "./utils/make-callback"
import controller from "../controllers/user.controllers"
import makeAuth from "./utils/make-auth"
import { authUser } from "../use-cases/user"

const router = express.Router();

router.route('/auth').post(makeHttpCallback(controller.loginUser), () => {
     /*
        #swagger.summary = 'Login user'
        #swagger.tags = ['User']
        #swagger.security = [{
            "BasicAuth": []
        }]
        #swagger.parameters['username'] = {
          in : 'body',
          required: true,
          description: 'Username',
          schema: { type: 'string' }
        }
        #swagger.parameters['password'] = {
          in : 'body',
          required: true,
          description: 'user account password',
          schema: { type: 'string' }
        }
        #swagger.responses[200] = {
          description: 'User login successfully',
          schema: { $ref: '#/definitions/ResponseSuccess' }
        } 
        #swagger.responses[400] = {
          description: 'Request failed because of a bad request',
          schema: { $ref: '#/definitions/badRequest' }
        } 
        #swagger.responses[401] = {
          description: 'Unauthorized request',
          schema: { $ref: '#/definitions/unAuthorized' }
        } 
    */
})
router.route('/register').post(makeHttpCallback(controller.registerUser), () => {
   /*
        #swagger.summary = 'Register a new user'
        #swagger.tags = ['User']
        #swagger.security = [{
            "BasicAuth": []
        }]
        #swagger.parameters['username'] = {
          in : 'body',
          required: true,
          description: 'Username',
          schema: { type: 'string' }
        }
        #swagger.parameters['email'] = {
          in : 'body',
          required: true,
          description: 'User email',
          schema: { type: 'string' }
        }
        #swagger.parameters['password'] = {
          in : 'body',
          required: true,
          description: 'user account password',
          schema: { type: 'string' }
        }
        #swagger.responses[200] = {
          description: 'User registred successfully',
          schema: { $ref: '#/definitions/userRegisteredSuccess' }
        } 
        #swagger.responses[400] = {
          description: 'Request failed because of a bad request',
          schema: { $ref: '#/definitions/badRequest' }
        } 
        #swagger.responses[401] = {
          description: 'Unauthorized request',
          schema: { $ref: '#/definitions/unAuthorized' }
        } 
    */
})
router.patch('/user', makeAuth(authUser), makeHttpCallback(controller.updateUser), () => {
      /*
        #swagger.summary = 'Update the current authenticated user, activate or deactivate the autobid for a specified item, and update auto bid parameters'
        #swagger.tags = ['User']
        #swagger.security = [{
            "BasicAuth": []
        }]
        #swagger.parameters['item'] = {
          in : 'body',
          description: 'the item to activate auto bid for',
          schema: { $ref: "#/components/schemas/Item", }
        }
        #swagger.parameters['percentage'] = {
          in : 'body',
          description: 'the percentage to worn the user when the auto bid amount get to it',
          schema: { type: 'number' },
        }
        #swagger.parameters['initialAmount'] = {
          in : 'body',
          description: 'Set the a new total initial amount for auto bid to use',
          schema: { type: 'number' },
        }
        #swagger.responses[200] = {
          description: 'User updated successfully',
          schema: { $ref: '#/definitions/ResponseSuccess' }
        } 
        #swagger.responses[400] = {
          description: 'Request failed because of a bad request',
          schema: { $ref: '#/definitions/badRequest' }
        } 
        #swagger.responses[401] = {
          description: 'Unauthorized request',
          schema: { $ref: '#/definitions/unAuthorized' }
        } 
      */
})
router.get('/user', makeAuth(authUser), makeHttpCallback(controller.getUser), () => {
    /*
        #swagger.summary = 'Get the current authenticated user'
        #swagger.tags = ['User']
        #swagger.security = [{
            "BasicAuth": []
        }]
        #swagger.responses[200] = {
          description: 'User fetched successfully',
          schema: { $ref: '#/definitions/userRegisteredSuccess' }
        } 
        #swagger.responses[400] = {
          description: 'Request failed because of a bad request',
          schema: { $ref: '#/definitions/badRequest' }
        } 
        #swagger.responses[401] = {
          description: 'Unauthorized request',
          schema: { $ref: '#/definitions/unAuthorized' }
        } 
    */
})
router.get('/user/notifications', makeAuth(authUser), makeHttpCallback(controller.notifyUser), () => {
    /*
        #swagger.summary = 'Get the current authenticated user notifications'
        #swagger.tags = ['User']
        #swagger.security = [{
            "BasicAuth": []
        }]
        #swagger.responses[200] = {
          description: 'User fetched successfully',
          schema: { $ref: '#/definitions/notificationsSuccess' }
        } 
        #swagger.responses[400] = {
          description: 'Request failed because of a bad request',
          schema: { $ref: '#/definitions/badRequest' }
        } 
        #swagger.responses[401] = {
          description: 'Unauthorized request',
          schema: { $ref: '#/definitions/unAuthorized' }
        } 
    */
})


export default router