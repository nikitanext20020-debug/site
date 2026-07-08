// Векторные круглые флаги для совместимости с Windows/macOS/Linux
function getFlagSVG(code) {
  const c = code.toLowerCase();
  let content = '';
  
  if (c === 'de') {
    content = `
      <rect width="24" height="8" fill="#000000"/>
      <rect y="8" width="24" height="8" fill="#FF0000"/>
      <rect y="16" width="24" height="8" fill="#FFCC00"/>
    `;
  } else if (c === 'it') {
    content = `
      <rect width="8" height="24" fill="#009246"/>
      <rect x="8" width="8" height="24" fill="#FFFFFF"/>
      <rect x="16" width="8" height="24" fill="#CE2B37"/>
    `;
  } else if (c === 'ru') {
    content = `
      <rect width="24" height="8" fill="#FFFFFF"/>
      <rect y="8" width="24" height="8" fill="#0039A6"/>
      <rect y="16" width="24" height="8" fill="#D52B1E"/>
    `;
  } else if (c === 'md') {
    content = `
      <rect width="8" height="24" fill="#003DA5"/>
      <rect x="8" width="8" height="24" fill="#F1B82D"/>
      <rect x="16" width="8" height="24" fill="#E8112D"/>
      <path d="M12,9 L10.5,11 L11,14 L13,14 L13.5,11 Z" fill="#7A3E1E"/>
      <rect x="11.2" y="11.2" width="1.6" height="1.6" fill="#D52B1E"/>
    `;
  } else if (c === 'nl') {
    content = `
      <rect width="24" height="8" fill="#AE1C28"/>
      <rect y="8" width="24" height="8" fill="#FFFFFF"/>
      <rect y="16" width="24" height="8" fill="#21468B"/>
    `;
  } else if (c === 'us') {
    content = `
      <rect width="24" height="24" fill="#FFFFFF"/>
      <rect y="0" width="24" height="2" fill="#B22234"/>
      <rect y="4" width="24" height="2" fill="#B22234"/>
      <rect y="8" width="24" height="2" fill="#B22234"/>
      <rect y="12" width="24" height="2" fill="#B22234"/>
      <rect y="16" width="24" height="2" fill="#B22234"/>
      <rect y="20" width="24" height="2" fill="#B22234"/>
      <rect width="12" height="11" fill="#3C3B6E"/>
      <circle cx="3" cy="3" r="0.6" fill="#FFFFFF"/>
      <circle cx="6" cy="3" r="0.6" fill="#FFFFFF"/>
      <circle cx="9" cy="3" r="0.6" fill="#FFFFFF"/>
      <circle cx="3" cy="6" r="0.6" fill="#FFFFFF"/>
      <circle cx="6" cy="6" r="0.6" fill="#FFFFFF"/>
      <circle cx="9" cy="6" r="0.6" fill="#FFFFFF"/>
    `;
  } else if (c === 'jp') {
    content = `
      <rect width="24" height="24" fill="#FFFFFF"/>
      <circle cx="12" cy="12" r="6" fill="#BC002D"/>
    `;
  } else if (c === 'sg') {
    content = `
      <rect width="24" height="12" fill="#EF3340"/>
      <rect y="12" width="24" height="12" fill="#FFFFFF"/>
      <circle cx="6" cy="6" r="3" fill="#FFFFFF"/>
      <circle cx="7.5" cy="6" r="3" fill="#EF3340"/>
    `;
  } else {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>`;
  }

  const id = 'clip-' + Math.random().toString(36).substr(2, 5);
  return `
    <svg class="flag-svg" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" style="border-radius:50%; width:24px; height:24px; display:inline-block; vertical-align:middle;">
      <defs>
        <clipPath id="${id}">
          <circle cx="12" cy="12" r="12"/>
        </clipPath>
      </defs>
      <g clip-path="url(#${id})">
        ${content}
      </g>
    </svg>
  `;
}

function renderHomePage() {
  const container = document.getElementById('app-root');
  
  // HTML-верстка главной страницы (копия макета с фото)
  container.innerHTML = `
    <!-- Hero Секция -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">Облачко VPN</h1>
        <p class="hero-subtitle">Быстрый и надежный VPN для свободы в интернете</p>
        <p class="hero-description">
          Защитите свои данные, обходите ограничения и<br>подключайтесь к стабильным серверам по всему миру
        </p>
        <div class="hero-actions">
          <a href="#/tariffs" class="btn btn-primary" data-link>Выбрать тариф</a>
          <a href="#/servers" class="btn btn-secondary" data-link>Серверы</a>
        </div>
      </div>
    </section>

    <!-- Секция интерактивной сети -->
    <section class="network-section">
      <div class="container">
        <div class="glass-card network-panel">
          
          <!-- Левая сторона: Список серверов -->
          <div class="network-servers-list">
            <div class="mini-server-card active" data-server="de">
              <div class="mini-server-info">
                <span class="mini-server-flag">${getFlagSVG('de')}</span>
                <div>
                  <span class="mini-server-name">Германия</span>
                  <span class="mini-server-count">3 сервера</span>
                </div>
              </div>
              <span class="mini-server-ping">
                <span class="ping-dot"></span>
                <span class="ping-value" id="ping-de">24 ms</span>
              </span>
            </div>

            <div class="mini-server-card" data-server="md">
              <div class="mini-server-info">
                <span class="mini-server-flag">${getFlagSVG('md')}</span>
                <div>
                  <span class="mini-server-name">Молдова</span>
                  <span class="mini-server-count">2 сервера</span>
                </div>
              </div>
              <span class="mini-server-ping">
                <span class="ping-dot"></span>
                <span class="ping-value" id="ping-md">32 ms</span>
              </span>
            </div>

            <div class="mini-server-card" data-server="it">
              <div class="mini-server-info">
                <span class="mini-server-flag">${getFlagSVG('it')}</span>
                <div>
                  <span class="mini-server-name">Италия</span>
                  <span class="mini-server-count">1 сервер</span>
                </div>
              </div>
              <span class="mini-server-ping">
                <span class="ping-dot"></span>
                <span class="ping-value" id="ping-it">28 ms</span>
              </span>
            </div>

            <div class="mini-server-card" data-server="ru">
              <div class="mini-server-info">
                <span class="mini-server-flag">${getFlagSVG('ru')}</span>
                <div>
                  <span class="mini-server-name">Россия</span>
                  <span class="mini-server-count">25 серверов</span>
                </div>
              </div>
              <span class="mini-server-ping">
                <span class="ping-dot"></span>
                <span class="ping-value" id="ping-ru">16 ms</span>
              </span>
            </div>
          </div>

          <!-- Центр: Светящееся облако и анимированные импульсы -->
          <div class="network-center">
            <!-- SVG пути для световых импульсов -->
            <svg class="connection-canvas" id="svg-connections" viewBox="0 0 400 300" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgba(0, 191, 255, 0)"/>
                  <stop offset="50%" stop-color="rgba(0, 191, 255, 1)"/>
                  <stop offset="100%" stop-color="rgba(138, 43, 226, 1)"/>
                </linearGradient>
              </defs>
              
              <!-- Задние статические трассы от серверов -->
              <path d="M 10,45 L 120,45 C 150,45 160,150 200,150" stroke="rgba(0, 191, 255, 0.08)" stroke-width="1.5" fill="none" />
              <path d="M 10,115 L 120,115 C 150,115 160,150 200,150" stroke="rgba(0, 191, 255, 0.08)" stroke-width="1.5" fill="none" />
              <path d="M 10,185 L 120,185 C 150,185 160,150 200,150" stroke="rgba(0, 191, 255, 0.08)" stroke-width="1.5" fill="none" />
              <path d="M 10,255 L 120,255 C 150,255 160,150 200,150" stroke="rgba(0, 191, 255, 0.08)" stroke-width="1.5" fill="none" />

              <!-- Задние статические трассы к преимуществам -->
              <path d="M 390,45 L 280,45 C 250,45 240,150 200,150" stroke="rgba(0, 191, 255, 0.08)" stroke-width="1.5" fill="none" />
              <path d="M 390,145 L 280,145 C 250,145 240,150 200,150" stroke="rgba(0, 191, 255, 0.08)" stroke-width="1.5" fill="none" />
              <path d="M 390,245 L 280,245 C 250,245 240,150 200,150" stroke="rgba(0, 191, 255, 0.08)" stroke-width="1.5" fill="none" />

              <!-- Бегущие световые импульсы (Анимированные) -->
              <path d="M 10,45 L 120,45 C 150,45 160,150 200,150" stroke="url(#gradient-pulse)" stroke-width="2.5" fill="none" class="pulse-path" style="animation-delay: 0s;" />
              <path d="M 10,115 L 120,115 C 150,115 160,150 200,150" stroke="url(#gradient-pulse)" stroke-width="2.5" fill="none" class="pulse-path" style="animation-delay: 0.7s;" />
              <path d="M 10,185 L 120,185 C 150,185 160,150 200,150" stroke="url(#gradient-pulse)" stroke-width="2.5" fill="none" class="pulse-path" style="animation-delay: 1.4s;" />
              <path d="M 10,255 L 120,255 C 150,255 160,150 200,150" stroke="url(#gradient-pulse)" stroke-width="2.5" fill="none" class="pulse-path" style="animation-delay: 2.1s;" />

              <path d="M 200,150 C 240,150 250,45 280,45 L 390,45" stroke="url(#gradient-pulse)" stroke-width="2.5" fill="none" class="pulse-path-reverse" style="animation-delay: 0.3s;" />
              <path d="M 200,150 C 240,150 250,145 280,145 L 390,145" stroke="url(#gradient-pulse)" stroke-width="2.5" fill="none" class="pulse-path-reverse" style="animation-delay: 1s;" />
              <path d="M 200,150 C 240,150 250,245 280,245 L 390,245" stroke="url(#gradient-pulse)" stroke-width="2.5" fill="none" class="pulse-path-reverse" style="animation-delay: 1.7s;" />
            </svg>

            <!-- Логотип по центру -->
            <div class="central-cloud">
              <div class="cloud-outer-ring"></div>
              <div class="cloud-inner-ring"></div>
              <div class="cloud-icon-wrapper">
                <svg class="cloud-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <!-- Четкий неоновый SVG логотип -->
                  <defs>
                    <linearGradient id="logo-glow-center" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#ff007f" />
                      <stop offset="100%" stop-color="#00bfff" />
                    </linearGradient>
                  </defs>
                  <path d="M 25,60 A 12,12 0 0,1 27,38 A 18,18 0 0,1 50,23 A 18,18 0 0,1 73,38 A 12,12 0 0,1 75,60 Z" stroke="url(#logo-glow-center)" stroke-width="5" stroke-linejoin="round" fill="none" />
                  <path d="M 50,42 C 50,42 59,45 59,51 C 59,60 50,66 50,66 C 50,66 41,60 41,51 C 41,45 50,42 50,42 Z" stroke="url(#logo-glow-center)" stroke-width="3" fill="none" />
                  <path d="M 46,53 L 49,56 L 54,49" stroke="url(#logo-glow-center)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                </svg>
              </div>
            </div>

            <!-- Статус соединения -->
            <div class="connection-status">
              <div class="status-indicator">
                <span class="status-pulse"></span>
                <span>Подключено</span>
              </div>
              <span class="status-text">Ваше соединение защищено</span>
            </div>
          </div>

          <!-- Правая сторона: Преимущества -->
          <div class="network-features">
            <div class="feature-card-small">
              <div class="feature-icon-small">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <div>
                <h4 class="feature-title-small">Безопасность</h4>
                <p class="feature-desc-small">AES-256 шифрование.<br>Защита ваших данных.</p>
              </div>
            </div>

            <div class="feature-card-small">
              <div class="feature-icon-small">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <div>
                <h4 class="feature-title-small">Высокая скорость</h4>
                <p class="feature-desc-small">Стабильное соединение<br>без потери скорости.</p>
              </div>
            </div>

            <div class="feature-card-small">
              <div class="feature-icon-small">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <div>
                <h4 class="feature-title-small">Глобальная сеть</h4>
                <p class="feature-desc-small">Серверы по всему миру<br>в 4 странах.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Секция статистики -->
    <section class="stats-section">
      <div class="container">
        <div class="glass-card stats-grid">
          <div class="stats-intro">
            <h3>Доступность серверов</h3>
            <p>Наши серверы работают круглосуточно для вашей свободы в интернете</p>
          </div>
          
          <div class="stat-item">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            </div>
            <div>
              <div class="stat-number" id="stats-users">73 000</div>
              <div class="stat-label">Пользователей онлайн</div>
            </div>
          </div>

          <div class="stat-item">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect></svg>
            </div>
            <div>
              <div class="stat-number">46+</div>
              <div class="stat-label">Всего серверов</div>
            </div>
          </div>

          <div class="stat-item">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <div>
              <div class="stat-number">4</div>
              <div class="stat-label">Стран</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Секция выбора тарифа -->
    <section class="home-tariffs-section">
      <div class="container">
        
        <div class="tariffs-layout-row">
          
          <div class="tariffs-sidebar-title">
            <h3>Выберите свой тариф</h3>
            <p>Гибкие тарифные планы для любых потребностей</p>
          </div>
          
          <div class="home-tariffs-grid">
            <!-- Trial тариф -->
            <div class="glass-card tariff-card">
              <div class="tariff-card-header">
                <h4>Trial</h4>
                <p class="tariff-subtitle">Попробуйте VPN без ограничений и риска</p>
                <div class="tariff-price">0₽</div>
              </div>
              <ul class="tariff-features-list">
                <li class="tariff-feature-item">
                  <span class="checkbox-circle-icon"></span>
                  1 день пробного периода
                </li>
                <li class="tariff-feature-item">
                  <span class="checkbox-circle-icon"></span>
                  10 ГБ трафика
                </li>
                <li class="tariff-feature-item">
                  <span class="checkbox-circle-icon"></span>
                  1 день бесплатно
                </li>
                <li class="tariff-feature-item">
                  <span class="checkbox-circle-icon"></span>
                  Базовая скорость
                </li>
                <li class="tariff-feature-item" style="grid-column: span 2;">
                  <span class="checkbox-circle-icon"></span>
                  2 устройства
                </li>
              </ul>
              <a href="#/tariffs?buy=trial" class="btn btn-primary btn-full" data-link>Попробовать бесплатно</a>
            </div>

            <!-- Premium тариф -->
            <div class="glass-card tariff-card tariff-card-premium">
              <div class="tariff-card-header">
                <h4>Premium</h4>
                <p class="tariff-subtitle">Создайте план под ваши нужды</p>
                <div class="tariff-price">от <span class="highlight">250₽</span></div>
              </div>
              <ul class="tariff-features-list">
                <li class="tariff-feature-item">
                  <span class="checkbox-circle-icon"></span>
                  Гибкая настройка тарифа
                </li>
                <li class="tariff-feature-item">
                  <span class="checkbox-circle-icon"></span>
                  Максимальная скорость
                </li>
                <li class="tariff-feature-item">
                  <span class="checkbox-circle-icon"></span>
                  Безлимитный трафик
                </li>
                <li class="tariff-feature-item">
                  <span class="checkbox-circle-icon"></span>
                  Приоритетная поддержка
                </li>
                <li class="tariff-feature-item" style="grid-column: span 2;">
                  <span class="checkbox-circle-icon"></span>
                  До 10 устройств
                </li>
              </ul>
              <a href="#/tariffs?buy=premium" class="btn btn-primary btn-full" data-link>Настроить и купить</a>
            </div>
          </div>

        </div>

      </div>
    </section>
  `;

  // Дополнительные стили, нужные только для SVG импульсов
  injectHomeStyles();

  // Инициализация интерактивных элементов
  initHomeInteractive();
}

function injectHomeStyles() {
  if (document.getElementById('home-custom-styles')) return;
  const style = document.createElement('style');
  style.id = 'home-custom-styles';
  style.textContent = `
    .pulse-path {
      stroke-dasharray: 25, 120;
      stroke-dashoffset: 145;
      animation: pulse-flow-left 3.5s linear infinite;
    }
    
    .pulse-path-reverse {
      stroke-dasharray: 25, 120;
      stroke-dashoffset: -145;
      animation: pulse-flow-right 3.5s linear infinite;
    }

    @keyframes pulse-flow-left {
      0% { stroke-dashoffset: 145; }
      100% { stroke-dashoffset: 0; }
    }

    @keyframes pulse-flow-right {
      0% { stroke-dashoffset: -145; }
      100% { stroke-dashoffset: 0; }
    }
  `;
  document.head.appendChild(style);
}

function initHomeInteractive() {
  // Анимация нарастания цифр пользователей онлайн
  const statsUsers = document.getElementById('stats-users');
  if (statsUsers) {
    let currentUsers = 72890;
    const targetUsers = 73029;
    const duration = 1200; // ms
    const stepTime = 15;
    const steps = duration / stepTime;
    const increment = (targetUsers - currentUsers) / steps;

    const timer = setInterval(() => {
      currentUsers += increment;
      if (currentUsers >= targetUsers) {
        clearInterval(timer);
        statsUsers.textContent = targetUsers.toLocaleString('ru-RU');
        // Запускаем легкие флуктуации после набора
        startUsersFluctuation(statsUsers, targetUsers);
      } else {
        statsUsers.textContent = Math.floor(currentUsers).toLocaleString('ru-RU');
      }
    }, stepTime);
  }

  // Динамические пинги на левой панели
  const pingElements = {
    de: document.getElementById('ping-de'),
    md: document.getElementById('ping-md'),
    it: document.getElementById('ping-it'),
    ru: document.getElementById('ping-ru')
  };

  const pingBaseValues = { de: 24, md: 32, it: 28, ru: 16 };

  const pingInterval = setInterval(() => {
    // Если мы ушли со страницы, очищаем интервал
    if (!document.getElementById('ping-de')) {
      clearInterval(pingInterval);
      return;
    }

    for (const key in pingElements) {
      if (pingElements[key]) {
        const base = pingBaseValues[key];
        const shift = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
        const newVal = Math.max(2, base + shift);
        pingElements[key].textContent = `${newVal} ms`;
      }
    }
  }, 3000);

  // Интерактив при клике на карточки серверов слева
  const miniCards = document.querySelectorAll('.mini-server-card');
  miniCards.forEach(card => {
    card.addEventListener('click', () => {
      miniCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

function startUsersFluctuation(element, startVal) {
  let val = startVal;
  const fluctuationInterval = setInterval(() => {
    if (!document.getElementById('stats-users')) {
      clearInterval(fluctuationInterval);
      return;
    }
    const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
    val += delta;
    element.textContent = val.toLocaleString('ru-RU');
  }, 4000);
}
