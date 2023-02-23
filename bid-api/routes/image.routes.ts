import express from "express"
import controller from "../controllers/image.controllers"
import makeHttpCallback from "./utils/make-callback"
import makeAuth from "./utils/make-auth"
import { authAdmin } from "../use-cases/user"

const router = express.Router()

router.post("/image", makeAuth(authAdmin), makeHttpCallback(controller.createImage), () => {
    /*
      #swagger.summary = 'Create a new image this image is gonna be assigned to an item when created or updated'
      #swagger.tags = ['Image']
      #swagger.security = [{
          "BasicAuth": ['admin']
      }]
      #swagger.parameters['image'] = {
          in: 'body',
          required: true,
          schema: {  type: 'string' },
          description: 'The image is sent to the server as a blob of data',
      }
      #swagger.responses[200] = {
        description: 'Image is created successfully',
        schema: {      
            success: true,
            code: 200, 
            data: {public_id: "image public id", secure_url: "image https secure url"}
        }
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