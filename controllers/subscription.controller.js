import Subscription from '../models/subscription.model.js'

export const adminGetAllSubs = async (req, res, next) => {
    try {
        const subscriptionList = //not sure yet

        res.status(200).json({
            success: true, 
            data: subscriptionList
        });
    } catch (error) {
        next(error);
    }
}

// export const adminGetUserSubs = async (req, res, next) => {
//     try {
//         const userSubs = await User.findById(req.params.id).select('-password');

//         if (!user) {
//             const error = new Error('User not found');
//             error.statusCode = 404;
//             throw error;
//         }
//         res.status(200).json({
//             success: true, 
//             data: user
//         });
//     } catch (error) {
//         next(error);
//     }
// }

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

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