-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 01 mai 2021 à 22:01
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
`commentId` int(11) NOT NULL AUTO_INCREMENT,
`postId` int(11) NOT NULL,
`userId` int(11) NOT NULL,
`comment` varchar(255) NOT NULL,
`date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`commentId`),
KEY `userId` (`userId`),
KEY `postId` (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
`post_id` int(11) NOT NULL AUTO_INCREMENT,
`user_id` int(11) NOT NULL,
`comment` varchar(255) NOT NULL,
`imageurl` varchar(255) DEFAULT NULL,
`post_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`post_id`),
KEY `lien_post_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`post_id`, `user_id`, `comment`, `imageurl`, `post_date`) VALUES
(93, 40, 'salut', NULL, '2021-04-30 15:18:47'),
(94, 42, 'salut', NULL, '2021-04-30 19:24:42'),
(95, 41, 'post avec image groupomania', 'http://localhost:3000/images/icon.png1619875520704.png', '2021-05-01 13:25:20');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`lastName` varchar(255) NOT NULL,
`firstName` varchar(255) NOT NULL,
`email` varchar(255) NOT NULL,
`password` varchar(255) NOT NULL,
`isadmin` int(11) NOT NULL DEFAULT '0',
PRIMARY KEY (`id`),
UNIQUE KEY `id` (`id`),
UNIQUE KEY `email` (`email`),
UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `lastName`, `firstName`, `email`, `password`, `isadmin`) VALUES
(40, 'admin', 'admin', 'admin@mail.com', '$2b$10$5TeXAoC/c3QFUHY9Q8qd...FPwGAPzSOaJd.cP5sgPv1zCWt3lg72', 1),
(41, 'doe', 'john', 'johndoe@mail.com', '$2b$10$ufLD.wDG0T.t/PHIuTdr2ONWI4OvgnJv0DbOpgwWe2v1Su3182ND6', 0),
(42, 'doe', 'jane ', 'jane@mail.com', '$2b$10$PNPgniyysiJyS7yLvop3yu/jxzc.MesDxDsnmw90xnA1yAKN6qM6C', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
ADD CONSTRAINT `lien comment_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `lien_comment` FOREIGN KEY (`postId`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
ADD CONSTRAINT `lien_post_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
