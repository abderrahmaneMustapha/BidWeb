import express from "express";
import controller from "../controllers/bid.controllers"
import makeHttpCallback from "./utils/make-callback"
import makeAuth from "./utils/make-auth"
import { authUser } from "../use-cases/user"

const router = express.Router();

router.post('/bid', makeAuth(authUser), makeHttpCallback(controller.createBid), () => {
  /*    
      #swagger.summary = 'Create a new bid'
      #swagger.tags = ['Bid']
      #swagger.security = [{
          "BasicAuth": []
      }]
      #swagger.parameters['amount'] = {
          in: 'body',
          required: true,
          schema: {  type: 'number' },
          description: 'The amount of the bid to be created',
      } 
      #swagger.parameters['item'] = {
          in : 'body',
          required: true,
          description: 'The item which the bid is created for',
          schema: { name: "item name" }
      }
      #swagger.responses[200] = {
        description: 'Bid is created successfully',
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
router.get('/bid', makeAuth(authUser), makeHttpCallback(controller.listBid), () => {
    /* 
        #swagger.summary = 'Get a list of bid'
        #swagger.tags = ['Bid']
        #swagger.security = [{
            "BasicAuth": []
        }]
        #swagger.parameters['limit'] = {
            in: 'query',
            required: true,
            schema: {  type: 'number' },
            description: 'The limit of the item that should be fetched from the server',
        }
        #swagger.parameters['skip'] = {
            in: 'query',
            required: true,
            schema: {  type: 'number' },
            description: 'The number of items that we should skip them and not fetching them',
        } 
        #swagger.parameters['name'] = {
            in: 'query',
            required: true,
            schema: {  type: 'string' },
            description: 'The name of the item that we should fetch bids for',
        } 
        #swagger.responses[200] = {
          description: 'Bid is created successfully',
          schema: { $ref: '#/definitions/bidListSuccess' }
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
router.get('/bid/:name/max', makeAuth(authUser), makeHttpCallback(controller.highestBid), () => {
  /*    
      #swagger.summary = 'Get the max bid for an item'
      #swagger.tags = ['Bid']
      #swagger.security = [{
          "BasicAuth": []
      }]
      #swagger.parameters['name'] = {
          in: 'path',
          required: true,
          schema: {  type: 'string' },
          description: 'The name of the item that we should fetch the highest bid for',
      } 
      #swagger.responses[200] = {
        description: 'Bid is created successfully',
        schema: { $ref: '#/definitions/getBidSuccess' }
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
router.get('/bid/user', makeAuth(authUser), makeHttpCallback(controller.userItems), () => {
    /*    
      #swagger.summary = 'Get the items that a user has bid on, in addition to the
state of the item and the maximum bid in this specific item'
      #swagger.tags = ['Bid']
      #swagger.security = [{
          "BasicAuth": []
      }]
      #swagger.responses[200] = {
        description: 'list of items that the user has bid on in addition to the state of the item to show to the user wehter he won this sepecifc item or not',
        schema: { $ref: '#/definitions/getUserBidListSuccess' }
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
