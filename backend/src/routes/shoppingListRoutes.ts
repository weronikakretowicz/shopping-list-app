import { z } from "zod";
import { app } from "../app";
import { authMiddleware } from "../middlewares/authMiddleware";
import { ShoppingList } from "../models/ShoppingList";
import { User } from "../models/User";
import { createListSchema, updateListSchema } from "../validators/listValidators";
import { validateRequest } from "../validators/validateRequest";

app.get("/shopping-list/status", (c) => {
  console.log("shoping list status check");

  return c.json({ message: "Shoping list endpoints available" });
});

app.get("/list/all", authMiddleware, async (c) => {
  const userId = c.env.userId;
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const lists = await ShoppingList.find({ owner: userId });
  if (!lists) {
    return c.json({ error: "Lists not found" }, 404);
  }

  return c.json({ message: "Lists fetched successfully", lists });
});

app.post("/list", authMiddleware, validateRequest(createListSchema), async (c) => {
  console.log("create list called");

  const body = await c.req.json();
  const userId = c.env.userId; // odczytujemy userId z env

  console.log({
    body,
    owner: userId,
  });

  const list = new ShoppingList({
    name: body.name,
    items: body.items,
    owner: userId,
    participants: [],
  });
  await list.save();

  return c.json({ message: "List created successfully", list: list });
});

app.get("/list/:id", authMiddleware, async (c) => {
  const userId = c.env.userId;
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { id } = c.req.param();
  const list = await ShoppingList.findById(id);

  if (!list) {
    return c.json({ error: "List not found" }, 404);
  }

  return c.json(list);
});

app.get("/list", authMiddleware, async ({ req, json, env }) => {
  try {
    // Extract page and limit from query parameters, with default values
    const { page, limit } = req.query();
    const userId = env.userId;

    // Convert page and limit to integers
    const pageNumber = Number.parseInt(page, 10) ?? 1;
    const limitNumber = Number.parseInt(limit, 10) ?? 10;

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Retrieve the paginated data
    const shoppingLists = await ShoppingList.find({ owner: userId }).skip(skip).limit(limitNumber).exec();

    // Get the total count of documents
    const totalDocuments = await ShoppingList.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalDocuments / limitNumber);

    // Respond with the paginated data and metadata
    return json(
      {
        data: shoppingLists,
        meta: {
          totalDocuments,
          totalPages,
          currentPage: pageNumber,
          pageSize: shoppingLists.length,
        },
      },
      200,
    );
  } catch (error) {
    return json({ error: "An error occurred while fetching data." }, 500);
  }
});

app.put("/list/:id", authMiddleware, validateRequest(updateListSchema), async (c) => {
  const userId = c.env.userId;
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { id } = c.req.param();
  const body = await c.req.json();

  const updatedList = await ShoppingList.findByIdAndUpdate(id, body, { new: true });
  if (!updatedList) {
    return c.json({ error: "List not found" }, 404);
  }

  return c.json({ message: "List updated successfully", updatedList });
});

app.delete("/list/:id", authMiddleware, async (c) => {
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

app.get("/shared", authMiddleware, async (c) => {
  const userId = c.env.userId;
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const shoppingLists = await ShoppingList.find({ participants: { $in: [userId] } });
  if (!shoppingLists) {
    return c.json({ error: "No shared lists found" }, 404);
  }

  return c.json({ message: "Shared lists fetched successfully", shoppingLists });
});

const SharedListRequestBodySchema = z.object({
  listId: z.string(),
  participants: z.array(z.string().email()),
});

app.post("/share/list", authMiddleware, async (c) => {
  const userId = c.env.userId;
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const body = await c.req.json();
  const bodyResult = SharedListRequestBodySchema.safeParse(body);
  if (!bodyResult.success) {
    return c.json({ error: "Invalid request body", details: bodyResult.error.issues }, 400);
  }

  const { listId, participants } = bodyResult.data;

  const list = await ShoppingList.findById(listId);
  if (!list) {
    return c.json({ error: "List not found" }, 404);
  }

  if (list.owner.toString() !== userId) {
    return c.json({ error: "Forbidden" }, 403);
  }

  // Find users whose email is in the provided emails array.
  const users = await User.find({ email: { $in: participants } });

  // Map the found users to their IDs.
  const participantIds = users.map((user) => user._id);
  if (participantIds.length === 0) {
    return c.json({ error: "No valid users found for the provided emails." }, 404);
  }

  // Update the shopping list by adding the new participant IDs.
  // $addToSet with $each will add each id only if it's not already present.
  const updatedList = await ShoppingList.findByIdAndUpdate(
    listId,
    { $addToSet: { participants: { $each: participantIds } } },
    { new: true },
  );

  return c.json({ message: "List shared successfully", updatedList });
});

app.delete("/shared/delete/:id", authMiddleware, async (c) => {
  const userId = c.env.userId;
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { id: listId } = c.req.param();
  if (!listId) {
    return c.json({ error: "Mising parameter" }, 401);
  }

  try {
    const updatedList = await ShoppingList.findByIdAndUpdate(
      listId,
      { $pull: { participants: userId } }, // $pull removes the participant from the array
      // { new: true }, // Return the updated document
    );

    console.log(JSON.stringify(updatedList, undefined, 2));

    return c.json({ message: "List deleted successfully" });
  } catch (error) {
    console.error(error);

    return c.json({ message: "Unexpected error" }, 500);
  }
});
