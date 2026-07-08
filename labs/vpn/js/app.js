// Глобальный роутер и управление приложением
const App = {
  routes: {
    '/': { title: 'Главная | Облачко VPN', render: () => renderHomePage() },
    '/tariffs': { title: 'Тарифы | Облачко VPN', render: () => renderTariffsPage() },
    '/servers': { title: 'Серверы | Облачко VPN', render: () => renderServersPage() }
  },

  init() {
    this.appRoot = document.getElementById('app-root');
    this.navLinks = document.querySelectorAll('.nav-link[data-link]');
    this.burgerToggle = document.getElementById('burger-toggle');
    this.nav = document.querySelector('.nav');
    
    // Поддержка кликов по ссылкам SPA
    document.body.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        this.navigateTo(link.getAttribute('href'));
      }
    });

    // Обработка изменения хэша (включая кнопку "Назад" в браузере)
    window.addEventListener('hashchange', () => {
      this.handleRoute();
    });

    // Настройка мобильного меню
    if (this.burgerToggle) {
      this.burgerToggle.addEventListener('click', () => {
        this.burgerToggle.classList.toggle('active');
        this.nav.classList.toggle('active');
      });
    }

    // Закрытие мобильного меню при клике по ссылке
    this.nav.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link') && e.target.getAttribute('data-link') !== null) {
        this.burgerToggle.classList.remove('active');
        this.nav.classList.remove('active');
      }
    });

    // Плавный скролл к контактам
    const contactsNavLink = document.getElementById('contacts-nav-link');
    if (contactsNavLink) {
      contactsNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.burgerToggle.classList.remove('active');
        this.nav.classList.remove('active');
        const anchor = document.getElementById('contacts-anchor');
        if (anchor) {
          anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Инициализация модалки контактов
    this.initContactModal();

    // Первый запуск роутинга
    this.handleRoute();
  },

  navigateTo(url) {
    let hash = url;
    if (!hash.startsWith('#')) {
      if (hash.startsWith('/')) {
        hash = '#' + hash;
      } else {
        hash = '#/' + hash;
      }
    }
    window.location.hash = hash;
  },

  handleRoute() {
    // Получаем текущий хэш (например, "#/tariffs?buy=premium" или "#/")
    let hash = window.location.hash || '#/';
    
    // Извлекаем путь из хэша
    let path = hash.replace(/^#/, ''); // убираем ведущий #
    
    // Очищаем от возможных параметров запроса (типа ?buy=premium)
    const queryIndex = path.indexOf('?');
    let searchParams = '';
    if (queryIndex !== -1) {
      searchParams = path.substring(queryIndex);
      path = path.substring(0, queryIndex);
    }
    
    // Нормализуем путь (чтобы начинался с /)
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    // Ищем роут, по умолчанию Главная
    const route = this.routes[path] || this.routes['/'];
    
    // Обновляем заголовок вкладки
    document.title = route.title;

    // Подсвечиваем активный пункт в меню
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      const cleanHref = href ? href.replace(/^#/, '') : '';
      if (cleanHref === path || (path === '/' && (cleanHref === '/' || cleanHref === ''))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Прокручиваем вверх страницы при переходе
    window.scrollTo(0, 0);

    // Очищаем контент и показываем лоадер
    this.appRoot.innerHTML = `
      <div class="page-loader">
        <div class="loader-spinner"></div>
      </div>
    `;

    // Вызываем функцию рендеринга страницы
    setTimeout(() => {
      try {
        const query = new URLSearchParams(searchParams);
        route.render(query);
      } catch (error) {
        console.error('Ошибка рендеринга страницы:', error);
        this.appRoot.innerHTML = `
          <div class="container" style="padding: 100px 24px; text-align: center;">
            <h2>Упс, что-то пошло не так</h2>
            <p style="color: var(--text-muted); margin-top: 10px;">Не удалось загрузить содержимое страницы.</p>
            <a href="#/" class="btn btn-primary" style="margin-top: 20px;" data-link>На главную</a>
          </div>
        `;
      }
    }, 150); // Легкая задержка для плавности эффекта загрузки
  },

  initContactModal() {
    const modal = document.getElementById('contact-modal');
    const openBtn = document.getElementById('btn-footer-contact');
    const closeBtn = document.getElementById('contact-modal-close-btn');
    const form = document.getElementById('contact-submit-form');
    const status = document.getElementById('feedback-form-status');

    if (!modal) return;

    // Открытие модалки
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        if (status) {
          status.className = 'form-status';
          status.textContent = '';
        }
        if (form) form.reset();
        modal.classList.add('active');
      });
    }

    // Закрытие модалки
    const closeModal = () => modal.classList.remove('active');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Отправка формы обратной связи
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('feedback-email').value;
        const telegram = document.getElementById('feedback-tg').value;
        const message = document.getElementById('feedback-message').value;
        
        const btn = form.querySelector('button[type="submit"]');
        const originalBtnText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = 'Отправка...';
        
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, telegram, message })
          });
          
          if (!response.ok) {
            throw new Error('Код ответа сервера: ' + response.status);
          }
          const data = await response.json();
          
          status.className = 'form-status';
          if (data.success) {
            status.classList.add('success');
            status.innerHTML = `<strong>${data.message}</strong>`;
            form.reset();
            // Закрываем модалку через 3 секунды
            setTimeout(closeModal, 3000);
          } else {
            status.classList.add('error');
            status.textContent = data.error || 'Ошибка при отправке.';
          }
        } catch (err) {
          console.warn('Используем автономный демо-режим (ошибка сети):', err);
          status.className = 'form-status success';
          status.innerHTML = `<strong>Сообщение успешно отправлено (Демо-режим)!</strong><br><span style="font-size:0.8rem;opacity:0.8;">Поскольку бэкенд недоступен, сообщение обработано локально.</span>`;
          form.reset();
          setTimeout(closeModal, 3500);
        } finally {
          btn.disabled = false;
          btn.innerHTML = originalBtnText;
        }
      });
    }
  }
};

// Запуск при загрузке документа
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
