# Nesty - Express Decorators for Clean Code

[![npm version](https://img.shields.io/npm/v/nesty-backend.svg)](https://www.npmjs.com/package/nesty-backend)
[![TypeScript](https://img.shields.io/badge/lang-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/framework-Express-green.svg)](https://expressjs.com/)

<!-- [![license](https://img.shields.io/npm/l/nesty.svg)](LICENSE) -->

**Nesty-Backend** is a lightweight library that brings decorator-based routing and middleware support to Express.js, making your backend code cleaner and more structured.

---

## 🚀 Features

- **Decorator-based routing** (`@Controller`, `@Get`, `@Post`, etc.).
- **Middleware decorators** (`@Middleware`) for request processing.
- **Automatic route registration**.
- **Fully typed with TypeScript** for better DX.

---

## 📦 Installation

Install the package via npm:

```sh
npm install nesty-backend
```

or using yarn:

```sh
yarn add nesty-backend
```

---

## 📖 Usage

### 1️⃣ Create a Controller

```ts
import { Controller, Get } from "nesty";
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
import { registerControllers } from "nesty";
import UserController from "./controllers/UserController";

const app = express();
registerControllers(app, [UserController]);

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

### 3️⃣ Add Middleware

```ts
import { Middleware, Controller, Get } from "nesty";
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

---


## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on [GitHub](https://github.com/your-username/nesty)!
