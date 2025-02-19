import { ApiError } from "./ApiError";

/**
 * Exception class for HTTP 400 (Bad Request) errors.
 * 
 * @param message The error message (default: "Bad Request").
 * @param errors Additional error details (optional).
 */
class BadRequestException extends ApiError {
    constructor(message: string = "Bad Request", errors?: any[]) {
        super(400, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 401 (Unauthorized) errors.
 * 
 * @param message The error message (default: "Unauthorized").
 * @param errors Additional error details (optional).
 */
class UnauthorizedException extends ApiError {
    constructor(message: string = "Unauthorized", errors?: any[]) {
        super(401, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 403 (Forbidden) errors.
 * 
 * @param message The error message (default: "Forbidden").
 * @param errors Additional error details (optional).
 */
class ForbiddenException extends ApiError {
    constructor(message: string = "Forbidden", errors?: any[]) {
        super(403, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 404 (Not Found) errors.
 * 
 * @param message The error message (default: "Not Found").
 * @param errors Additional error details (optional).
 */
class NotFoundException extends ApiError {
    constructor(message: string = "Not Found", errors?: any[]) {
        super(404, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 409 (Conflict) errors.
 * 
 * @param message The error message (default: "Conflict").
 * @param errors Additional error details (optional).
 */
class ConflictException extends ApiError {
    constructor(message: string = "Conflict", errors?: any[]) {
        super(409, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 500 (Internal Server Error) errors.
 * 
 * @param message The error message (default: "Internal Server Error").
 * @param errors Additional error details (optional).
 */
class InternalServerErrorException extends ApiError {
    constructor(message: string = "Internal Server Error", errors?: any[]) {
        super(500, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 406 (Not Acceptable) errors.
 * 
 * @param message The error message (default: "Not Acceptable").
 * @param errors Additional error details (optional).
 */
class NotAcceptableException extends ApiError {
    constructor(message: string = "Not Acceptable", errors?: any[]) {
        super(406, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 408 (Request Timeout) errors.
 * 
 * @param message The error message (default: "Request Timeout").
 * @param errors Additional error details (optional).
 */
class RequestTimeoutException extends ApiError {
    constructor(message: string = "Request Timeout", errors?: any[]) {
        super(408, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 410 (Gone) errors.
 * 
 * @param message The error message (default: "Gone").
 * @param errors Additional error details (optional).
 */
class GoneException extends ApiError {
    constructor(message: string = "Gone", errors?: any[]) {
        super(410, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 505 (HTTP Version Not Supported) errors.
 * 
 * @param message The error message (default: "HTTP Version Not Supported").
 * @param errors Additional error details (optional).
 */
class HttpVersionNotSupportedException extends ApiError {
    constructor(message: string = "HTTP Version Not Supported", errors?: any[]) {
        super(505, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 413 (Payload Too Large) errors.
 * 
 * @param message The error message (default: "Payload Too Large").
 * @param errors Additional error details (optional).
 */
class PayloadTooLargeException extends ApiError {
    constructor(message: string = "Payload Too Large", errors?: any[]) {
        super(413, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 415 (Unsupported Media Type) errors.
 * 
 * @param message The error message (default: "Unsupported Media Type").
 * @param errors Additional error details (optional).
 */
class UnsupportedMediaTypeException extends ApiError {
    constructor(message: string = "Unsupported Media Type", errors?: any[]) {
        super(415, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 422 (Unprocessable Entity) errors.
 * 
 * @param message The error message (default: "Unprocessable Entity").
 * @param errors Additional error details (optional).
 */
class UnprocessableEntityException extends ApiError {
    constructor(message: string = "Unprocessable Entity", errors?: any[]) {
        super(422, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 501 (Not Implemented) errors.
 * 
 * @param message The error message (default: "Not Implemented").
 * @param errors Additional error details (optional).
 */
class NotImplementedException extends ApiError {
    constructor(message: string = "Not Implemented", errors?: any[]) {
        super(501, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 418 (I'm a teapot) errors.
 * 
 * @param message The error message (default: "I'm a teapot").
 * @param errors Additional error details (optional).
 */
class ImATeapotException extends ApiError {
    constructor(message: string = "I'm a teapot", errors?: any[]) {
        super(418, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 405 (Method Not Allowed) errors.
 * 
 * @param message The error message (default: "Method Not Allowed").
 * @param errors Additional error details (optional).
 */
class MethodNotAllowedException extends ApiError {
    constructor(message: string = "Method Not Allowed", errors?: any[]) {
        super(405, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 502 (Bad Gateway) errors.
 * 
 * @param message The error message (default: "Bad Gateway").
 * @param errors Additional error details (optional).
 */
class BadGatewayException extends ApiError {
    constructor(message: string = "Bad Gateway", errors?: any[]) {
        super(502, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 503 (Service Unavailable) errors.
 * 
 * @param message The error message (default: "Service Unavailable").
 * @param errors Additional error details (optional).
 */
class ServiceUnavailableException extends ApiError {
    constructor(message: string = "Service Unavailable", errors?: any[]) {
        super(503, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 504 (Gateway Timeout) errors.
 * 
 * @param message The error message (default: "Gateway Timeout").
 * @param errors Additional error details (optional).
 */
class GatewayTimeoutException extends ApiError {
    constructor(message: string = "Gateway Timeout", errors?: any[]) {
        super(504, message, errors); // Call to base class constructor
    }
}

/**
 * Exception class for HTTP 412 (Precondition Failed) errors.
 * 
 * @param message The error message (default: "Precondition Failed").
 * @param errors Additional error details (optional).
 */
class PreconditionFailedException extends ApiError {
    constructor(message: string = "Precondition Failed", errors?: any[]) {
        super(412, message, errors); // Call to base class constructor
    }
}

export {
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    ConflictException,
    InternalServerErrorException,
    NotAcceptableException,
    RequestTimeoutException,
    GoneException,
    HttpVersionNotSupportedException,
    PayloadTooLargeException,
    UnsupportedMediaTypeException,
    UnprocessableEntityException,
    NotImplementedException,
    ImATeapotException,
    MethodNotAllowedException,
    BadGatewayException,
    ServiceUnavailableException,
    GatewayTimeoutException,
    PreconditionFailedException,
    ApiError,
};
