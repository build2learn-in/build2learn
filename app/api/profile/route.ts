import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await req.json()

    // Check if username is taken by another user
    if (data.username) {
      const existingUser = await prisma.user.findUnique({
        where: {
          username: data.username,
          NOT: {
            email: session.user.email,
          },
        },
      })

      if (existingUser) {
        return new NextResponse("Username is already taken", { status: 400 })
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        username: data.username,
        name: data.name,
        bio: data.bio,
        location: data.location,
        githubUrl: data.githubUrl || null,
        linkedinUrl: data.linkedinUrl || null,
        twitterUrl: data.twitterUrl || null,
        websiteUrl: data.websiteUrl || null,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("[PROFILE_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
