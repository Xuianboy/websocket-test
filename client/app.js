const bodyElement = document.getElementById('wrapper');
const unit = document.getElementById('unit');

// Делаем рандомный цвет для разных клиентов.
unit.style.backgroundColor = Math.random() < 0.5 ? 'red' : 'green;';


// Открываем websocket connect
const ws = new WebSocket('ws://localhost:2346');

// Обработчик событий для нажатий клавиш.
bodyElement.addEventListener('keyup', event => {
    let top = unit.style.top ? unit.style.top : 0;
    let left = unit.style.left ? unit.style.left : 0;
    const step = 5;

    if (event.code == 'ArrowUp'){
        unit.style.top = parseInt(top) - step + 'px';
} else if (event.code == 'ArrowDown'){
        unit.style.top = parseInt(top) + step + 'px';
    }else if (event.code == 'ArrowLeft'){
        unit.style.left = parseInt(left) - step + 'px';
    } else if (event.code == 'ArrowRight'){
        unit.style.left = parseInt(left) + step + 'px';
    }

    // Координаты расположения шарика.
    let positionData = {
        top: unit.style.top,
        left: unit.style.left
    }

    // Отправка данных координат на сервер в JSON.
    ws.send(JSON.stringify(positionData));

});

// Обработчик для получение данных JSON между клиентами в realtime.
ws.onmessage = response => {
    let positionData = JSON.parse(response.data);
    console.log(positionData);
    unit.style.top = positionData.top;
    unit.style.left = positionData.left;
}
