import { Router } from "express"
import makeCallback from "./utils/make-callback"
import makeAuth from "./utils/make-auth"
import { authUser, authAdmin } from "../use-cases/user"
import controller from "../controllers/item.controllers"


const router = Router()
router.post('/item', makeAuth(authAdmin), makeCallback(controller.createItem), () => {
    /*
      #swagger.summary = 'Create a new item'
      #swagger.tags = ['Item']
      #swagger.security = [{
          "BasicAuth": ['admin']
      }]
      #swagger.parameters['item'] = {
        in : 'body',
        required: true,
        description: 'The new item that we want to create',
        schema: { $ref: '#/components/schemas/ItemCreate' }
      }
      #swagger.responses[200] = {
        description: 'Item is created successfully',
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
router.get('/item', makeAuth(authUser), makeCallback(controller.listItem), () => {
    /*
        #swagger.summary = 'Get a list of items'
        #swagger.tags = ['Item']
        #swagger.security = [{
            "BasicAuth": []
        }]
        #swagger.parameters['limit'] = {
            in: 'query',
            required: true,
            schema: { type: 'number' },
            description: 'The limit of the item that should be fetched from the server',
        }
        #swagger.parameters['skip'] = {
            in: 'query',
            required: true,
            schema: { type: 'number' },
            description: 'The number of items that we should skip them and not fetching them',
        } 
        #swagger.parameters['sort'] = {
          in: 'query',
          required: false,
          schema: { type: 'number', enum: [1, -1], default: -1},
          description: 'Sort items by creation date in ascending or descending order',
        }
        #swagger.parameters['open'] = {
          in: 'query',
          schema: { type: 'number', enum: [1, -1, 0], default: 0 },
          description: 'get open to bid items or closed ones or both of them',
        }
        #swagger.parameters['bidSort'] = {
          in: 'query',
          schema: { type: 'number', enum: [1, -1, 0], default: 0 },
          description: 'Sort items by highest bid amount in ascending or descending order',
        }
        #swagger.responses[200] = {
          description: 'Items fetched successfully',
          schema: { $ref: '#/definitions/itemListSuccess' }
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
router.get('/item/:name', makeAuth(authUser), makeCallback(controller.getItem), () => {
    /*
        #swagger.summary = 'Get an item by name'
        #swagger.tags = ['Item']
        #swagger.security = [{
            "BasicAuth": []
        }]
        #swagger.parameters['name'] = {
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'The name of the item to retrieve',
        }
        #swagger.responses[200] = {
          description: 'Item fetched successfully',
          schema: { $ref: '#/definitions/getItemSuccess' }
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
router.delete('/item/:name', makeAuth(authAdmin), makeCallback(controller.deleteItem), () => {
    /*
        #swagger.summary = 'Delete an item'
        #swagger.tags = ['Item']
        #swagger.security = [{
            "BasicAuth": ['admin']
        }]
        #swagger.parameters['name'] = {
          in : 'path',
          required: true,
          description: 'The name of the item to delete',
          schema: { type: 'string' }
        }
        #swagger.responses[200] = {
          description: 'Item is deleted successfully',
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
router.patch('/item/:name', makeAuth(authAdmin), makeCallback(controller.updateItem), () => {
     /*
        #swagger.summary = 'Update an item'
        #swagger.tags = ['Item']
        #swagger.security = [{
            "BasicAuth": ['admin']
        }]
        #swagger.parameters['name'] = {
          in : 'path',
          required: true,
          description: 'The name of the item to update',
          schema: { type: 'string' }
        }
        #swagger.parameters['item'] = {
          in : 'body',
          required: true,
          description: 'The properties to update in the item',
          schema: { $ref: '#/components/schemas/ItemUpdate' }
        }
        #swagger.responses[200] = {
          description: 'Item is updated successfully',
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

export default router