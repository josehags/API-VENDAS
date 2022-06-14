import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/Users/routes/users.routes';
import sessionsRouter from '@modules/Users/routes/sessions.routes';
import passwordRouter from '@modules/Users/routes/password.routes';
import profileRouter from '@modules/Users/routes/profile.routes';
import customersRouter from '@modules/customers/routes/customers.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);

export default routes;
