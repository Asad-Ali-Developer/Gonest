# Gonest - Express Decorators for Clean Code

[![npm version](https://img.shields.io/npm/v/gonest.svg)](https://www.npmjs.com/package/gonest)
[![TypeScript](https://img.shields.io/badge/lang-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/framework-Express-green.svg)](https://expressjs.com/)

**Gonest** is a lightweight backend framework for Express.js that leverages decorators to simplify routing, middleware, and overall application structure. Built with TypeScript, Gonest helps you write clean, maintainable code while exposing a singleton application instance with full access to Express's API.

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

## 🛠️ Usage

### 1️⃣ Initializing Your Application

Create your application using the `GonestFactory`. You pass your controllers to the factory, and then configure the application:

```typescript
import { GonestFactory } from "gonest";
import UserController from "./controllers/UserController";

const appModule = {
  controllers: [UserController],
  globalPrefix: "api", // Optional: Set a global API prefix
};

// Create the singleton application instance with controllers
const app = GonestFactory.create(appModule);

// Set application name
app.setApplicationName("Gonest");

// Optionally enable CORS
app.enableCors({
  origin: "https://example.com",
  methods: ["GET", "POST"],
});

// Add additional middleware if needed
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  next();
});

// List all registered routes for debugging
app.listAllRoutes();

// Start the server
app.listen(3000, () => {
  console.log(`Server is running at ${app.getUrl()}`);
});
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

Gonest provides built-in exception handling for common HTTP errors. You can throw exceptions like `BadRequestException`, `NotFoundException`, etc.

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

// Initialize WebSocket server
app.connectSocket(
  { origin: "https://example.com" },
  (socket) => {
    socket.on("message", (data) => {
      console.log("Received message:", data);
      socket.emit("response", "Message received");
    });
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

---

## 📌 API Reference

### **Core Classes**

- **`CoreGonestApplication`**: The main application class that wraps Express and provides additional functionality.
- **`GonestFactory`**: Factory class for creating and managing a singleton instance of `CoreGonestApplication`.

### **Decorators**

- **`@Controller(prefix: string)`**: Defines a controller with a base route.
- **`@Get(path: string)`**: Registers a GET route.
- **`@Post(path: string)`**: Registers a POST route.
- **`@Middleware(middlewareFunction)`**: Attaches middleware to a specific route.

### **Methods**

- **`app.setApiGlobalPrefix(prefix: string)`**: Sets a global prefix for all routes.
- **`app.enableCors(options: CorsOptions)`**: Enables CORS with customizable options.
- **`app.listAllRoutes()`**: Lists all registered routes in the application.
- **`app.connectSocket(corsOptions: CorsOptions, eventHandlers: Function)`**: Initializes a WebSocket server.
- **`app.use(middleware: Function)`**: Attaches global middleware to the application.

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

If you like this project, give it a ⭐ on [GitHub](https://github.com/your-username/gonest)!

---

For detailed examples and advanced usage, check out the [documentation](https://www.npmjs.com/package/gonest).

