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
function openModal(trainerId) {
  const modal = document.getElementById('trainer-modal');
  const nameEl = document.getElementById('modal-name');
  const specialtyEl = document.getElementById('modal-specialty');
  const descriptionEl = document.getElementById('modal-description');
  const ratingEl = document.getElementById('modal-rating');
  const reviewsEl = document.getElementById('modal-reviews');

  // Пример данных тренеров
  const trainers = {
  alexey: {
    name: "Алексей Иванов",
    specialty: "Специалист по бодибилдингу",
    description: "Профессиональный тренер с 10-летним стажем. Победитель соревнований по бодибилдингу.",
    rating: "4.9 / 5",
    reviews: [
      "🔥 Супер тренер, результат уже через месяц!",
      "💪 Индивидуальный подход к каждому клиенту",
      "👏 Очень внимательный и мотивирующий!"
    ]
  },
  maria: {
    name: "Мария Соколова",
    specialty: "Групповые тренировки",
    description: "Энергичная и опытная. Ведет женские программы и функциональные тренировки.",
    rating: "4.8 / 5",
    reviews: [
      "💃 Классные тренировки, не скучно!",
      "🎯 Помогла достигнуть целей быстрее",
      "😊 Всегда позитивная и отзывчивая"
    ]
  },
   igor: {
    name: "Игорь Смирнов",
    specialty: "Кардио и функционал",
    description: "Мастер кардиотренировок. Поможет развить выносливость и сбросить вес.",
    rating: "4.7 / 5",
    reviews: [
      "🏃 С ним даже бегать приятно!",
      "🔥 Кардио стало любимой частью тренировки",
      "👍 Отлично объясняет технику"
    ]
  },
  olga: {
    name: "Ольга Миронова",
    specialty: "Пилатес и стретчинг",
    description: "Помогает восстановиться после травм, улучшить гибкость и осанку.",
    rating: "4.9 / 5",
    reviews: [
      "🧘 Настоящий мастер своего дела",
      "✨ После её занятий спина не болит",
      "🙌 Всегда спокойная и вдохновляющая"
    ]
  },
  dmitry: {
    name: "Дмитрий Кузнецов",
    specialty: "Силовые тренировки",
    description: "Опытный тренер по тяжелой атлетике. Специалист по набору мышечной массы.",
    rating: "4.8 / 5",
    reviews: [
      "🏋️ Реально прокачал за 2 месяца!",
      "💥 Даёт крутые силовые планы",
      "🧠 Объясняет, как тренироваться безопасно"
    ]
  },
  natalia: {
    name: "Наталия Орлова",
    specialty: "Йога и дыхательные практики",
    description: "Гармония тела и ума. Проводит мягкие практики для женщин и подростков.",
    rating: "4.9 / 5",
    reviews: [
      "🌿 Спокойствие после её занятий",
      "🕊️ Лучшая йога в моей жизни",
      "🌸 Атмосфера — просто космос!"
    ]
  },
  sergey: {
    name: "Сергей Лебедев",
    specialty: "Кроссфит",
    description: "Интенсивные тренировки, высокая результативность. Готовит к соревнованиям.",
    rating: "4.7 / 5",
    reviews: [
      "🔥 Настоящая выносливость после его тренировок",
      "💪 Стал сильнее и увереннее",
      "⚡ Никогда не бывает скучно"
    ]
  },
  elena: {
    name: "Елена Васильева",
    specialty: "Детский фитнес",
    description: "Весёлые и безопасные тренировки для детей. Работает с детьми от 5 лет.",
    rating: "4.9 / 5",
    reviews: [
      "👶 Мой ребёнок в восторге!",
      "🎈 Умеет найти подход к каждому",
      "🎉 Дети бегут на тренировки с радостью"
    ]
  },
  artem: {
    name: "Артём Белов",
    specialty: "Функциональный тренинг",
    description: "Современные методики, укрепление тела и подготовка к соревнованиям.",
    rating: "4.8 / 5",
    reviews: [
      "🚀 Быстро почувствовал эффект",
      "⚙️ Очень разнообразные упражнения",
      "🧩 Хорошо объясняет и мотивирует"
    ]
  },
  // ... остальные тренеры (как у тебя)
  valeria: {
    name: "Валерия Жукова",
    specialty: "Фитнес для женщин",
    description: "Формирование фигуры, уверенность в себе. Работает с женщинами любого возраста.",
    rating: "5.0 / 5",
    reviews: [
      "💃 Наконец-то вижу прогресс!",
      "💖 Поддерживает и вдохновляет",
      "🌟 Тренировки всегда в кайф"
    ]
  }
};

// ✅ Эта функция открывает модалку
function openModal(trainerId) {
  const trainer = trainers[trainerId];
  if (!trainer) return;

  const nameEl = document.getElementById('modal-name');
  const specialtyEl = document.getElementById('modal-specialty');
  const descriptionEl = document.getElementById('modal-description');
  const ratingEl = document.getElementById('modal-rating');
  const reviewsEl = document.getElementById('modal-reviews');
  const modal = document.getElementById('trainer-modal');

  nameEl.textContent = trainer.name;
  specialtyEl.textContent = trainer.specialty;
  descriptionEl.textContent = trainer.description;
  ratingEl.textContent = trainer.rating;

  reviewsEl.innerHTML = "";
  trainer.reviews.forEach((review) => {
    const li = document.createElement("li");
    li.textContent = review;
    reviewsEl.appendChild(li);
  });

  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById('trainer-modal').classList.add('hidden');
}


  

  const trainer = trainers[trainerId];

  if (trainer) {
    nameEl.textContent = trainer.name;
    specialtyEl.textContent = trainer.specialty;
    descriptionEl.textContent = trainer.description;
    ratingEl.textContent = trainer.rating;

    reviewsEl.innerHTML = "";
    trainer.reviews.forEach((review) => {
      const li = document.createElement("li");
      li.textContent = review;
      reviewsEl.appendChild(li);
    });

    modal.classList.remove("hidden");
  }
}

