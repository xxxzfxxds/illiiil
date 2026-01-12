const socket = io();

const player = document.getElementById('player');
const toggleBtn = document.getElementById('toggle-btn');
const uploadSection = document.getElementById('upload-section');
const fileInput = document.getElementById('file-input');
const sendBtn = document.getElementById('send-btn');
const backBtn = document.getElementById('back-btn');

// По умолчанию — получатель
let role = 'listener';

socket.on('connect', () => {
  console.log('Connected as listener');
});

socket.on('play-track', (url) => {
  player.src = url;
  player.play().catch(e => console.error("Autoplay blocked:", e));
});

socket.on('stop-track', () => {
  player.pause();
  player.src = '';
});

// Функция для переключения в режим отправителя
function switchToSender() {
  document.body.innerHTML = `
    <div id="upload-section">
      <h2>Режим отправителя</h2>
      <input type="file" id="file-input" accept=".mp3">
      <button id="send-btn">Отправить</button>
      <button id="back-btn">Назад к прослушиванию</button>
    </div>
  `;

  const fileInput = document.getElementById('file-input');
  const sendBtn = document.getElementById('send-btn');
  const backBtn = document.getElementById('back-btn');

  sendBtn.onclick = () => {
    const file = fileInput.files[0];
    if (!file) return alert("Выберите файл");

    const formData = new FormData();
    formData.append('audio', file);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        socket.emit('new-track', { url: data.url });
      } else {
        alert("Ошибка при загрузке файла.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Ошибка при загрузке файла.");
    });
  };

  backBtn.onclick = () => {
    location.reload();
  };
}

toggleBtn.onclick = () => {
  switchToSender();
};