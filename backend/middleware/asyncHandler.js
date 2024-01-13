const asyncHandler=fn=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next) 
}
export default asyncHandler


// This line declares the asyncHandler function, which takes a function fn as a parameter. asyncHandler returns another function that takes req, res, and next as parameters.

// This line creates a promise using Promise.resolve() and executes the asynchronous function fn with the provided req, res, and next parameters. The result of fn is wrapped in a resolved promise. If there's an error during the execution of fn, the catch block catches the error and passes it to the Express.js next function, triggering the error handling middleware.