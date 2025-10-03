---
title: 'How to submit your project?'
description: 'Instructions to submit your project to display in build2learn project showcase.'
pubDate: 'Apr 07 2025'
heroImage: '/how-to-submit-your-project.jpg'
tags: ['build2learn', 'contribution']
---

Follow these step-by-step instructions to showcase your project on build2learn.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Your project code ready to share

## Steps to Submit Your Project

### 1. Fork the Repository

1. Visit the [build2learn repository](https://github.com/build2learn-in/build2learn)
2. Click the "Fork" button in the top-right corner
3. This will create a copy of the repository in your GitHub account

### 2. Clone Your Fork

```bash
# Clone your forked repository
git clone https://github.com/YOUR-USERNAME/build2learn.git

# Navigate to the project directory
cd build2learn

# Create a new branch for your project
git checkout -b add-project-YOUR-PROJECT-NAME
```

### 3. Add Your Project

1. Navigate to `src/content/projects/` directory
2. Create a new markdown file with your project name (e.g., `your-project-name.md`)
3. Use the following template for your project:

```markdown
---
title: 'Your Project Title'
description: 'A brief description of your project'
pubDate: 'YYYY-MM-DD'
heroImage: '/path-to-your-project-image.jpg'
githubLink: 'https://github.com/your-username/your-project' # Optional
demoLink: 'https://your-project-demo-link.com' # Optional
tags: ['react', 'nodejs', 'mongodb'] # Add relevant technologies
---

## About Project

Describe your project here. What does it do? What problem does it solve?

## Features

- Feature 1
- Feature 2
- Feature 3

## Technologies Used

- List the main technologies
- Frameworks
- Libraries

## Setup Instructions

Provide basic setup instructions for running your project locally.

## Screenshots/Demo

Add screenshots or demo video links if available.
```

### 4. Add Project Images

1. Add your project images to the `public/projects/` directory
2. Use relative paths in your markdown file to reference these images

### 5. Submit Your PR

1. Commit your changes:

```bash
git add .
git commit -m "Add project: YOUR-PROJECT-NAME"
git push origin add-project-YOUR-PROJECT-NAME
```

2. Go to the [build2learn repository](https://github.com/build2learn-in/build2learn)
3. Click "Pull Requests" > "New Pull Request"
4. Select your fork and branch
5. Fill in the PR description template
6. Submit the pull request

### PR Review Process

- Your PR will be reviewed by the maintainers
- They may request changes or improvements
- Once approved, your project will be merged and displayed on the website

### Guidelines for Project Submission

- Ensure your project is complete and working
- Include clear documentation
- Add high-quality screenshots/images
- Make sure all links are working
- Follow the markdown template structure
- Use appropriate tags for technologies used
