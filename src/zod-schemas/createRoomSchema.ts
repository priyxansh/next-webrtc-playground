import { z } from "zod";

const createRoomSchema = z.object({
  userId: z.string().min(5).max(100),
});

export default createRoomSchema;
