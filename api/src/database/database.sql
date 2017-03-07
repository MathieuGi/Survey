SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00/00";

CREATE DATABASE `surveyDB` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE `surveyDB`;


CREATE TABLE IF NOT EXISTS `USERS` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(60) COLLATE utf8_unicode_ci NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `status` int DEFAULT 0,
    `survey_id` int(10) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `SURVEYS` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `start` TIMESTAMP,
    `end` TIMESTAMP,
    `name` VARCHAR(60),
    PRIMARY KEY (`id`),
    KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;
    

CREATE TABLE IF NOT EXISTS `QUESTIONS` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `question` TEXT NOT NULL,
    `survey_id` int(10) NOT NULL,
    `yes` int NOT NULL DEFAULT 0,
    `no` int NOT NULL DEFAULT 0,
    `abstain` int NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;



insert into users value(1, "azerty1", "email1", 0, 1);
insert into users value(2, "azerty2", "email2", 0, 1);
insert into users value(3, "azerty3", "email3", 0, 2);
insert into users value(4, "azerty4", "email4", 0, 1);
insert into surveys value(1, null, null, "First survey");
insert into surveys value(2, null, null, "Second survey");
insert into questions value(1, "Qui es-tu ?", 0, 0, 0, 1);
insert into questions value(2, "Comment t'appelles tu ?", 0, 0, 0, 1);
insert into questions value(3, "Es-tu un homme ou une femme ?", 0, 0, 0, 1);
insert into questions value(4, "Aimes-tu lire ?", 0, 0, 0, 1);
insert into questions value(5, "Qui est Morgan Freeman ?", 0, 0, 0, 2);
