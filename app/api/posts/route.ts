import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    title,
    prompt,
    category,
    source,
    description,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const post = await prisma.post.create({
    data: {
      title,
      prompt,
      category,
      source,
      description,
      userId: currentUser.id
    }
  });

  return NextResponse.json(post);
}