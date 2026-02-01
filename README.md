# Audio Sync Site

A real-time audio sharing application that allows users to upload and synchronize audio playback across multiple clients.

## Features

- Real-time audio synchronization across multiple users
- Audio file upload functionality
- Two modes: sender (uploader) and listener (receiver)
- WebSocket-based communication for instant updates

## Technologies Used

- **Node.js** - Server-side runtime environment
- **Express** - Web application framework
- **Socket.IO** - Real-time bidirectional event-based communication
- **Multer** - Middleware for handling multipart/form-data (file uploads)
- **HTML/CSS/JavaScript** - Frontend technologies

## Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the server:
```bash
npm start
```

2. Open your browser and go to `http://localhost:3000`

3. By default, you'll be in listener mode where you can hear audio shared by others

4. Click the toggle button to switch to sender mode where you can upload and share audio files

## How It Works

- When a user uploads an audio file in sender mode, it gets saved to the `uploads/` directory
- The file URL is broadcasted to all connected clients via Socket.IO
- All listeners automatically start playing the new audio track
- Multiple users can listen to the same audio in sync

## Project Structure

```
├── client.js          # Client-side JavaScript for UI and Socket.IO interactions
├── server.js          # Main server file with Express and Socket.IO setup
├── index.html         # Main HTML page
├── style.css          # Styling for the application
├── package.json       # Project metadata and dependencies
├── uploads/           # Directory for storing uploaded audio files
└── README.md          # This file
```

## Configuration

The server runs on port 3000 by default, but you can change this by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## Security Considerations

- File type validation is currently limited to MP3 files through the client-side accept attribute
- Uploaded files are stored with timestamps to prevent overwriting
- Production deployments should implement additional security measures for file uploads

## License

This project does not have an explicit license.