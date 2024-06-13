document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Ваше сообщение отправлено!');
    this.reset();
});

document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Ваше бронирование подтверждено!');
    this.reset();
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    // Пример проверки данных, в реальности нужно проверять на сервере
    if(email === "test@test.com" && password === "password") {
        localStorage.setItem('user', JSON.stringify({ name: 'Test User', email: 'test@test.com' }));
        showProfile();
        window.location.hash = 'profile';
    } else {
        alert('Неверные данные для входа');
    }
    this.reset();
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    // В реальности, необходимо отправить данные на сервер для регистрации
    localStorage.setItem('user', JSON.stringify({ name, email }));
    showProfile();
    window.location.hash = 'profile';
    this.reset();
});

document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.removeItem('user');
    document.getElementById('profile-info').style.display = 'none';
    alert('Вы вышли из аккаунта');
});

function showProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('profile-name').innerText = user.name;
        document.getElementById('profile-email').innerText = user.email;
        document.getElementById('profile-info').style.display = 'block';
    }
}

window.onload = function() {
    showProfile();

    // Загрузка Яндекс карты
    var script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
    script.onload = function() {
        ymaps.ready(init);
    };
    document.head.appendChild(script);
};

function init() {
    var myMap = new ymaps.Map('yandex-map', {
        center: [55.76, 37.64], // Москва
        zoom: 10
    });

    var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        balloonContent: 'Мы находимся здесь!'
    });

    myMap.geoObjects.add(myPlacemark);
}