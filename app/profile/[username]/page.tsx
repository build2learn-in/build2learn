import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  GithubIcon, 
  LinkedinIcon, 
  TwitterIcon, 
  GlobeIcon, 
  MapPinIcon,
  CalendarIcon,
  MailIcon,
  EditIcon
} from "lucide-react"
import Link from "next/link"

async function getProfile(username: string) {
  const profile = await prisma.user.findFirst({
    where: { 
      username: {
        equals: username,
        not: null
      }
    },
    include: {
      skills: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      registrations: {
        include: {
          event: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      },
      submissions: {
        include: {
          event: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      }
    },
  })
  
  if (!profile) {
    notFound()
  }

  // Ensure we have a valid image URL
  if (profile.image?.startsWith('http')) {
    profile.image = profile.image;
  } else {
    profile.image = null;
  }
  
  return profile
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const profile = await getProfile(params.username)
  const session = await getServerSession(authOptions)
  const isOwnProfile = session?.user?.email === profile.email
  
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-start gap-6 sm:gap-8">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32 ring-2 ring-border">
                  {profile.image ? (
                    <AvatarImage 
                      src={profile.image} 
                      alt={profile.name || "User avatar"} 
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : null}
                  <AvatarFallback className="text-2xl font-medium">
                    {profile.name?.slice(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">{profile.name}</h1>
                      <p className="text-muted-foreground">@{profile.username}</p>
                    </div>
                    {isOwnProfile && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/settings/profile">
                          <EditIcon className="h-4 w-4 mr-1" />
                          Edit Profile
                        </Link>
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {profile.email && (
                      <div className="flex items-center gap-2">
                        <MailIcon className="h-4 w-4 shrink-0" />
                        <span>{profile.email}</span>
                      </div>
                    )}
                    {profile.location && (
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4 shrink-0" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 shrink-0" />
                      <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {profile.bio && (
                    <p className="text-muted-foreground">{profile.bio}</p>
                  )}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {profile.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                          <GithubIcon className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {profile.linkedinUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                          <LinkedinIcon className="h-4 w-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {profile.twitterUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer">
                          <TwitterIcon className="h-4 w-4 mr-2" />
                          Twitter
                        </a>
                      </Button>
                    )}
                    {profile.websiteUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer">
                          <GlobeIcon className="h-4 w-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {profile.skills.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge key={skill.id} variant="secondary" className="text-sm">
                      {skill.skill}
                      <span className="ml-1 opacity-60">&middot; {skill.level.toLowerCase()}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {profile.registrations.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
                <div className="space-y-4">
                  {profile.registrations.map((registration) => (
                    <div key={registration.id} className="flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium truncate">{registration.event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(registration.event.eventDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge>{registration.status.toLowerCase()}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {profile.submissions.length > 0 && (
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Project Submissions</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {profile.submissions.map((submission) => (
                    <Card key={submission.id}>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{submission.projectName}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {submission.event.title}
                        </p>
                        {submission.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {submission.description}
                          </p>
                        )}
                        {submission.projectUrl && (
                          <Button variant="link" size="sm" className="px-0" asChild>
                            <a href={submission.projectUrl} target="_blank" rel="noopener noreferrer">
                              View Project
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
