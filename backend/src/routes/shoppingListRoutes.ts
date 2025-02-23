import { app } from "../app";
import { ShoppingList } from "../models/ShoppingList";
import { validateRequest } from "../validators/validateRequest";
import {
  createListSchema,
  updateListSchema,
} from "../validators/listValidators";
import { authMiddleware } from "../middlewares/authMiddleware";

app.get("/shopping-list/status", (c) => {
  console.log("shoping list status check");

  return c.json({ message: "Shoping list endpoints available" });
});

app.post(
  "/lists",
  authMiddleware,
  validateRequest(createListSchema),
  async (c) => {
    const { name, items } = await c.req.json();
    const userId = c.env.userId; // odczytujemy userId z env

    const newList = new ShoppingList({ name, items, owner: userId });
    await newList.save();

    return c.json({ message: "List created successfully", newList });
  },
);

app.put(
  "/lists/:id",
  authMiddleware,
  validateRequest(updateListSchema),
  async (c) => {
    const userId = c.env.userId;
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { id } = c.req.param();
    const { name, items } = await c.req.json();

    const updatedList = await ShoppingList.findByIdAndUpdate(
      id,
      { name, items },
      { new: true },
    );
    if (!updatedList) {
      return c.json({ error: "List not found" }, 404);
    }

    return c.json({ message: "List updated successfully", updatedList });
  },
);

app.delete("/lists/:id", authMiddleware, async (c) => {
  const userId = c.env.userId;
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { id } = c.req.param();
  const list = await ShoppingList.findById(id);
  if (!list) {
    return c.json({ error: "List not found" }, 404);
  }

  if (list.owner.toString() !== userId) {
    return c.json({ error: "Forbidden" }, 403);
  }

  await list.deleteOne();

  return c.json({ message: "List deleted successfully" });
});
