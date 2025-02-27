import { z } from "zod";
import { app } from "../app";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Notification } from "../models/Notification";

app.get("/notifications/all", authMiddleware, async (c) => {
  const userId = c.env.userId;
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const findDetails = {
    receiverId: userId,
    isRead: false,
  };
  const notifications = await Notification.find(findDetails)
    .populate({ path: "senderId", select: "username" })
    .populate({ path: "receiverId", select: "username" })
    .populate({ path: "listId", select: "name" });

  return c.json({ message: "Notifications found", notifications: notifications });
});

const notificationCreateSchema = z.object({
  senderId: z.string({ required_error: "senderId is required" }),
  receiverId: z.string({ required_error: "receiverId is required" }),
  listId: z.string({ required_error: "listId is required" }),
  actionType: z.enum(["added", "modified"], { required_error: "actionType is required" }),
  isRead: z.boolean().optional(),
  timestamp: z.date().optional(),
});

app.post("notification/create", authMiddleware, async ({ env, json, req }) => {
  const userId = env.userId;
  if (!userId) {
    return json({ error: "Unauthorized" }, 401);
  }

  const body = await req.json();
  const safeParseBody = notificationCreateSchema.safeParse(body);
  if (safeParseBody.error) {
    return json({ error: "Unauthorized" }, 401);
  }

  try {
    const newNotification = new Notification(safeParseBody.data);
    const savedNotification = await newNotification.save();

    return json({ message: "Notification saved successfully", notification: savedNotification });
  } catch (error) {
    console.error(error);

    return json({ error: `Unauthorized: ${JSON.stringify(error, undefined, 2)}` }, 400);
  }
});

app.post("notification/read", authMiddleware, async (c) => {
  const userId = c.env.userId;
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { notificationId } = await c.req.json();
  if (!notificationId) {
    return c.json({ error: "Notification ID is required" }, 400);
  }

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return c.json({ error: "Notification not found" }, 404);
    }

    if (notification.receiverId.toString() !== userId.toString()) {
      return c.json({ error: "User is not the receiver of this notification" }, 403);
    }

    notification.isRead = true;
    await notification.save();

    return c.json({ message: "Notification marked as read" }, 200);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});
