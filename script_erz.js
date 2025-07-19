document.addEventListener('DOMContentLoaded', () => {
  // Кнопка "Связаться"
  const contactBtn = document.querySelector('.button');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      alert('Спасибо за интерес! Мы свяжемся с вами.');
    });
  }

  // ----- Игра «Напомни» (на память) -----
  const startMemoryBtn = document.getElementById('start-memory');
  const memorySequenceDiv = document.getElementById('memory-sequence');
  const memoryInput = document.getElementById('memory-input');
  const checkMemoryBtn = document.getElementById('check-memory');
  const memoryResult = document.getElementById('memory-result');

  let sequence = '';
  let showingSequence = false;

  function generateSequence(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let seq = '';
    for (let i = 0; i < length; i++) {
      seq += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return seq;
  }

  startMemoryBtn?.addEventListener('click', () => {
    if (showingSequence) return;
    memoryResult.textContent = '';
    memoryInput.value = '';
    memoryInput.style.display = 'none';
    checkMemoryBtn.style.display = 'none';
    sequence = generateSequence(5);
    memorySequenceDiv.textContent = sequence;
    showingSequence = true;

    setTimeout(() => {
      memorySequenceDiv.textContent = '';
      memoryInput.style.display = 'inline-block';
      checkMemoryBtn.style.display = 'inline-block';
      memoryInput.focus();
      showingSequence = false;
    }, 3000);
  });

  checkMemoryBtn?.addEventListener('click', () => {
    if (memoryInput.value.toUpperCase() === sequence) {
      memoryResult.textContent = 'Правильно! 🎉';
      memoryResult.style.color = 'lightgreen';
    } else {
      memoryResult.textContent = `Неправильно, правильный ответ: ${sequence}`;
      memoryResult.style.color = 'tomato';
    }
  });

  // ----- Игра на реакцию -----
  const startReactionBtn = document.getElementById('start-reaction');
  const reactionBox = document.getElementById('reaction-box');
  const reactionResult = document.getElementById('reaction-result');

  let reactionStartTime = 0;
  let reactionTimeout;

  startReactionBtn?.addEventListener('click', () => {
    reactionResult.textContent = '';
    reactionBox.style.backgroundColor = '#415a77';
    reactionBox.style.display = 'none';
    startReactionBtn.disabled = true;

    const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5 секунд

    reactionTimeout = setTimeout(() => {
      reactionBox.style.display = 'block';
      reactionBox.style.backgroundColor = '#4caf50';
      reactionStartTime = Date.now();
    }, delay);
  });

  reactionBox?.addEventListener('click', () => {
    if (reactionStartTime === 0) {
      // клик до начала — фолл
      reactionResult.textContent = 'Слишком рано! Начните заново.';
      reactionResult.style.color = 'tomato';
      clearTimeout(reactionTimeout);
      startReactionBtn.disabled = false;
      reactionBox.style.display = 'none';
    } else {
      const reactionTime = Date.now() - reactionStartTime;
      reactionResult.textContent = `Ваше время реакции: ${reactionTime} мс`;
      reactionResult.style.color = 'lightgreen';
      reactionStartTime = 0;
      startReactionBtn.disabled = false;
      reactionBox.style.display = 'none';
    }
  });

  // Плавный скролл (если есть якоря)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetID = this.getAttribute('href').substring(1);
      const targetElem = document.getElementById(targetID);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
// Обработка формы подписки
const subscriptionForm = document.getElementById('subscription-form');
const formMessage = document.getElementById('form-message');

if (subscriptionForm) {
  subscriptionForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = subscriptionForm.name.value.trim();
    const phone = subscriptionForm.phone.value.trim();
    const plan = subscriptionForm.plan.value;

    if (!name || !phone || !plan) {
      formMessage.textContent = 'Пожалуйста, заполните все поля.';
      formMessage.style.color = 'tomato';
      return;
    }

    // Здесь можно добавить отправку данных на сервер
    // Пока просто выводим подтверждение
    formMessage.textContent = `Спасибо, ${name}! Ваша подписка на "${plan}" оформлена. Мы свяжемся с вами по телефону ${phone}.`;
    formMessage.style.color = 'lightgreen';

    subscriptionForm.reset();
  });
}
function loadMemoryGame() {
  const gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = `
    <div>
      <h2>🧠 Запомни числа</h2>
      <p id="memoryNumbers" style="font-size:24px;margin:20px 0;"></p>
      <input type="text" id="memoryInput" placeholder="Введи числа" />
      <button onclick="checkMemory()">Проверить</button>
      <p id="memoryResult"></p>
    </div>
  `;
  startMemory();
}

function startMemory() {
  const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 90 + 10));
  document.getElementById("memoryNumbers").textContent = numbers.join(" ");
  setTimeout(() => {
    document.getElementById("memoryNumbers").textContent = "Введи числа:";
    document.getElementById("memoryInput").style.display = "inline-block";
  }, 3000);
  window.correctMemory = numbers.join(" ");
}

function checkMemory() {
  const user = document.getElementById("memoryInput").value.trim();
  const result = document.getElementById("memoryResult");
  if (user === window.correctMemory) {
    result.textContent = "✅ Молодец! Всё правильно!";
    result.style.color = "lightgreen";
  } else {
    result.textContent = `❌ Ошибка. Правильно: ${window.correctMemory}`;
    result.style.color = "red";
  }
}
function loadReactionGame() {
  const gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = `
    <div>
      <h2>⚡ Проверка реакции</h2>
      <p id="reactionMessage">Нажми старт и жди сигнала...</p>
      <button id="reactionStartBtn" onclick="startReaction()">Старт</button>
    </div>
  `;
}

function startReaction() {
  const message = document.getElementById("reactionMessage");
  const button = document.getElementById("reactionStartBtn");

  message.textContent = "Жди...";
  button.style.display = "none";

  const delay = Math.random() * 3000 + 2000;
  setTimeout(() => {
    message.textContent = "ЖМИ СЕЙЧАС!";
    const start = Date.now();

    document.body.onclick = () => {
      const reactionTime = Date.now() - start;
      message.textContent = `⏱️ Твоя реакция: ${reactionTime} мс`;
      document.body.onclick = null;
      button.textContent = "Ещё раз";
      button.style.display = "inline-block";
    };
  }, delay);
}