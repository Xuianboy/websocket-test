<?php
use Workerman\Worker;

require_once __DIR__ . '/../vendor/autoload.php';

// Инцилизация Worker для подключения по данному адресу.
$wsWorker = new Worker('websocket://0.0.0.0:2346');

// Количество процессов , которые будут обрабатывать подключение клиентов
$wsWorker->count = 1;

// callback для подключения клиента.
$wsWorker->onConnect = function ($connection){
    echo "New connection \n";
};


// Функция , которая принимает подключение клиента и переданные данные.
$wsWorker->onMessage = function ($connection, $data) use($wsWorker){
    // Цикл, который отправляет данные подключенным клиентам.
    foreach ($wsWorker->connections as $clientConnection){
        $clientConnection->send($data);
    }
};

// callback для отключения клиента.
$wsWorker->onClose = function ($connection){
    echo "Connection closed\n";
};

// Запуск сервера Worker
Worker::runAll();