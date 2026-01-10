import cors from 'cors';
import express from 'express';
import { Request, Response } from 'express';
import morgan from 'morgan';

import routerInterpreter from './Rutas/Interpreter';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/interpreter', routerInterpreter)

app.listen(3000);

app.get('/', (req: Request, res: Response) => {
    res.send('Hola Oso');
});