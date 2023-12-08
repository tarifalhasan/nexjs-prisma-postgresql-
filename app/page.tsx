"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Loading";
import { createTodoSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { toast } from "react-toastify";
import { z } from "zod";

type ITodo = z.infer<typeof createTodoSchema>;

export default function Home() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodo>({
    resolver: zodResolver(createTodoSchema),
  });
  const [isLoading, setIsloaing] = useState(false);

  const onSubmit = async (data: ITodo) => {
    try {
      setIsloaing(true);
      await axios.post("/api/todo", data);
      toast.success("todo successfully added in list", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsloaing(false);
    } catch (error) {
      toast.error("An unexpected error occurred while submitting the form ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className=" min-h-screen flex pt-10  justify-center">
      <div className=" w-full max-w-xl">
        <div>
          <h2 className=" text-2xl font-medium text-center text-cyan-400">
            Todo List{" "}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className=" pt-5 space-y-4">
            <TextField.Root>
              <TextField.Slot>
                <PlusCircledIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
                {...register("title")}
                placeholder="Search the docs…"
              />
            </TextField.Root>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <SimpleMDE onChange={field.onChange} value={field.value} />
              )}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Button type="submit">
              {isLoading && <Spinner />} Add Todo{" "}
              <PlusIcon width="16" height="16" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
