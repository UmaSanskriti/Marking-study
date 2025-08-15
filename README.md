# Marking Study Prototype

This repository contains a static prototype website for exploring how teachers interact with AI-assisted marking.

## Usage

Clone the repository and install dependencies (none are required but this ensures `package-lock.json` is up to date):

```bash
npm install
```

Start the server to load questions from the CSV files into a local JSON database and serve the web app:

```bash
npm start
```

The study includes:

- **Part 1:** Familiarisation with AI marking across 8 sample questions.
- **Part 2:** Timed marking session with 32 questions (16 each in Part 2a and Part 2b) where teachers can mark themselves or delegate to AI.

Each question allows teachers to choose between marking themselves or using AI-generated marks with high/low confidence and staged vs. summarised explanations. Results and a bonus tied to accuracy are shown at the end.

## Development

- Verify the JavaScript syntax with `npm test`.
- Run tests from the repository root so `npm` can locate `package.json`.

