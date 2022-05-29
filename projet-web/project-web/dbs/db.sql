CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `relationship` varchar(500) NOT NULL,
  `Idarticle` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created` date NOT NULL,
  `updated` date NOT NULL,
  `published` tinyint(1) NOT NULL,
  `IdUser` int(11) NOT NULL,
  `IdCategory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IdUser` (`IdUser`),
  ADD KEY `IdCatrgory` (`IdCatrgory`);

ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Idarticle` (`IdArticle`);
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
AUTO_INCREMENT for table `comment`
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
ALTER TABLE `article`
  ADD CONSTRAINT `article__1` FOREIGN KEY (`IdUser`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `article_2` FOREIGN KEY (`IdCatrgory`) REFERENCES `category` (`id`);
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_1` FOREIGN KEY (`IdArticle`) REFERENCES `article` (`id`);
COMMIT;