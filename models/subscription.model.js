import mongoose from 'mongoose';

const subscriptionScema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    price: {
        type: Number,
        required: [true, 'Subscription payment is required'],
        min: [0, 'Price must be greater that 0'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['chess', 'sports', 'finance', 'technology', 'other', 'racing'],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past' 
        }
    },
    renewalDate: {
        type: Date,
        // required: true,
        validate: {
        validator: function (value) {
            return value > this.startDate
        },
            message: 'Start date must be in the past' 
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, { timestamps: true });

subscriptionScema.pre('save', function (next) {
    if(this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});

const Subscription = mongoose.model('Subscription', subscriptionScema);

export default Subscription;