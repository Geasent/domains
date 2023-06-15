-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 15 2023 г., 11:10
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
  `executor_user_id` tinyint NOT NULL,
  `customer_user_id` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(14, 'loginAdmin', '123', 1, 'Крюков Ефим Антонович', 'email1@email.ru', 89196426203, 1, '1'),
(15, 'loginExecutor', '123', 2, 'Орехов Даниил Серапионович', 'email2@email.ru', 89196578394, 1, '2'),
(16, 'loginCustomer1', '123', 3, 'Горшков Адольф Игоревич', 'email3@email.ru', 89196472983, 1, '3'),
(17, 'loginCustomer2', '123', 3, 'Полякова Индира Ростиславовна\r\n', 'email4@email.ru', 89196472942, 2, '3'),
(18, 'loginCustomer3', '123', 3, 'Гордеева Властилина Натановна\r\n', 'email5@email.ru', 89196472923, 2, '3'),
(19, 'loginCustomer4', '123', 3, 'Никонов Ермолай Ярославович', 'email6@email.ru', 89196423923, 1, '3'),
(20, 'loginExecutor2', '123', 2, 'Шишкие Даниил Серапионович', 'email7@email.ru', 89196578394, 1, '2');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`customer_id`),
  ADD KEY `task_id` (`task_id`);

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
  ADD KEY `user_id` (`executor_user_id`),
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
  MODIFY `id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `session`
--
ALTER TABLE `session`
  MODIFY `id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`executor_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`customer_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
