import express from 'express';
import connectDb from './db.js';
import {errorHandler} from '../middleware/Errorhandler.js'
import cors from "cors"
import routes from '../routes/index.js';
import documentation from '../doc/swagger.json' assert {"type":"json"}
import swaggerUi from 'swagger-ui-express'


const app = express();




app.use(cors())

app.use(express.json())
app.use('/api', routes)
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(documentation))







app.listen(process.env.PORT, () => {
    connectDb();
    console.log('listening on port ' + process.env.PORT);
})
app.use(errorHandler)

export default app;
