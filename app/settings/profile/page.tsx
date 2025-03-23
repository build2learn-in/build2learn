import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ProfileForm } from "./profile-form"
import { SkillsForm } from "./skills-form"

async function getProfile() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect("/auth/signin")
  }
  
  const profile = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      skills: true,
    },
  })
  
  if (!profile) {
    redirect("/auth/signin")
  }
  
  return profile
}

export default async function SettingsProfilePage() {
  const profile = await getProfile()
  
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <Card>
          <CardHeader>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight">Profile Settings</h3>
              <p className="text-sm text-muted-foreground">
                Manage your public profile information and preferences.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <ProfileForm profile={profile} />
              <Separator className="my-8" />
              <SkillsForm skills={profile.skills} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
