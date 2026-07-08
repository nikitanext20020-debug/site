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

function renderServersPage() {
  const container = document.getElementById('app-root');
  
  container.innerHTML = `
    <section class="page-section">
      <div class="container">
        
        <div class="page-header-center">
          <h1>Наши серверы</h1>
          <p>Быстрая и стабильная глобальная сеть серверов. Выбирайте любую локацию для безопасного серфинга.</p>
        </div>

        <!-- Панель фильтрации серверов -->
        <div class="servers-filter-bar">
          <div class="filter-tabs">
            <div class="filter-tab-btn active" data-region="all">Все регионы</div>
            <div class="filter-tab-btn" data-region="europe">Европа</div>
            <div class="filter-tab-btn" data-region="asia">Азия</div>
            <div class="filter-tab-btn" data-region="america">Америка</div>
          </div>

          <button class="btn btn-outline" id="btn-ping-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:16px; height:16px; margin-right:8px;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            Проверить все серверы
          </button>
        </div>

        <!-- Список серверов (Загружается динамически) -->
        <div class="servers-grid-detailed" id="servers-list-container">
          <!-- Здесь будут карточки серверов -->
          <div class="page-loader">
            <div class="loader-spinner"></div>
          </div>
        </div>

        <!-- Блок рекомендации лучшего сервера -->
        <div class="glass-card ping-tester-card" style="margin-top: 40px; display: none;" id="recommendation-card">
          <div class="ping-tester-info">
            <h3 id="recommend-title">Рекомендуемый сервер найден!</h3>
            <p id="recommend-desc">Сервер в Германии (Франкфурт) имеет наименьший пинг и низкую загрузку.</p>
          </div>
          <button class="btn btn-primary" id="btn-connect-best">Подключиться к лучшему</button>
        </div>

      </div>
    </section>
  `;

  // Запуск логики загрузки и интерактива
  initServersLogic();
}

