import express from "express";
import swaggerUi from "swagger-ui-express"
import swaggerFile from  "../docs/swagger.json"

const router = express.Router();

const swaggerOptions = {
  swaggerOptions: {
    tryItOutEnabled: false,
    supportedSubmitMethods: [''],
  },
};

router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOptions))

export default router