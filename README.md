# Resume Parser App

A React frontend application that allows users to upload PDF resumes and parse them using the Talenty API.

## Features

- PDF file selection and validation
- File upload to `https://resume-match-dev.talenty.com/api/parse_resume`
- Loading indicator during processing
- Error handling and display
- Pretty-printed JSON response display
- Clean, modern UI with inline styling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Usage

1. Click on the file input area to select a PDF resume file
2. Click the "Upload & Parse" button to send the file to the API
3. Wait for the processing to complete
4. View the parsed resume data in JSON format

## API Endpoint

The app sends POST requests to:
```
https://resume-match-dev.talenty.com/api/parse_resume
```

The request is sent as `multipart/form-data` with the PDF file in the `file` field.

## Technologies Used

- React 18 with functional components and hooks
- Vite for build tooling
- Fetch API for HTTP requests
- Inline CSS for styling

## Project Structure

```
src/
├── App.jsx              # Main app component
├── ResumeParser.jsx     # Resume parser component
├── main.jsx            # React entry point
└── index.css           # Global styles
``` 