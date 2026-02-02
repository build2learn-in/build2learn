---
title: 'Build2Learn Edition #34'
description: 'Lights, Camera, Code! — Our Kollywood-Adjacent Hackday at Entrans Technologies'
pubDate: 'Jan 31 2026'
heroImage: '/images/blog/build2learn_edition34_image1.png'
tags: ['build2learn', 'hackday', 'community']
authors: ['ashish']
---

_Lights, Camera, Code! — Our Kollywood-Adjacent Hackday_

January 31st, 2026 | Hosted at Entrans Technologies

So here's the thing about Build2Learn — every edition has its own flavor, its own chaos, and its own little surprises. Edition #34? It came with a Kollywood twist. No, seriously.

<figure style="text-align: center; margin: 2rem 0;">
  <img src="/images/blog/build2learn_edition34_image1.png" alt="Build2Learn Edition 34" style="max-width: 100%; border-radius: 12px;" />
</figure>

## The Adventure Before the Event

Picture this: You're trying to find the venue, but there's construction happening everywhere in the IT park. You finally locate the building, walk up to what you think is the right office, and… the company doesn't exist. Or at least, the board says something completely different.

Turns out, there was an actual movie shoot happening inside! They'd replaced the signage and everything. We got to see the whole setup — big cameras, extras walking around, maybe even a star or two. For a moment there, I wasn't sure if we were at a hackathon or accidentally wandering onto a film set.

We were quickly ushered to our hall so we wouldn't disturb the shoot. Honestly, not the entrance we expected, but definitely one we'll remember!

## Wait, What's Build2Learn?

For those who are new here — Build2Learn is a community where people come together to _actually build things_. Not just talk about ideas, not just attend another lecture, but sit down and create something. We meet monthly, we collaborate, we learn from each other, and we ship micro-products in a single day.

Technical experts, students, professionals — everyone's welcome. The only requirement? Show up ready to build.

This edition, we had around 20-21 builders in the room. And the projects? Let me tell you, they were something else.

## The Projects That Came to Life

Alright, let's get into the good stuff. Here's what everyone was cooking:

---

### DevFlow — by Suresh Kumar (DSK)

<figure style="text-align: center; margin: 1.5rem 0;">
  <img src="/images/blog/build2learn_edition34_image2.png" alt="DevFlow by DSK" style="max-width: 100%; border-radius: 12px;" />
</figure>

DSK has so many side projects running that he literally built a product just to track all his other products. Classic developer move, right?

This time he built [DevFlow](https://github.com/sureshdsk/devflow-mcp).

DevFlow is a Kanban board specifically designed for managing AI agents and their tasks. But here's the clever part — when you run out of API credits on one LLM, you can seamlessly switch that same task (with all its context intact) to another LLM. Right there on the board. You can monitor, track, and see exactly where each agent is in completing its work. Super practical for anyone juggling multiple AI tools.

---

### Hinder — by Rhikshitha

<figure style="text-align: center; margin: 1.5rem 0;">
  <img src="/images/blog/build2learn_edition34_image3.png" alt="Hinder by Rhikshitha" style="max-width: 100%; border-radius: 12px;" />
</figure>

Okay, this one was wild. Rhikshitha built Hinder — think of it as a relationship red-flag detector. You upload your WhatsApp chat history with someone, and it analyzes the conversation to flag potential red flags in your relationship.

Should you break up? Should you not? And if you do decide to end things, it even suggests how to have that conversation with this particular person based on the chat patterns.

We generated a bunch of test data to try it out, and honestly? It was _scary accurate_. She used a TensorFlow toxicity model under the hood, and it worked really well. Somewhat terrifying, but really good.

---

### LLM Hallucination Detector — by Divya and Team

<figure style="text-align: center; margin: 1.5rem 0;">
  <img src="/images/blog/build2learn_edition34_image4.png" alt="LLM Hallucination Detector" style="max-width: 100%; border-radius: 12px;" />
</figure>

This was a college team project, and they tackled something that's been bugging a lot of people in the AI space — when exactly does an LLM start hallucinating?

They're using time-series analysis to capture that moment when the model starts drifting from reality. The goal is to catch it in the act and understand what's happening under the hood. Really interesting research direction.

---

### Lend-a-Read — by Shiny

<figure style="text-align: center; margin: 1.5rem 0;">
  <img src="/images/blog/build2learn_edition34_image5.png" alt="Lend-a-Read by Shiny" style="max-width: 100%; border-radius: 12px;" />
</figure>

This one has such a wholesome origin story. Shiny started a community library in her neighborhood, and now she wants to scale it up to all 800 houses in her community.

Lend-a-Read is a platform where people can list books they're willing to lend. Others in the community can browse, find a book they want, and just walk over to that person's door to borrow it. Simple, effective, community-driven. Love it.

---

### The "Who Broke the Tests?" Tool — by Gopi, Karthik, Monish & Venkatesh

<figure style="text-align: center; margin: 1.5rem 0;">
  <img src="/images/blog/build2learn_edition34_image6.png" alt="Who Broke the Tests Tool" style="max-width: 100%; border-radius: 12px;" />
</figure>

Now this is something every engineering team needs. This tool doesn't just help you write tests — it holds people accountable.

If someone's code breaks existing tests, the tool automatically creates a Jira ticket and assigns it to the person who broke them. No more "who pushed that?" conversations in standups. The system just handles it. I found this genuinely useful — this could save so many back-and-forth discussions.

---

### Your Meal Plan — by Ganesh, Vignesh & Imtiyaz

<figure style="text-align: center; margin: 1.5rem 0;">
  <img src="/images/blog/build2learn_edition34_image7.png" alt="Your Meal Plan" style="max-width: 100%; border-radius: 12px;" />
</figure>

We've all been there — standing in front of the fridge, wondering what to eat, while also trying to not blow our budget. These guys built a solution.

Your Meal Plan takes your budget and calorie goals, then tells you exactly what to eat each day. It shows you the total cost, the calorie breakdown — everything. It takes away that cognitive load of figuring out "what should I eat today?" every single day. It worked really well in the demo.

---

### Insurance-Hospital Connector — by Arjun

<figure style="text-align: center; margin: 1.5rem 0;">
  <img src="/images/blog/build2learn_edition34_image8.png" alt="Insurance-Hospital Connector by Arjun" style="max-width: 100%; border-radius: 12px;" />
</figure>

Arjun's working on a startup, and he brought his product to Build2Learn to push it forward. The idea? Help people find hospitals that have a solid relationship with their insurance provider.

You know how sometimes insurance claims get rejected or only partially approved? This tool helps you find hospitals where 95%+ of claims from your insurance provider get approved. No more nasty surprises when you're already dealing with health issues.

---

## Wrapping Up

We wrapped up around 2 PM (on time for once!), but honestly, people stuck around till 2:30 just chatting, exchanging ideas, and figuring out how to take these projects forward. Suresh even gave out a couple of books to everyone — always a nice touch.

Huge shoutout to **Entrans Technologies** for sponsoring this edition and giving us a space to build (even if we had to navigate past a film crew to get there).

More stories and updates are being shared on LinkedIn — go check them out. And if you're reading this thinking "I want to be part of this" — you absolutely should. Come build with us.

**— See you at the next one! —**
