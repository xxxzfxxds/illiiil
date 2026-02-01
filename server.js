const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `track_${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Роут для загрузки файла
app.post('/upload', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  const url = `/uploads/${req.file.filename}`;
  res.json({ success: true, url });
});

let currentTrack = null;

io.on('connection', (socket) => {
  // По умолчанию пользователь — получатель
  if (currentTrack) {
    socket.emit('play-track', currentTrack);
  }

  socket.on('new-track', (data) => {
    currentTrack = data.url;
    io.emit('play-track', currentTrack); // всем слушателям
  });

  socket.on('stop-all-tracks', () => {
    currentTrack = null;
    io.emit('stop-track'); // остановить у всех
  });

  socket.on('disconnect', () => {
    // Можно добавить очистку, если нужно
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});