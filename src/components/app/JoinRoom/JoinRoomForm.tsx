"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/global/SubmitButton";
import { useRouter } from "next/navigation";
import { useSocket } from "@/providers/SocketProvider";
import { useEffect } from "react";
import joinRoomSchema from "@/zod-schemas/joinRoomSchema";

type JoinRoomFormProps = {};

const JoinRoomForm = ({}: JoinRoomFormProps) => {
  const router = useRouter();

  const { socket } = useSocket();

  // Listen for socket events
  const handleRoomJoined = (data: { userId: string; roomId: string }) => {
    router.push(`/room/${data.roomId}`);
  };

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);

    return () => {
      socket.off("joined-room", handleRoomJoined);
    };
  }, [socket]);

  const form = useForm<z.infer<typeof joinRoomSchema>>({
    resolver: zodResolver(joinRoomSchema),
  });

  const { isSubmitting, isDirty } = form.formState;

  const onSubmit = async (data: z.infer<typeof joinRoomSchema>) => {
    socket.emit("join-room", { roomId: data.roomId, userId: data.userId });
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input placeholder="random userId here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room ID</FormLabel>
              <FormControl>
                <Input placeholder="unique roomId here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          isSubmitting={isSubmitting}
          isDirty={isDirty}
          text="Join Room"
          submittingText="Joining Room..."
        />
      </form>
    </Form>
  );
};

export default JoinRoomForm;
