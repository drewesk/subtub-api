import dayjs from 'dayjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
//written with vanilla JS so avoiding importing directly
const { serve } require('@upstash/workflow/express'); 

import Subscription from '../models/subscription.model.js';

const REMINDERS = [7, 5, 2, 1]; //day increments of reminders

export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== active) {
        return;
    };

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}; Stopping workflow.`);
        return;
    };

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
    }
});

const fetchSubscription = async (context, subscription) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    });
};
