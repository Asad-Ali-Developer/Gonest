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

---

## 📦 Installation

Install Gonest via npm:

```sh
npm install gonest

2️⃣ Initializing Your Application
Create your application using the ModestFactory. You pass your controllers to the factory, and then configure the application:
```ts
import { ModestFactory } from "gonest";
import UserController from "./controllers/UserController";

const appModule = {
  controllers: [UserController]
};

// Create the singleton application instance with controllers
const app = ModestFactory.create(appModule);

// Set global API prefix and application name
app.setApiGlobalPrefix("api");
app.setApplicationName("Gonest");

// Optionally enable CORS
app.enableCors({
  origin: "https://example.com",
  methods: ["GET", "POST"]
});

// You can add additional middleware as needed
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  next();
});

Define additional routes if needed
app.get("/", (req, res) => {
  res.send("Hello from Gonest!");
});

// List all registered routes for debugging
app.listAllRoutes();

app.listen(3000, () => {
  console.log(`Server is running at ${app.getUrl()}`);
});
```

## 📖 Usage

### 1️⃣ Create a Controller

```ts
import { Controller, Get } from "gonest";
import { Request, Response } from "express";

@Controller("users")
class UserController {
  @Get("/profile")
  getProfile(req: Request, res: Response) {
    res.json({ message: "User profile data" });
  }
}

export default UserController;
```

---

### 2️⃣ Register Controllers in Express

```ts
import express from "express";
import { registerControllers } from "gonest";
import UserController from "./controllers/UserController";

const app = express();
registerControllers(app, [UserController]);

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

### 3️⃣ Add Middleware

```ts
import { Middleware, Controller, Get } from "gonest";
import { Request, Response, NextFunction } from "express";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
```

---

## 📌 API Reference

### **Controller Decorator**

```ts
@Controller("prefix")
```

Defines a controller with a base route.

### **Route Decorators**

```ts
@Get("path")
@Post("path")
@Put("path")
@Delete("path")
```

Registers an HTTP method for a route.

### **Middleware Decorator**

```ts
@Middleware(middlewareFunction)
```

Attaches middleware to a specific route.

### **registerControllers Function**

```ts
registerControllers(app, [UserController]);
```

Registers controllers with Express.

### **Global Prefix**

```ts
app.setApiGlobalPrefix("api");
```

Sets a global prefix for all routes.

### **CORS Support**

```ts
app.enableCors({
  origin: "https://example.com",
  methods: ["GET", "POST"],
});
```

Enables CORS with customizable options.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on [GitHub](https://github.com/your-username/gonest)!