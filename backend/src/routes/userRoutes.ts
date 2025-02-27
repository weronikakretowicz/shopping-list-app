import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { app } from "../app";
import { JWT_SECRET } from "../config";
import { authMiddleware } from "../middlewares/authMiddleware";
import { User } from "../models/User";
import {
  loginSchema,
  registerSchema,
  updateUserPasswordSchema,
  updateUsernameAndEmailSchema,
} from "../validators/userValidators";
import { validateRequest } from "../validators/validateRequest";

app.get("/users/status", (c) => {
  console.log("users status");

  return c.json({ message: "Users endpoints available" });
});

app.post("/users/register", validateRequest(registerSchema), async (c) => {
  const { username, email, password } = await c.req.json();
  const passwordHash = await bcrypt.hash(password, 10);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return c.json({ error: "Email already in use" }, 409);
  }

  const user = new User({ username, email, passwordHash });
  await user.save();

  return c.json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
});

app.post("/users/login", validateRequest(loginSchema), async (c) => {
  const { email, password } = await c.req.json();
  const user = await User.findOne({ email });

  if (!user) {
    console.log("Error");

    return c.json({ error: "User doesn't exist" }, 401);
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    console.log("Validation error");

    return c.json({ error: "Invalid credentials" }, 401);
  }

  const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return c.json({
    message: "Login successful",
    token,
    user: {
      username: user.username,
      email: user.email,
    },
  });
});

app.get("/users/all", authMiddleware, async ({ json, env, req }) => {
  console.log("Users endpoints available");

  const user = await User.find();

  return json({ users: user });
});

app.get("/user/details", authMiddleware, async ({ json, env, req }) => {
  const userId = env.userId;
  if (!userId) {
    return json({ error: "Unauthorized" }, 401);
  }

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return json({ error: "Unauthorized" }, 401);
  }

  return json({
    name: user.username,
    email: user.email,
    createdAt: user.createdAt,
    passwordHash: user.passwordHash,
  });
});

app.put("/user/updateUsernameAndEmail", authMiddleware, validateRequest(updateUsernameAndEmailSchema), async (c) => {
  const userId = c.env.userId;
  const { username, email } = await c.req.json();

  const user = await User.findById(userId);
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  user.username = username;
  user.email = email;
  await user.save();

  return c.json({ message: "Username and email updated successfully" });
});

app.put("/user/updateUserPassword", authMiddleware, validateRequest(updateUserPasswordSchema), async (c) => {
  const userId = c.env.userId;
  const { oldPassword, newPassword } = await c.req.json();

  const user = await User.findById(userId);
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  const isValidPassword = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!isValidPassword) {
    return c.json({ error: "Invalid current password" }, 409);
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  user.passwordHash = passwordHash;
  await user.save();

  return c.json({ message: "Password updated successfully" });
});
