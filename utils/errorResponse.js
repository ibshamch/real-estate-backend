class ErrorResponse extends Error {
    constructor(message, statusCode) {
        // Call the parent Error class constructor with the error message
        // This ensures that the message property is properly set by the built-in Error class
        super(message); 
        
        // Add a custom statusCode property to this error instance
        // This allows us to include an HTTP status code alongside the error message
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;

