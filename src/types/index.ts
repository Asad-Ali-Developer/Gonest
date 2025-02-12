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
    requestMethod: HttpMethod;
    methodName: string;
    middlewares?: Array<(req: any, res: any, next: any) => void>;
}


export { HttpMethod, RouteDefinition };