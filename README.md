# Gonest 
### A TypeScript-Powered Express Framework for Scalable APIs


[![npm version](https://img.shields.io/npm/v/gonest.svg)](https://www.npmjs.com/package/gonest)
[![TypeScript](https://img.shields.io/badge/lang-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/framework-Express-green.svg)](https://expressjs.com/)

**Gonest** is a lightweight backend framework for Express.js that leverages decorators to simplify routing, middleware, and overall application structure. Built with TypeScript, Gonest helps you write clean, maintainable code while exposing a singleton application instance with full access to Express's API.

---

## 📦 Installation

Install Gonest via npm:

```bash
npm install gonest
```

Install Gonest via yarn:

```bash
yarn add gonest
```

---

## 🚀 Features

- **Decorator-based routing:** Use `@Controller`, `@Get`, `@Post`, etc. for cleaner route definitions.
- **Middleware decorators:** Easily attach middleware using `@Middleware`.
- **Automatic route registration:** Controllers are registered and routes are listed automatically.
- **Global API prefix support:** Set a global prefix for all your API routes.
- **Singleton application instance:** Ensure a single instance of your application is used across your project.
- **Full Express API access:** All Express methods (`use`, `get`, `post`, etc.) are proxied on the instance.
- **CORS support:** Easily enable CORS with customizable options.
- **TypeScript first:** Fully typed for improved developer experience.
- **Exception handling:** Built-in support for common HTTP exceptions (e.g., `BadRequestException`, `NotFoundException`).
- **WebSocket support:** Easily integrate WebSocket functionality with `Socket.IO`.
---

## 🎯 CLI Initialization  

Gonest includes a CLI to initialize your project with TypeScript or JavaScript.  

### 1️⃣ Setup via CLI  

Run the following command:  

```bash
npx gonest-init
```

The CLI will prompt you:  

```
Will you make your project in (ts) TypeScript or (js) JavaScript?
```

- If you choose **TypeScript (`ts`)**, the CLI will:  
  - Install TypeScript dependencies  
  - Create a `tsconfig.json` file  
  - Set up TypeScript-based project structure  

- If you choose **JavaScript (`js`)**, the CLI will:  
  - Install JavaScript dependencies  
  - Set up a JavaScript-based project  


## 🛠️ Usage

### 1️⃣ Initializing Your Application

Create your application using the `GonestFactory`:

```typescript
import { GonestFactory, LoggerMessage } from "gonest";
import { DemoController } from "./controllers/demo.controller";

export function Invest() {
  const appModule = {
    controllers: [DemoController],
    globalPrefix: "api/v1",
  };

  const app = GonestFactory.create(appModule);

  app.setApplicationName("Gonest");
  app.enableCors();
  app.enableJsonParsing();
  app.urlEncodedParser();

  app.get("/", (req, res) => {
    res.send("Hello from Gonest!");
  });

  app.listAllRoutes();
  app.exceptionHandler();

  const connectDB = async () => {
    try {
      LoggerMessage("MongoDB Connected successfully!", "DATABASE");
    } catch (error) {
      LoggerMessage("Failed to connect", "ERROR");
    }
  };

  connectDB().then(() => {
    app.listen(8080);
  });

  return app;
}

export const app = Invest();
```

---

### 2️⃣ Creating a Controller

Define your controllers using decorators:

```typescript
import { Controller, Get, Middleware } from "gonest";
import { Request, Response } from "express";

const AuthMiddleware = (req: Request, res: Response, next: Function) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

@Controller("users")
class UserController {
  @Get("/profile")
  @Middleware(AuthMiddleware)
  getProfile(req: Request, res: Response) {
    res.json({ message: "User profile data" });
  }
}

export default UserController;
```

---

### 3️⃣ Exception Handling

Gonest provides built-in exception handling for common HTTP errors:

```typescript
import { Get, Controller, NotFoundException } from "gonest";
import { Request, Response } from "express";

@Controller("products")
class ProductController {
  @Get("/:id")
  getProduct(req: Request, res: Response) {
    const product = findProductById(req.params.id);
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    res.json(product);
  }
}
```

---

### 4️⃣ WebSocket Integration

Gonest supports WebSocket integration using `Socket.IO`:

```typescript
import { GonestFactory } from "gonest";

const app = GonestFactory.create();

app.connectSocket({ origin: "https://example.com" }, (socket) => {
  socket.on("message", (data) => {
    console.log("Received message:", data);
    socket.emit("response", "Message received");
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
```

---

## 🚀 Features

- **Decorator-based routing:** Use `@Controller`, `@Get`, `@Post`, etc. for cleaner route definitions.
- **Middleware decorators:** Easily attach middleware using `@Middleware`.
- **Automatic route registration:** Controllers are registered and routes are listed automatically.
- **Global API prefix support:** Set a global prefix for all your API routes.
- **Singleton application instance:** Ensure a single instance of your application is used across your project.
- **Full Express API access:** All Express methods (`use`, `get`, `post`, etc.) are proxied on the instance.
- **CORS support:** Easily enable CORS with customizable options.
- **TypeScript first:** Fully typed for improved developer experience.
- **Exception handling:** Built-in support for common HTTP exceptions (e.g., `BadRequestException`, `NotFoundException`).
- **WebSocket support:** Easily integrate WebSocket functionality with `Socket.IO`.

---

## 📌 API Reference

### **Core Classes**

- **`CoreGonestApplication`**: The main application class that wraps Express.
- **`GonestFactory`**: Factory class for creating the application instance.

### **Decorators**

- **`@Controller(prefix: string)`**: Defines a controller.
- **`@Get(path: string)`**: Registers a GET route.
- **`@Post(path: string)`**: Registers a POST route.
- **`@Middleware(middlewareFunction)`**: Attaches middleware to a route.

### **Methods**

- **`app.setApiGlobalPrefix(prefix: string)`**: Sets a global API prefix.
- **`app.enableCors(options: CorsOptions)`**: Enables CORS.
- **`app.listAllRoutes()`**: Lists all registered routes.
- **`app.connectSocket(corsOptions: CorsOptions, eventHandlers: Function)`**: Initializes a WebSocket server.
- **`app.use(middleware: Function)`**: Attaches global middleware.
- **`app.exceptionHandler()`**: Enables global exception handling.

### **Exception Classes**

- **`BadRequestException`**: HTTP 400 - Bad Request.
- **`NotFoundException`**: HTTP 404 - Not Found.
- **`InternalServerErrorException`**: HTTP 500 - Internal Server Error.
- **`UnauthorizedException`**: HTTP 401 - Unauthorized.
- **`ForbiddenException`**: HTTP 403 - Forbidden.
- **`ConflictException`**: HTTP 409 - Conflict.
- **`UnprocessableEntityException`**: HTTP 422 - Unprocessable Entity.
- **`ServiceUnavailableException`**: HTTP 503 - Service Unavailable.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on [GitHub](https://github.com/Asad-Ali-Developer/Gonest.git)!

For detailed examples and advanced usage, check out the [documentation](https://www.npmjs.com/package/gonest).

