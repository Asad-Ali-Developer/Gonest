type HttpMethod =
    | "get"
    | "post"
    | "put"
    | "delete"
    | "patch"
    | "options"
    | "head";

interface RouteDefinition {
    path: string;
    requestMethod?: HttpMethod;
    methodName: string;
    middlewares?: Array<(req: any, res: any, next: any) => void>;
}

interface ControllerClass {
    new(): any;
}

export { HttpMethod, RouteDefinition, ControllerClass };