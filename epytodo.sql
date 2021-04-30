CREATE DATABASE `epytodo` CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE `epytodo`;

CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(6),
    PRIMARY KEY (`id`)
);

CREATE TABLE 'todo' (
    'id' INT NOT NULL AUTO_INCREMENT,
    'title' VARCHAR(255),
    'description' VARCHAR(255),
    'created_at' DATETIME(6) NOT NULL,
    'due_time' DATETIME(6),
    'status' ENUM('not started', 'to do', 'in progress', 'done')DEFAULT 'not started',
    'user_id' INT NOT NULL,
    PRIMARY KEY (id)
);
