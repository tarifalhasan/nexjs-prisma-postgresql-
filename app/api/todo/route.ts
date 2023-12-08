import prisma from "@/lib/prisma";
import { createTodoSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = createTodoSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });

  const newPost = await prisma.todo.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newPost, {
    status: 201,
  });
}
