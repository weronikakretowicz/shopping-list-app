import { app }                                from "../app";
import { authMiddleware }                     from "../middlewares/authMiddleware";
import { ShoppingList }                       from "../models/ShoppingList";
import { createListSchema, updateListSchema } from "../validators/listValidators";
import { validateRequest }                    from "../validators/validateRequest";

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
    body, owner: userId,
  });
  
  const list = new ShoppingList({
    name: body.name, items: body.items, owner: userId, participants: [],
  });
  await list.save();
  
  return c.json({ message: "List created successfully", list: list });
});

app.get("/list", authMiddleware, async ({ req, json }) => {
  try {
    // Extract page and limit from query parameters, with default values
    const { page, limit } = req.query();
    
    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10) ?? 1;
    const limitNumber = parseInt(limit, 10) ?? 10;
    
    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * limitNumber;
    
    // Retrieve the paginated data
    const shoppingLists = await ShoppingList.find()
                                            .skip(skip)
                                            .limit(limitNumber)
                                            .exec();
    
    // Get the total count of documents
    const totalDocuments = await ShoppingList.countDocuments();
    
    // Calculate total pages
    const totalPages = Math.ceil(totalDocuments / limitNumber);
    
    // Respond with the paginated data and metadata
    return json({
      data: shoppingLists, meta: {
        totalDocuments, totalPages, currentPage: pageNumber, pageSize: shoppingLists.length,
      },
    }, 200);
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