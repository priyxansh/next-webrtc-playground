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
import createRoomSchema from "@/zod-schemas/createRoomSchema";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/global/SubmitButton";

type CreateRoomFormProps = {};

const CreateRoomForm = ({}: CreateRoomFormProps) => {
  const form = useForm<z.infer<typeof createRoomSchema>>({
    resolver: zodResolver(createRoomSchema),
  });

  const { isSubmitting, isDirty } = form.formState;

  const onSubmit = async (data: z.infer<typeof createRoomSchema>) => {
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
        <SubmitButton
          isSubmitting={isSubmitting}
          isDirty={isDirty}
          text="Create Room"
          submittingText="Creating Room..."
        />
      </form>
    </Form>
  );
};

export default CreateRoomForm;
