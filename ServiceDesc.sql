-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 16 2023 г., 09:17
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `ServiceDesc`
--

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` tinyint NOT NULL,
  `task_id` tinyint(1) NOT NULL,
  `customer_id` tinyint NOT NULL,
  `theme` varchar(111) DEFAULT NULL,
  `message_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `session`
--

CREATE TABLE `session` (
  `id` tinyint NOT NULL,
  `user_id` tinyint NOT NULL,
  `full_name` varchar(111) NOT NULL,
  `email` varchar(111) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `position` tinyint(1) NOT NULL,
  `role` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE `tasks` (
  `id` tinyint NOT NULL,
  `name` varchar(111) DEFAULT NULL,
  `priority` int NOT NULL DEFAULT '1',
  `description` text,
  `status` int NOT NULL DEFAULT '0',
  `executor_user_id` tinyint NOT NULL DEFAULT '14',
  `customer_user_id` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `priority`, `description`, `status`, `executor_user_id`, `customer_user_id`) VALUES
(38, 'Поменять чернила', 1, 'Поменять чернила в принтере', 0, 14, 19),
(39, 'Переустановить Windows', 1, 'Переустановить Windows', 0, 14, 19),
(40, 'Подключить интернет', 1, 'Подключить интернет', 0, 14, 19),
(41, 'Поменять сетевой фильтр', 1, 'Поменять сетевой фильтр', 0, 14, 19);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` tinyint NOT NULL,
  `login` varchar(111) NOT NULL,
  `pass` varchar(111) NOT NULL,
  `role` int NOT NULL,
  `full_name` varchar(111) DEFAULT NULL,
  `email` varchar(111) DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `position` varchar(111) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `pass`, `role`, `full_name`, `email`, `phone`, `gender`, `position`) VALUES
(1, 'deletedCustomer', '123', 4, 'deleted', 'deleted', 0, 0, '0'),
(14, 'loginAdmin', '123', 1, 'Крюков Ефим Антонович', 'email1@email.ru', 89196426203, 1, '1'),
(19, 'loginCustomer2', '123', 3, 'Никонов Ермолай Ярославович', 'email6@email.ru', 89196423923, 1, '3'),
(27, 'loginExecutor2', '123', 2, 'Фомичев Артём', 'fomichev@mail.ru', 89197689874, 1, '2');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_ibfk_1` (`customer_id`),
  ADD KEY `messages_ibfk_2` (`task_id`);

--
-- Индексы таблицы `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `executor_user_id` (`executor_user_id`),
  ADD KEY `customer_user_id` (`customer_user_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT для таблицы `session`
--
ALTER TABLE `session`
  MODIFY `id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`executor_user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`customer_user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
