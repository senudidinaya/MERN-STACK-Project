import express from 'express';
import routes from './src/routes/projectRoutes';
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Senudi:ArchTec@arcytecclus.dgtjojh.mongodb.net/TaskWorkflow?retryWrites=true&w=majority&appName=ArcyTecClus')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

// Routes
routes(app);

app.get('/', (req, res) => {
    res.send('Wellcome to WorkFlow!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});