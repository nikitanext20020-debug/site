function renderTariffsPage(query) {
  const container = document.getElementById('app-root');
  
  container.innerHTML = `
    <section class="page-section">
      <div class="container">
        
        <div class="page-header-center">
          <h1>Тарифные планы</h1>
          <p>Выберите подходящий тариф и настройте его под себя. Никаких скрытых платежей.</p>
        </div>

        <div class="detailed-tariffs-container">
          
          <!-- Левая сторона: Карточка Trial -->
          <div class="glass-card tariff-card" style="height: auto;">
            <div class="tariff-card-header">
              <h4>Trial</h4>
              <p class="tariff-subtitle">Попробуйте качество нашего VPN бесплатно</p>
              <div class="tariff-price">0₽ <span style="font-size: 0.9rem;">/ 1 день</span></div>
            </div>
            
            <ul class="tariff-features-list" style="grid-template-columns: 1fr; margin-bottom: 30px;">
              <li class="tariff-feature-item">
                <span class="checkbox-circle-icon"></span>
                1 день бесплатного доступа
              </li>
              <li class="tariff-feature-item">
                <span class="checkbox-circle-icon"></span>
                Лимит трафика: 10 ГБ
              </li>
              <li class="tariff-feature-item">
                <span class="checkbox-circle-icon"></span>
                Доступно на 2 устройствах
              </li>
              <li class="tariff-feature-item">
                <span class="checkbox-circle-icon"></span>
                Базовая скорость соединения
              </li>
              <li class="tariff-feature-item">
                <span class="checkbox-circle-icon"></span>
                Более 5 локаций для подключения
              </li>
            </ul>
            
            <button class="btn btn-primary btn-full" id="btn-order-trial">
              Попробовать бесплатно
            </button>
          </div>

          <!-- Правая сторона: Конструктор Premium тарифа -->
          <div class="glass-card calculator-card">
            <h3 class="calc-section-title">
              <span>Конструктор Premium тарифа</span>
              <span class="server-status-badge status-online">Выгодный выбор</span>
            </h3>

            <!-- Слайдер Периода подписки -->
            <div class="calc-group">
              <div class="calc-label-val">
                <span>Период подписки:</span>
                <span class="calc-val-highlight" id="calc-period-txt">1 месяц</span>
              </div>
              <div class="period-tabs">
                <div class="period-tab-btn active" data-months="1">
                  1 мес.
                  <span class="discount-badge">0%</span>
                </div>
                <div class="period-tab-btn" data-months="3">
                  3 мес.
                  <span class="discount-badge">-10%</span>
                </div>
                <div class="period-tab-btn" data-months="6">
                  6 мес.
                  <span class="discount-badge">-20%</span>
                </div>
                <div class="period-tab-btn" data-months="12">
                  12 мес.
                  <span class="discount-badge">-30%</span>
                </div>
              </div>
            </div>

            <!-- Слайдер количества устройств -->
            <div class="calc-group">
              <div class="calc-label-val">
                <span>Количество устройств:</span>
                <span class="calc-val-highlight" id="calc-devices-txt">2 устройства</span>
              </div>
              <input type="range" class="slider-input" id="calc-devices-slider" min="2" max="10" value="2">
            </div>

            <!-- Дополнительные опции -->
            <div class="calc-group">
              <div class="calc-label-val" style="margin-bottom: 16px;">
                <span>Дополнительные возможности:</span>
              </div>
              <div class="options-grid">
                
                <label class="checkbox-label">
                  <input type="checkbox" class="checkbox-input" id="opt-ip">
                  <div class="checkbox-info">
                    <span class="custom-checkbox">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <div>
                      <span class="option-name">Выделенный IP-адрес</span>
                      <span class="option-desc">Индивидуальный IP для вашей безопасности</span>
                    </div>
                  </div>
                  <span class="option-price">+100₽ / мес</span>
                </label>

                <label class="checkbox-label">
                  <input type="checkbox" class="checkbox-input" id="opt-double">
                  <div class="checkbox-info">
                    <span class="custom-checkbox">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <div>
                      <span class="option-name">Double VPN (Двойное шифрование)</span>
                      <span class="option-desc">Маршрутизация трафика через два сервера</span>
                    </div>
                  </div>
                  <span class="option-price">+70₽ / мес</span>
                </label>

                <label class="checkbox-label">
                  <input type="checkbox" class="checkbox-input" id="opt-gaming">
                  <div class="checkbox-info">
                    <span class="custom-checkbox">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <div>
                      <span class="option-name">Ultra Gaming Mode</span>
                      <span class="option-desc">Приоритетный трафик с минимальным пингом</span>
                    </div>
                  </div>
                  <span class="option-price">+50₽ / мес</span>
                </label>

              </div>
            </div>

            <!-- Блок подсчета цены -->
            <div class="price-summary-box">
              <div class="summary-details">
                <span>Итоговая стоимость:</span>
                <div class="summary-total"><span id="calc-total-val">350</span>₽ <span style="font-size: 0.9rem;" id="calc-per-month-text">/ мес</span></div>
              </div>
              <button class="btn btn-primary" id="btn-buy-premium">Настроить и купить</button>
            </div>

          </div>

        </div>

      </div>
    </section>

    <!-- Модальное окно оформления заказа -->
    <div class="modal-overlay" id="order-modal">
      <div class="glass-card modal-content">
        <span class="modal-close" id="modal-close-btn">&times;</span>
        <div class="modal-header">
          <h3 id="modal-title">Оформление Premium</h3>
          <p id="modal-subtitle">Подключите защищенный доступ в один клик</p>
        </div>

        <form id="order-submit-form" class="modal-form">
          <div class="modal-order-summary">
            <div class="summary-row">
              <span class="summary-row-label">Тариф:</span>
              <span id="summary-tariff-name">Premium</span>
            </div>
            <div class="summary-row" id="summary-period-row">
              <span class="summary-row-label">Период подписки:</span>
              <span id="summary-period-val">1 месяц</span>
            </div>
            <div class="summary-row" id="summary-devices-row">
              <span class="summary-row-label">Устройств:</span>
              <span id="summary-devices-val">2</span>
            </div>
            <div class="summary-row" id="summary-options-row" style="display: none;">
              <span class="summary-row-label">Доп. опции:</span>
              <span id="summary-options-val">-</span>
            </div>
            <div class="summary-row">
              <span class="summary-row-label">К оплате:</span>
              <span id="summary-total-price">350₽</span>
            </div>
          </div>

          <div class="form-group">
            <span class="form-group-label">Ваш Email для отправки ключа:</span>
            <input type="email" id="order-email" placeholder="example@domain.com" required>
          </div>

          <div class="form-group">
            <span class="form-group-label">Способ оплаты:</span>
            <select id="order-payment-method" required>
              <option value="sbp">Система быстрых платежей (СБП)</option>
              <option value="card_ru">Банковская карта РФ</option>
              <option value="card_usd">Зарубежная карта (Visa/MC)</option>
              <option value="crypto">Криптовалюта (USDT / TON)</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary btn-full" style="margin-top: 10px;">
            <span>Оплатить подписку</span>
          </button>
          <div class="form-status" id="order-form-status" style="margin-top: 12px;"></div>
        </form>
      </div>
    </div>
  `;

  // Инициализация калькулятора и логики заказа
  initTariffsLogic(query);
}

