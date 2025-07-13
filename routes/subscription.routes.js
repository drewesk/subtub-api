//useful guide for REST API naming conventions and best practices, https://medium.com/@nadinCodeHat/rest-api-naming-conventions-and-best-practices-1c4e781eb6a5

import { Router } from "express";

import authorize from "../middlewares/auth.middleware.js";
import adminAuth from "../middlewares/admin.middleware.js";

import { adminGetAllSubs, createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/admin', adminAuth, adminGetAllSubs);

// subscriptionRouter.get('/:id', adminAuth, );

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => res.send({
    title: 'UPDATE subscription'
}));

subscriptionRouter.delete('/:id', (req, res) => res.send({
    title: 'DELETE subscription'
}));

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({
    title: 'CANCEL subscription'
}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({
    title: 'GET ALL upcoming subscription renewals'
}));


export default subscriptionRouter;