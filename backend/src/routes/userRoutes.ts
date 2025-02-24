import { app } from "../app";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { validateRequest } from "../validators/validateRequest";
import { registerSchema, loginSchema } from "../validators/userValidators";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

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