async function initServersLogic() {
  const container = document.getElementById('servers-list-container');
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const btnPingAll = document.getElementById('btn-ping-all');
  const recommendationCard = document.getElementById('recommendation-card');
  const recommendDesc = document.getElementById('recommend-desc');
  const btnConnectBest = document.getElementById('btn-connect-best');

  let serversData = [];
  let currentRegion = 'all';

  // Функция рендеринга карточек серверов
  function renderServerCards(servers) {
    if (servers.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          Нет доступных серверов в выбранном регионе.
        </div>
      `;
      return;
    }

    container.innerHTML = servers.map(server => {
      // Подбор цвета загрузки серверов
      let loadColor = 'var(--neon-green)';
      if (server.load > 75) {
        loadColor = 'var(--neon-pink)';
      } else if (server.load > 50) {
        loadColor = 'var(--neon-purple)';
      }

      const isMaintenance = server.status === 'maintenance';
      const statusText = isMaintenance ? 'Обслуживание' : 'Online';
      const statusClass = isMaintenance ? 'status-maintenance' : 'status-online';
      
      // Блокируем кнопку пинга, если сервер в обслуживании
      const pingButtonHtml = isMaintenance 
        ? `<span class="stat-val-det" style="color: var(--text-muted);">-</span>`
        : `<a href="#" class="ping-test-indicator" data-ping-id="${server.id}">
             <span id="ping-text-${server.id}">${server.ping} ms</span>
           </a>`;

      return `
        <div class="glass-card server-card-detailed" data-region="${server.region}" id="server-card-${server.id}">
          <div>
            
            <div class="server-card-header-det">
              <div class="server-card-title">
                <span class="server-flag-det">${getFlagSVG(server.id)}</span>
                <div>
                  <span class="server-name-det">${server.name}</span>
                  <span class="server-city-det">${server.city}</span>
                </div>
              </div>
              <span class="server-status-badge ${statusClass}">${statusText}</span>
            </div>

            <div class="server-stats-det">
              <!-- Загрузка -->
              <div>
                <div class="server-stat-row">
                  <span class="stat-label-det">Загрузка сервера:</span>
                  <span class="stat-val-det" id="load-val-${server.id}">${server.load}%</span>
                </div>
                <div class="load-progress-bar">
                  <div class="load-progress-fill" id="load-progress-${server.id}" style="width: ${server.load}%; background: ${loadColor};"></div>
                </div>
              </div>

              <!-- Пинг -->
              <div class="server-stat-row" style="margin-top: 4px;">
                <span class="stat-label-det">Пинг / Отклик:</span>
                ${pingButtonHtml}
              </div>
            </div>

          </div>

          <!-- IP & Подключение -->
          <div class="server-action-det">
            <span class="server-ip">${server.ip}</span>
            <button class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.8rem;" ${isMaintenance ? 'disabled' : ''} onclick="connectToServer('${server.name} (${server.city})')">
              ${isMaintenance ? 'Недоступен' : 'Выбрать'}
            </button>
          </div>

        </div>
      `;
    }).join('');

    // Вешаем клики на пинг-тест для отдельных серверов
    document.querySelectorAll('.ping-test-indicator').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const serverId = link.getAttribute('data-ping-id');
        testSingleServerPing(serverId);
      });
    });
  }

  // Загрузка данных с сервера
  async function loadServers() {
    try {
      const response = await fetch('/api/servers');
      if (!response.ok) {
        throw new Error('Код ответа сервера: ' + response.status);
      }
      serversData = await response.json();
      filterAndRender();
    } catch (err) {
      console.warn('Используем локальные данные серверов (демо-режим):', err);
      // Fallback-данные на случай отсутствия Node.js сервера (например, на GitHub Pages)
      serversData = [
        { id: 'de', name: 'Германия', city: 'Франкфурт', basePing: 24, load: 42, ip: '185.190.140.12', status: 'online', flag: '🇩🇪', region: 'europe' },
        { id: 'md', name: 'Молдова', city: 'Кишинев', basePing: 32, load: 28, ip: '91.211.89.43', status: 'online', flag: '🇲🇩', region: 'europe' },
        { id: 'it', name: 'Италия', city: 'Милан', basePing: 28, load: 18, ip: '185.228.80.24', status: 'online', flag: '🇮🇹', region: 'europe' },
        { id: 'ru', name: 'Россия', city: 'Москва', basePing: 16, load: 68, ip: '45.142.72.18', status: 'online', flag: '🇷🇺', region: 'europe' },
        { id: 'nl', name: 'Нидерланды', city: 'Амстердам', basePing: 35, load: 55, ip: '80.249.244.115', status: 'online', flag: '🇳🇱', region: 'europe' },
        { id: 'us', name: 'США', city: 'Нью-Йорк', basePing: 110, load: 35, ip: '198.51.100.77', status: 'online', flag: '🇺🇸', region: 'america' },
        { id: 'jp', name: 'Япония', city: 'Токио', basePing: 215, load: 22, ip: '203.0.113.88', status: 'online', flag: '🇯🇵', region: 'asia' },
        { id: 'sg', name: 'Сингапур', city: 'Сингапур', basePing: 185, load: 14, ip: '198.51.100.10', status: 'maintenance', flag: '🇸🇬', region: 'asia' }
      ];
      filterAndRender();
    }
  }

  // Фильтрация серверов
  function filterAndRender() {
    if (currentRegion === 'all') {
      renderServerCards(serversData);
    } else {
      const filtered = serversData.filter(s => s.region === currentRegion);
      renderServerCards(filtered);
    }
  }

  // Клики по вкладкам фильтров
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentRegion = tab.getAttribute('data-region');
      filterAndRender();
    });
  });

  // Логика тестирования пинга одного сервера
  async function testSingleServerPing(serverId) {
    const textEl = document.getElementById(`ping-text-${serverId}`);
    if (!textEl || textEl.classList.contains('testing')) return;

    textEl.classList.add('testing');
    textEl.style.color = 'var(--text-muted)';
    
    // Анимация бегущих точек
    let dots = 0;
    const interval = setInterval(() => {
      dots = (dots + 1) % 4;
      textEl.textContent = 'Тест' + '.'.repeat(dots);
    }, 150);

    // Имитируем сетевой запрос
    await new Promise(resolve => setTimeout(resolve, 1500));
    clearInterval(interval);

    // Получаем новое значение пинга
    const serverObj = serversData.find(s => s.id === serverId);
    if (serverObj) {
      const pingFluctuation = Math.floor(Math.random() * 6) - 3; // +/- 3ms
      const finalPing = Math.max(2, serverObj.basePing + pingFluctuation);
      
      textEl.textContent = `${finalPing} ms`;
      textEl.style.color = 'var(--neon-green)';
      textEl.classList.remove('testing');
      textEl.classList.add('server-ping-tested');
    }
  }

  // Тестирование пинга всех серверов по очереди
  if (btnPingAll) {
    btnPingAll.addEventListener('click', async () => {
      btnPingAll.disabled = true;
      btnPingAll.innerHTML = 'Тестирование...';
      recommendationCard.style.display = 'none';

      // Фильтруем только активные (не на обслуживании) серверы
      const activeServers = serversData.filter(s => s.status !== 'maintenance');
      
      let bestServer = null;
      let minPing = 9999;

      for (const server of activeServers) {
        // Прокручиваем к карточке тестируемого сервера для эффекта погружения
        const cardEl = document.getElementById(`server-card-${server.id}`);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          cardEl.style.boxShadow = '0 0 20px rgba(0, 191, 255, 0.4)';
        }

        const textEl = document.getElementById(`ping-text-${server.id}`);
        if (textEl) {
          textEl.classList.add('testing');
          let dots = 0;
          const interval = setInterval(() => {
            dots = (dots + 1) % 4;
            textEl.textContent = 'Тест' + '.'.repeat(dots);
          }, 100);

          await new Promise(resolve => setTimeout(resolve, 800));
          clearInterval(interval);

          const pingFluctuation = Math.floor(Math.random() * 4) - 2;
          const finalPing = Math.max(2, server.basePing + pingFluctuation);
          
          textEl.textContent = `${finalPing} ms`;
          textEl.style.color = 'var(--neon-green)';
          textEl.classList.remove('testing');
          textEl.classList.add('server-ping-tested');

          // Ищем лучший сервер (наименьший пинг + нагрузка < 80%)
          if (finalPing < minPing && server.load < 80) {
            minPing = finalPing;
            bestServer = server;
            bestServer.testedPing = finalPing;
          }
        }

        // Возвращаем стиль карточки обратно
        if (cardEl) {
          setTimeout(() => {
            cardEl.style.boxShadow = '';
          }, 400);
        }
      }

      // Выводим рекомендацию
      if (bestServer) {
        recommendDesc.innerHTML = `Рекомендуем подключиться к серверу <strong>${bestServer.name} (${bestServer.city})</strong>. <br>Текущий пинг: <strong>${bestServer.testedPing} ms</strong>, загрузка: <strong>${bestServer.load}%</strong>. Это обеспечит максимальную скорость и стабильность.`;
        recommendationCard.style.display = 'flex';
        recommendationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        btnConnectBest.onclick = () => {
          connectToServer(`${bestServer.name} (${bestServer.city})`);
        };
      }

      btnPingAll.disabled = false;
      btnPingAll.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:16px; height:16px; margin-right:8px;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        Проверить все серверы
      `;
    });
  }

  // Загружаем данные
  await loadServers();
}

