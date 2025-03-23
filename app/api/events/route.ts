import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  eventDate: z.string().transform((str) => new Date(str)),
  registrationDeadline: z.string().transform((str) => new Date(str)),
  location: z.string().optional(),
  maxParticipants: z.number().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export async function POST(request: Request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedFields = eventSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { 
          error: "Invalid fields",
          details: validatedFields.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: validatedFields.data,
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json(
      { 
        error: "Failed to create event",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 