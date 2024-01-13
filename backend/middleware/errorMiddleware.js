const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
const errorHandler=(err,req,res,next)=>{
  let statusCode=res.statusCode === 200 ? 500 : res.statusCode
  let message=err.message

//   check mongoose for bad mongoOBJ id
if(err.name === 'CastError' && err.kind === 'ObjectId'){
    message='resource not found';
    statusCode=404;
}
res.status(statusCode).json({
    message,
    stack:process.env.NODE_ENV === 'production' ? '' : err.stack,
});
};

export {notFound,errorHandler}

// This middleware is used when a route is not found.
// It creates a new Error object with a message indicating that the requested resource is not found (Not Found - ${req.originalUrl}).
// Sets the response status code to 404.
// Passes the error to the next middleware by calling next(error).

// This middleware is designed to handle general errors in the application.
// It checks the status code of the response. If the status code is 200 (OK), it sets the status code to 500 (Internal Server Error).
// It extracts the error message from the err object.
// It specifically checks for a CastError with the kind 'ObjectId', which typically occurs when attempting to cast an invalid ObjectId in a MongoDB query. If such an error is detected, it sets a custom message and updates the status code to 404 (Not Found).
// It responds with a JSON object containing the error message and, in a non-production environment, the full error stack.