function closeModal() {
  document.getElementById('trainer-modal').classList.add('hidden');
}

// ----------------- Игра «Напомни» -----------------
function startMemoryGame() {
  const sequence = [];
  for (let i = 0; i < 4; i++) {
    sequence.push(Math.floor(Math.random() * 10));
  }
  const answer = prompt("Запомни и введи эту последовательность: " + sequence.join(" "));
  const result = (answer === sequence.join(" ")) ? "✅ Правильно!" : "❌ Неправильно. Было: " + sequence.join(" ");
  document.getElementById("memoryGameResult").innerText = result;
}

// ----------------- Игра на реакцию -----------------
let reactionStartTime;

function startReactionGame() {
  const resultDiv = document.getElementById("reactionGameResult");
  resultDiv.innerText = "Жди зелёного...";
  setTimeout(() => {
    reactionStartTime = Date.now();
    resultDiv.innerText = "НАЖМИ!";
    resultDiv.onclick = () => {
      const reactionTime = Date.now() - reactionStartTime;
      resultDiv.innerText = `⚡ Время реакции: ${reactionTime} мс`;
      resultDiv.onclick = null;
    };
  }, Math.random() * 3000 + 1000);
}
function filterSchedule() {
  const selected = document.getElementById("filterSelect").value;
  const items = document.querySelectorAll(".schedule-grid li");

  items.forEach(item => {
    const type = item.getAttribute("data-type");
    if (selected === "all" || selected === type) {
      item.style.display = "list-item";
    } else {
      item.style.display = "none";
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const isVisible = answer.style.display === "block";

      // Закрыть все ответы
      document.querySelectorAll(".faq-answer").forEach((el) => {
        el.style.display = "none";
      });

      // Показать или скрыть текущий
      answer.style.display = isVisible ? "none" : "block";
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
});
const scheduleData = [
  { time: "07:00", activity: "Йога" },
  { time: "08:00", activity: "Кардио с Марией" },
  { time: "09:00", activity: "Функциональный тренинг" },
  { time: "10:00", activity: "Силовая тренировка с Артёмом" },
  { time: "11:00", activity: "HIIT с Алиной" },
  { time: "12:00", activity: "Перерыв" },
  { time: "13:00", activity: "Бокс с Владом" },
  { time: "14:00", activity: "Растяжка и дыхательные практики" },
  { time: "15:00", activity: "TRX-тренировка" },
  { time: "16:00", activity: "Кроссфит с Тимуром" },
  { time: "17:00", activity: "Dance Workout с Софией" },
  { time: "18:00", activity: "Силовой круг с Алексеем" },
  { time: "19:00", activity: "Функционал с Дарьей" },
  { time: "20:00", activity: "Кардио-интервалы с Никитой" },
  { time: "21:00", activity: "Медитация и расслабление" },
  { time: "22:00", activity: "Закрытие клуба" }
];
const scheduleContainer = document.getElementById("schedule");

scheduleData.forEach(item => {
  const div = document.createElement("div");
  div.className = "schedule-item";
  div.innerHTML = `<strong>${item.time}</strong> — ${item.activity}`;
  scheduleContainer.appendChild(div);
});