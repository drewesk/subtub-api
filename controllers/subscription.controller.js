import { SERVER_URL } from '../config/env.js';
import { workflowClient } from '../config/upstash.js';
import Subscription from '../models/subscription.model.js'

export const adminGetAllSubs = async (req, res, next) => {
  try {
    const subscriptionList = await Subscription.find().populate('user', '-password');

    res.status(200).json({
      success: true,
      data: subscriptionList,
    });
  } catch (error) {
    next(error);
  }
};

export const adminGetUserSubs = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id).populate('user', '-password');

        if (!subscription) {
            return res.status(404).json({ 
                success: false, 
                message: 'Subscription not found' 
            });
        }

        res.status(200).json({ 
            success: true, 
            data: subscription 
        });

    } catch (error) {
        next(error);
    }
}

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    })


        res.status(201).json({ 
            success: true,
            data: subscription
        });
    } catch (error) {
        next(error)
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        // Check if current user matches current token id
        if (req.user.id !== req.params.id) {
            const error = new Error('You lack these privledges, begone peasant!');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({
            user: req.params.id
        });

        res.status(200).json({
            success: true,
            data: subscriptions
        })
    } catch (error) {
        next(error);
    }
}