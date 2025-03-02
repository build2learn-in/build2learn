import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const skillSchema = z.object({
  skill: z.string().min(1, "Skill name is required").max(50, "Skill name is too long"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"])
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await req.json()
    const validatedData = skillSchema.parse(data)

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const skill = await prisma.userSkill.create({
      data: {
        userId: user.id,
        skill: validatedData.skill,
        level: validatedData.level
      }
    })

    return NextResponse.json(skill)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 })
    }
    console.error("[SKILLS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const skillId = searchParams.get("id")

    if (!skillId) {
      return new NextResponse("Skill ID is required", { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    await prisma.userSkill.deleteMany({
      where: {
        id: skillId,
        userId: user.id
      }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[SKILLS_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
