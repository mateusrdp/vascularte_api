import Express from 'express';
import GraphHTTP from 'express-graphql';
import cors from 'cors';
import Schema from './schema';

// Config
const APP_PORT= 4000

const app = Express();

app.use('/graphql', cors(), (req, res) => {
    GraphHTTP({
        schema: Schema,
        pretty: true,
        graphiql: true,
        context: {pgPool, req}
    }) (req, res)
});

const server = app.listen(APP_PORT, () => {
   console.log(`App listening on port ${APP_PORT}`);
});

module.exports = app;