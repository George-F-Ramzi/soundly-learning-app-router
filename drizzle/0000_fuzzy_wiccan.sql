CREATE TABLE `Artists` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`email` varchar(256),
	`followers` int DEFAULT 0,
	`follwoing` int DEFAULT 0,
	`songs` int DEFAULT 0,
	`cover` varchar(256) DEFAULT 'https://res.cloudinary.com/dwnvkwrox/image/upload/v1671018225/123456789.png');

CREATE TABLE `Comments` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`details` varchar(999) NOT NULL,
	`artist` int,
	`song` int);

CREATE TABLE `Follower` (
	`artist` int NOT NULL,
	`fan` int NOT NULL,
	PRIMARY KEY(`artist`,`fan`)
);

CREATE TABLE `Like` (
	`artist` int NOT NULL,
	`song` int NOT NULL,
	PRIMARY KEY(`artist`,`song`)
);

CREATE TABLE `Notification` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`trigger` int,
	`nottifier` int,
	`song` int,
	`cover` varchar(256) NOT NULL);

CREATE TABLE `Songs` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`likes` int DEFAULT 0,
	`song` varchar(256) NOT NULL,
	`cover` varchar(256) NOT NULL,
	`artist` int);
