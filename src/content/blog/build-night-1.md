---
title: 'Build Night #1'
description: 'Text-to-SQL, Tamil Words, QR Rooms, and a Cake Sent to Me Mid-Demo'
pubDate: 'Nov 05 2026'
heroImage: '/images/blog/build_night_1_hero.jpg'
tags: ['build2learn', 'hackday', 'community']
authors: ['ashish']
---

Last night we tried something new at Build2Learn, and I think it's going to stick.

Build nights are the smaller, sharper cousin of our monthly meetups. No venue, no two-hour build window, no teams forming over chai. Just a Google Meet, a handful of people, and one rule: if you don't have something to demo, you don't come. I actually turned a few people away for exactly that reason, and I say this out of love. Everyone who showed up had built something, and everyone showed it.

The format was simple. Five minutes each: three to demo, two for questions. If you can't show the best of what you've built in three minutes, that's a skill worth practising. Marketers get one minute for an elevator pitch, so honestly, we were spoilt.

Six of us, six demos. Here's what came out.

---

## AI Data Analyst — [Mohammed Mohsin](https://linkedin.com/in/muchu)

Mohsin kicked things off with an enterprise BI chatbot built to answer a very specific complaint: business stakeholders want to ask questions of large datasets, and standard copilots burn a fortune in tokens doing it.

His version takes a question in plain English, has an LLM write the SQL, runs it past a heavier model for a safety check, executes it, and renders the chart. Groq and Qwen for speed, LangChain to wire it together, pandas and NumPy underneath. The demo was running against a Postgres with 16,000 payments and 20,000 rides, and the chart showed up before anyone had time to get bored. Good pattern for anyone doing text-to-SQL.

<figure style="text-align: center; margin: 1.5rem 0;">
  <img src="/images/blog/build_night_1_ai_data_analyst.jpg" alt="Mohsin's AI Data Analyst demo" style="max-width: 100%; border-radius: 12px;" />
</figure>

---

## Kalaichol and an LMS — [Syed Jafer K](https://www.linkedin.com/in/syedjaferk/)

Syed brought two things.

The first is **Kalaichol (கலைச்சொல்)**. Type an English technical word, get the Tamil, hear how each region says it, and rate or suggest a better one. It's sitting on 219,925 words and 68,009 Tamil renderings seeded from Wiktionary, with vector search doing the heavy lifting. The kind of thing that quietly becomes essential.

The second is a production-ready LMS assessment tool. Plain Django, no fancy frontend framework, daily builds going up on Hugging Face. I work with the Tamil Nadu government and have seen their Manika Mani LMS up close, and I'll say it plainly: Syed's is better, at least right now. Arockiaraj suggested auto-generating questions from paragraphs, which Syed is chewing on. He's looking for contributors, so if education is your thing, go talk to him.

<figure style="text-align: center; margin: 1.5rem 0;">
  <img src="/images/blog/build_night_1_kalaichol.jpg" alt="Syed's Kalaichol demo" style="max-width: 100%; border-radius: 12px;" />
</figure>

---

## Sixhuma — [Bharath Kumar](https://www.linkedin.com/in/bharath-kumarjp02/)

Bharath built **Sixhuma** (it used to be Meet Mesh; the new name comes from an African language he loves) to fix a problem every CS student knows: you're at an event, you want to talk to people, and you don't.

So: the host opens a room, attendees join with a four-letter code or a QR scan, and everyone can see profiles, roles and contacts in real time, with a chat alongside. No app to install. The demo gods were not kind to Bharath last night, between hardware trouble and a localhost that wouldn't cooperate, but the idea landed anyway. You can poke at it on the [live site](https://abez-b.github.io/Sixhuma/), and the [repo is public](https://github.com/Abez-B/Sixhuma).

<figure style="text-align: center; margin: 1.5rem 0;">
  <img src="/images/blog/build_night_1_sixhuma.jpg" alt="Bharath's Sixhuma demo" style="max-width: 100%; border-radius: 12px;" />
</figure>

---

## A digital library in your pocket — [Arockiaraj Rayappan](https://www.linkedin.com/in/arockiaraj-rayappan/)

Arockiaraj started with the most relatable problem of the night: we all forward links to ourselves on WhatsApp to "read later", and then we don't.

His Android app fixes that. Share any link to it from the system share sheet, and it saves it, summarises it, and files it by topic. Firebase for sync, Vertex AI for the summaries. It's [live on the Play Store](https://play.google.com/store/apps/details?id=com.mindshift.nexre&hl=en_IN), and here's the part I loved: he had zero Android experience before this. He built it by experimenting with AI tools and shipping anyway. I've been using it and I like it.

Mohsin pointed him to supermemory.ai as a similar product worth studying. Arockiaraj also mentioned a side project, goodcatch.in: a plain HTML page logging mistakes AI makes and what we learn from them, refreshed weekly by a scheduler. Comments on it are stored in a GitHub repo, which kicked off a nice little tangent about running discussions on static sites.

<figure style="text-align: center; margin: 1.5rem 0;">
  <img src="/images/blog/build_night_1_nexre.jpg" alt="Arockiaraj's NexRe technical flow" style="max-width: 100%; border-radius: 12px;" />
</figure>

---

## A startup map and a cake — Suresh Kumar

Suresh also had two.

The first is a Chennai startup directory, on a map. Students and job seekers can see which companies are near them and what they're hiring for right now. He seeded the company data with Serp API and wrote custom JavaScript scrapers for the job pages (Freshworks works nicely). He found a similar one for Bangalore, borrowed some ideas, and built Chennai's.

The second is **Bloomnote**, a digital greeting and slam book app. Pick an occasion, write your words, add flowers, a pet, music, pick a style, and send a link. To prove it worked, Suresh made me a thank-you card with a cake and a rabbit on it, live, while demoing. I am not above being bribed with virtual cake. Try it at [bloomnote.sureshdsk.workers.dev](https://bloomnote.sureshdsk.workers.dev/).

He also teased a "pets roaming in a room" project for next time. No idea what it is yet. Can't wait.

<figure style="text-align: center; margin: 1.5rem 0;">
  <img src="/images/blog/build_night_1_bloomnote.jpg" alt="Suresh's Bloomnote thank-you card" style="max-width: 100%; border-radius: 12px;" />
</figure>

---

## Picking wedding photos faster — Ashish (yes, me)

If you've ever had a photographer hand you a Google Drive folder with thousands of wedding photos and ask you to pick, you know the pain. I built a Chrome extension to make it bearable: press S to star a photo, filter out everything you've already looked at, and export the selected filenames and Drive links as a CSV for the photographer. What used to eat a weekend took two hours.

---

That's build night one. Six people, six working things, one hour. Nobody built in a silo, and everyone left with at least one person to follow up with.

We're going to do these every two to three weeks. Small group, online, everyone demos. If that sounds like your kind of evening, follow Build2Learn on Luma and come to the next one. Bring something to show, or come get ideas for what to build. Just don't come empty-handed.
