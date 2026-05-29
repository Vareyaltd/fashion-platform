"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function createPost(content: string, image?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { username: session.user.name } });
  if (!user) throw new Error("User not found");

  await prisma.post.create({
    data: {
      content,
      image,
      authorId: user.id
    }
  });
  
  revalidatePath("/community");
}

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' }
    });
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getMessages() {
  try {
    const messages = await prisma.chatMessage.findMany({
      include: { author: true },
      orderBy: { createdAt: 'asc' },
      take: 50,
    });
    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

export async function sendMessage(content: string, eventId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { username: session.user.name } });
  if (!user) throw new Error("User not found");

  await prisma.chatMessage.create({
    data: {
      content,
      eventId,
      authorId: user.id
    }
  });

  revalidatePath("/runway");
}

export async function getCurrentEvent() {
  try {
    let event = await prisma.event.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    if (!event) {
      // Create a default event if database is empty so UI has something to render
      event = await prisma.event.create({
        data: {
          title: "Neo-Tokyo Showcase",
          creator: "CYBER_AESTHETICS",
          status: "Upcoming",
          ticketPrice: 0.1,
          ticketCurrency: "ETH"
        }
      });
    }
    
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error("Error fetching current event:", error);
    return null;
  }
}

