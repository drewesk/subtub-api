const errorMiddleware = async (err, req, res, next) => {
    try {
        let error = { ...err };

        error.message = err.message;

        console.error(err);

        // according to Adrian this is to check Mongoose for a bad ObjectId
        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        // or a duplicate key
        if (err.code === 11000) {
            const message = 'Duplicate value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        // validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }
        res.status(error.statusCod || 500).json({
            success: false,
            error: error.message || 'Message Error 👺'
        })
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;