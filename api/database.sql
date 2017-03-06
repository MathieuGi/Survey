SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00/00";

CREATE DATABASE `survey` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE `surveyDB`;


CREATE TABLE IF NOT EXISTS `TOKENS` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(60) COLLATE utf8_unicode_ci NOT NULL,
    `isUsed` BOOLEAN DEFAULT false,
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
    PRIMARY KEY (`id`),
    KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `ANSWERS` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `answer` TEXT NOT NULL,
    `question_id` int(10) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

insert into tokens value(1, "azerty1", false, 1);
insert into tokens value(2, "azerty2", false, 1);
insert into tokens value(3, "azerty3", false, 2);
insert into tokens value(4, "azerty4", false, 1);
insert into surveys value(1, null, null, "First survey");
insert into surveys value(2, null, null, "Second survey");
insert into questions value(1, "Qui es-tu ?");
insert into questions value(2, "Comment t'appelles tu ?");
insert into questions value(3, "Es-tu un homme ou une femme ?");
insert into questions value(4, "Aimes-tu lire ?");
insert into questions value(5, "Qui est Morgan Freeman ?");
insert into answers value(1, "Un être humain", 1);
insert into answers value(2, "Femme", 3);
insert into answers value(3, "Oui", 4);
insert into answers value(4, "Mathieu", 2);
insert into answers value(5, "Homme", 3);
insert into answers value(6, "Non", 4);
insert into answers value(7, "Un acteur", 5);
insert into answers value(8, "Un animal", 1);
insert into answers value(9, "Hassen", 2);
insert into answers value(10, "Un écrivain", 5);
insert into answers value(11, "Un chanteur", 5);
