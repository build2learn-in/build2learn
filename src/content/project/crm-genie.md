---
title: 'CRM Genie : Natural Language to SQL Query generator'
participants:
  - 'yogeshravichandran'
  - 'vasudevan19'
  - 'bagavath-ravichandran-ba5b38321'
  - 'shekkylar-krishnan'
photo: '/images/projects/CRM_Genie.jpeg'
eventDate: 'April 19, 2025'
projectTitle: 'CRM Genie : Natural Language to SQL Query generator'
description: 'Our project aimed to convert natural language questions into accurate SQL queries. Initially, it could only generate basic queries and often struggled with correct column names.

To improve this, we used a technique called Retrieval-Augmented Generation (RAG). We took all the column names from our database and created descriptions , split them into chunks, and converted them into embeddings to create a knowledge base.

When the user types a query in plain English, the backend first identifies relevant column info using these embeddings. Then, it sends both the user input and the retrieved knowledge to the Gemini 2.5 Pro model to generate a precise SQL query.

The generated query is run on a MySQL database, and the result is returned.'
techStack:
  - 'React.js'
  - 'Flask'
  - 'MySQL'
  - 'Gemini 2.5 Pro'
  - 'all-MiniLM-L6-v2'
githubRepo: 'https://gitlab.com/vasudevan-repo/querybuilder'
demoUrl: ''
linkedinMention: 'Although our frontend (React.js) wasn’t fully connected, we successfully tested the results through the terminal.

The CRM Genie project is an extension of the work we began during the January Build2Learn event in collaboration with Selvakumar Duraipandian, Ramachandran V, and Yogeshwaran Ravichandran.'
---
