import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  console.log('⚡ Workflow triggered with:', context.requestPayload);

  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== 'active') {
    console.log(`🚫 No active subscription found for ID ${subscriptionId}`);
    return;
  }

//Test a nodemailer reminder by forcing active value on new Subscription
//   if (!subscription) {
//     console.log(`🚫 Subscription not found for ID ${subscriptionId}`);
//     return;
//     }

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(`🔕 Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');
    const label = `${daysBefore} days before reminder`;

    console.log(`📆 Checking ${label} →`, reminderDate.format());

    if (reminderDate.isAfter(dayjs())) {
      console.log(`💤 Will sleep until ${label} at ${reminderDate.format()}`);
      await sleepUntilReminder(context, label, reminderDate);
      return; // crucial: stop until QStash resumes
    }

if (dayjs().utc().startOf('day').isSame(reminderDate.utc().startOf('day'))) {
      console.log(`📬 It's time! Triggering ${label}`);
      await triggerReminder(context, label, subscription);
    } else {
      console.log(`❌ Skipping ${label} — not matching today`);
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription', async () => {
    return Subscription.findById(subscriptionId).populate('user', 'name email');
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`💤 Sleeping until ${label} at ${date.format()}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`📨 Sending ${label} to ${subscription.user.email}`);
    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });
  });
};
