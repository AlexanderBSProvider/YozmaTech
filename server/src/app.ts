import express, { urlencoded } from 'express';
import Router from './config/routes';
import cors from 'cors';

const app = express();
const port = 8080 || process.env.PORT;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200'
}));
app.options('*', cors())

app.use(Router);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

