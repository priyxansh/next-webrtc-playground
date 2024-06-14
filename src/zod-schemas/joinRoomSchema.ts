import { z } from "zod";

const joinRoomSchema = z.object({
  userId: z.string().min(5).max(100),
  roomId: z.string().min(5).max(100),
});

export default joinRoomSchema;
