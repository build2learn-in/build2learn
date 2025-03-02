"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { type UserSkill } from "@prisma/client"
import { XIcon } from "lucide-react"

const skillFormSchema = z.object({
  skill: z.string().min(1, "Skill name is required").max(50, "Skill name is too long"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"])
})

type SkillFormValues = z.infer<typeof skillFormSchema>

interface SkillsFormProps {
  skills: UserSkill[]
}

export function SkillsForm({ skills: initialSkills }: SkillsFormProps) {
  const router = useRouter()
  const [skills, setSkills] = useState(initialSkills)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      skill: "",
      level: "INTERMEDIATE"
    },
  })

  async function onSubmit(data: SkillFormValues) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/profile/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to add skill")
      }

      const newSkill = await response.json()
      setSkills([...skills, newSkill])
      form.reset()
      toast.success("Skill added successfully")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteSkill(id: string) {
    try {
      const response = await fetch(`/api/profile/skills?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete skill")
      }

      setSkills(skills.filter(skill => skill.id !== id))
      toast.success("Skill deleted successfully")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-4">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill.id} variant="secondary" className="pl-2 h-7">
              {skill.skill}
              <span className="mx-1 opacity-60">&middot; {skill.level.toLowerCase()}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 hover:bg-transparent"
                onClick={() => deleteSkill(skill.id)}
              >
                <XIcon className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="skill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add a Skill</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. React, Python, UI Design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proficiency Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="ADVANCED">Advanced</SelectItem>
                      <SelectItem value="EXPERT">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            Add Skill
          </Button>
        </form>
      </Form>
    </div>
  )