// Глобальная функция для имитации подключения к серверу
function connectToServer(serverName) {
  // Создаем красивую плавающую панель уведомления (Toast)
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.background = 'rgba(10, 12, 30, 0.9)';
  toast.style.backdropFilter = 'blur(12px)';
  toast.style.border = '1px solid var(--neon-blue)';
  toast.style.boxShadow = 'var(--glow-blue)';
  toast.style.padding = '16px 24px';
  toast.style.borderRadius = '8px';
  toast.style.color = '#fff';
  toast.style.zIndex = '9999';
  toast.style.fontFamily = 'var(--font-main)';
  toast.style.fontSize = '0.9rem';
  toast.style.fontWeight = '600';
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(20px)';
  toast.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span class="status-pulse" style="background-color: var(--neon-blue); box-shadow: var(--glow-blue);"></span>
      <span>Подключение к ${serverName}...</span>
    </div>
  `;

  document.body.appendChild(toast);

  // Появление
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 100);

  // Смена статуса на "Подключено"
  setTimeout(() => {
    toast.style.border = '1px solid var(--neon-green)';
    toast.style.boxShadow = '0 0 15px rgba(0, 255, 135, 0.4)';
    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="status-pulse" style="background-color: var(--neon-green); box-shadow: 0 0 10px var(--neon-green);"></span>
        <span>Успешно подключено к ${serverName}!</span>
      </div>
    `;
  }, 2000);

  // Исчезновение
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}