function initTariffsLogic(query) {
  // Переменные состояния калькулятора
  let selectedMonths = 1;
  let selectedDevices = 2;
  const optionsState = {
    ip: false,
    double: false,
    gaming: false
  };

  // Базовые тарифные сетки
  const basePrices = {
    1: 350,
    3: 310,
    6: 280,
    12: 250
  };

  const optionPrices = {
    ip: 100,
    double: 70,
    gaming: 50
  };

  // Элементы калькулятора
  const periodButtons = document.querySelectorAll('.period-tab-btn');
  const devicesSlider = document.getElementById('calc-devices-slider');
  const devicesTxt = document.getElementById('calc-devices-txt');
  const periodTxt = document.getElementById('calc-period-txt');
  const totalVal = document.getElementById('calc-total-val');
  const perMonthText = document.getElementById('calc-per-month-text');
  
  const optIpCheckbox = document.getElementById('opt-ip');
  const optDoubleCheckbox = document.getElementById('opt-double');
  const optGamingCheckbox = document.getElementById('opt-gaming');

  // Элементы модального окна
  const modal = document.getElementById('order-modal');
  const btnOrderTrial = document.getElementById('btn-order-trial');
  const btnBuyPremium = document.getElementById('btn-buy-premium');
  const modalClose = document.getElementById('modal-close-btn');
  const orderForm = document.getElementById('order-submit-form');
  const orderStatus = document.getElementById('order-form-status');

  // Функция пересчета стоимости
  function updatePrice() {
    // 1. Берем базовую стоимость месяца для выбранного периода
    const pricePerMonthBase = basePrices[selectedMonths];
    
    // 2. Добавляем стоимость дополнительных устройств (свыше 2)
    // Каждое устройство свыше 2 добавляет 40 руб к цене за один месяц
    const extraDevices = Math.max(0, selectedDevices - 2);
    const devicesAddon = extraDevices * 40;

    // 3. Добавляем опции
    let optionsAddon = 0;
    if (optionsState.ip) optionsAddon += optionPrices.ip;
    if (optionsState.double) optionsAddon += optionPrices.double;
    if (optionsState.gaming) optionsAddon += optionPrices.gaming;

    // Итоговая стоимость за один месяц
    const finalPricePerMonth = pricePerMonthBase + devicesAddon + optionsAddon;
    
    // Полная стоимость за весь период подписки
    const totalPrice = finalPricePerMonth * selectedMonths;

    // Отображаем на экране
    if (selectedMonths === 1) {
      totalVal.textContent = totalPrice;
      perMonthText.textContent = '/ мес';
    } else {
      totalVal.textContent = totalPrice;
      perMonthText.textContent = `за ${selectedMonths} мес. (${finalPricePerMonth}₽/мес)`;
    }
    
    return {
      price: totalPrice,
      finalPricePerMonth
    };
  }

  // Обработка клика по кнопкам периодов
  periodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      periodButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedMonths = parseInt(btn.getAttribute('data-months'));
      
      const textMap = { 1: '1 месяц', 3: '3 месяца', 6: '6 месяцев', 12: '12 месяцев' };
      periodTxt.textContent = textMap[selectedMonths];
      updatePrice();
    });
  });

  // Обработка слайдера устройств
  if (devicesSlider) {
    devicesSlider.addEventListener('input', (e) => {
      selectedDevices = parseInt(e.target.value);
      
      let ending = 'устройств';
      if (selectedDevices === 2 || selectedDevices === 3 || selectedDevices === 4) ending = 'устройства';
      devicesTxt.textContent = `${selectedDevices} ${ending}`;
      
      updatePrice();
    });
  }

  // Обработка чекбоксов опций
  const setupCheckbox = (checkbox, key) => {
    if (checkbox) {
      checkbox.addEventListener('change', (e) => {
        optionsState[key] = e.target.checked;
        updatePrice();
      });
    }
  };

  setupCheckbox(optIpCheckbox, 'ip');
  setupCheckbox(optDoubleCheckbox, 'double');
  setupCheckbox(optGamingCheckbox, 'gaming');

  // Инициализация модального окна и автозаполнения по query параметру
  if (query && query.get('buy') === 'premium') {
    // Если пришли с главной по ссылке premium, можно автоматически переключить период или подсветить
    // В данном случае просто прокрутим до калькулятора
    setTimeout(() => {
      const calcCard = document.querySelector('.calculator-card');
      if (calcCard) calcCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
  } else if (query && query.get('buy') === 'trial') {
    // Если trial, откроем модальное окно заказа trial тарифа сразу
    setTimeout(() => {
      openOrderModal('trial');
    }, 200);
  }

  // Открытие модального окна
  function openOrderModal(type) {
    orderStatus.className = 'form-status';
    orderStatus.textContent = '';
    orderForm.reset();

    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const tariffName = document.getElementById('summary-tariff-name');
    const periodRow = document.getElementById('summary-period-row');
    const devicesRow = document.getElementById('summary-devices-row');
    const optionsRow = document.getElementById('summary-options-row');
    const optionsVal = document.getElementById('summary-options-val');
    const totalPrice = document.getElementById('summary-total-price');

    if (type === 'trial') {
      modalTitle.textContent = 'Оформление Trial';
      modalSubtitle.textContent = 'Попробуйте VPN бесплатно в течение 1 дня';
      tariffName.textContent = 'Trial (Пробный)';
      periodRow.style.display = 'none';
      devicesRow.style.display = 'none';
      optionsRow.style.display = 'none';
      totalPrice.textContent = '0₽';
      
      // Сохраняем в форме тип тарифа
      orderForm.setAttribute('data-tariff-type', 'trial');
    } else {
      const calculations = updatePrice();
      modalTitle.textContent = 'Оформление Premium';
      modalSubtitle.textContent = 'Настройте и получите качественный доступ';
      tariffName.textContent = 'Premium (Премиум)';
      periodRow.style.display = 'flex';
      
      const textMap = { 1: '1 месяц', 3: '3 месяца', 6: '6 месяцев', 12: '12 месяцев' };
      document.getElementById('summary-period-val').textContent = textMap[selectedMonths];
      
      devicesRow.style.display = 'flex';
      document.getElementById('summary-devices-val').textContent = selectedDevices;
      
      // Сбор выбранных опций для вывода в чек-лист
      const activeOptions = [];
      if (optionsState.ip) activeOptions.push('Выделенный IP');
      if (optionsState.double) activeOptions.push('Double VPN');
      if (optionsState.gaming) activeOptions.push('Gaming Mode');

      if (activeOptions.length > 0) {
        optionsRow.style.display = 'flex';
        optionsVal.textContent = activeOptions.join(', ');
      } else {
        optionsRow.style.display = 'none';
      }

      totalPrice.textContent = `${calculations.price}₽`;
      
      orderForm.setAttribute('data-tariff-type', 'premium');
    }

    modal.classList.add('active');
  }

  // Вешаем слушатели на кнопки покупки
  if (btnOrderTrial) {
    btnOrderTrial.addEventListener('click', () => openOrderModal('trial'));
  }

  if (btnBuyPremium) {
    btnBuyPremium.addEventListener('click', () => openOrderModal('premium'));
  }

  // Закрытие модального окна
  const closeModal = () => modal.classList.remove('active');
  if (modalClose) modalClose.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Отправка формы заказа на бэкенд
  if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('order-email').value;
      const payment = document.getElementById('order-payment-method').value;
      const type = orderForm.getAttribute('data-tariff-type');
      
      const btn = orderForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Обработка...';

      let requestBody = {
        email,
        tariffId: type,
        paymentMethod: payment
      };

      if (type === 'premium') {
        const calculations = updatePrice();
        requestBody = {
          ...requestBody,
          period: selectedMonths,
          devices: selectedDevices,
          price: calculations.price,
          options: { ...optionsState }
        };
      } else {
        requestBody = {
          ...requestBody,
          period: 1,
          devices: 2,
          price: 0,
          options: {}
        };
      }

      try {
        const response = await fetch('/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          throw new Error('Код ответа сервера: ' + response.status);
        }
        const data = await response.json();

        orderStatus.className = 'form-status';
        if (data.success) {
          orderStatus.classList.add('success');
          orderStatus.innerHTML = `<strong>${data.message}</strong>`;
          
          // Закрываем модальное окно через 3 секунды
          setTimeout(() => {
            closeModal();
          }, 3000);
        } else {
          orderStatus.classList.add('error');
          orderStatus.textContent = data.error || 'Ошибка оформления.';
        }
      } catch (err) {
        console.warn('Используем автономный демо-режим для оформления заказа:', err);
        orderStatus.className = 'form-status success';
        orderStatus.innerHTML = `<strong>Заказ успешно оформлен (Демо-режим)!</strong><br><span style="font-size:0.8rem;opacity:0.8;">Ключ доступа отправлен на указанный Email (симуляция).</span>`;
        
        setTimeout(() => {
          closeModal();
        }, 4000);
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    });
  }

  // Первичный просчет при инициализации страницы
  updatePrice();
}
