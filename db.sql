-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2017 at 05:06 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vue-mini-social-network`
--

-- --------------------------------------------------------

--
-- Table structure for table `follow_system`
--

CREATE TABLE `follow_system` (
  `follow_id` int(11) NOT NULL,
  `follow_by` int(11) NOT NULL,
  `follow_by_username` varchar(32) NOT NULL,
  `follow_to` int(11) NOT NULL,
  `follow_to_username` varchar(32) NOT NULL,
  `follow_time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `follow_system`
--

INSERT INTO `follow_system` (`follow_id`, `follow_by`, `follow_by_username`, `follow_to`, `follow_to_username`, `follow_time`) VALUES
(45, 7, 'ghalib', 5, 'takkar', '1507144380078'),
(55, 5, 'takkar', 7, 'ghalib', '1507198493487'),
(56, 8, 'vuejs', 5, 'takkar', '1507214467175'),
(57, 9, 'golang', 8, 'vuejs', '1507214663786'),
(58, 9, 'golang', 5, 'takkar', '1507214664940'),
(59, 8, 'vuejs', 9, 'golang', '1507214723180'),
(60, 5, 'takkar', 8, 'vuejs', '1507214749203'),
(61, 5, 'takkar', 9, 'golang', '1507214750758');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `like_by` int(11) NOT NULL,
  `like_by_username` varchar(32) NOT NULL,
  `post_id` int(11) NOT NULL,
  `like_time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`like_id`, `like_by`, `like_by_username`, `post_id`, `like_time`) VALUES
(15, 5, 'takkar', 6, '1507214835378');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `post_created` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `user`, `username`, `title`, `content`, `post_created`) VALUES
(2, 7, 'ghalib', 'By ghalib..', 'content of it..', '1507144326258'),
(3, 7, 'ghalib', 'jk', 'kkkkk', '1507144370200'),
(4, 8, 'vuejs', 'About me..', 'A progressive, incrementally-adoptable JavaScript framework for building UI on the web.', '1507214449179'),
(5, 9, 'golang', 'Golang''s First Title..', 'I am a very awesome programming language. One of takkar''s favourite programming languages!!', '1507214633931'),
(6, 5, 'takkar', 'Lorem Ipsum By Takkar..', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '1507214793412');

-- --------------------------------------------------------

--
-- Table structure for table `profile_views`
--

CREATE TABLE `profile_views` (
  `view_id` int(11) NOT NULL,
  `view_by` int(11) NOT NULL,
  `view_by_username` varchar(32) NOT NULL,
  `view_to` int(11) NOT NULL,
  `view_time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile_views`
--

INSERT INTO `profile_views` (`view_id`, `view_by`, `view_by_username`, `view_to`, `view_time`) VALUES
(1, 5, 'ghalib', 7, '1507151740091'),
(2, 5, 'ghalib', 7, '1507151970551'),
(3, 5, 'ghalib', 7, '1507152121911'),
(4, 5, 'ghalib', 7, '1507152431775'),
(5, 7, 'takkar', 5, '1507213667717'),
(6, 7, 'faiyaz', 6, '1507213682761'),
(7, 7, 'takkar', 5, '1507214222942'),
(8, 8, 'vuejs', 5, '1507214480230'),
(9, 5, 'golang', 9, '1507214900717');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` text NOT NULL,
  `joined` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `bio`, `joined`) VALUES
(5, 'takkar', 'takkar@gmail.com', '$2a$10$TRZ/St8DVhTnp4mGNYccfe4rKFCwK2pjj6X6G6f7IhtOtHI.lC.OK', '', '1506764663581'),
(6, 'faiyaz', 'faiyaz@gmail.com', '$2a$10$7.q8iKn6y8NaWos0oIRcKe6A0Nt2Honp3P5XOJyOtQFFosIgtZTQm', '', '1506764868201'),
(7, 'ghalib', 'ghalib@gmail.com', '$2a$10$M2058sEKOB.32e0AvnnucuGrHMkDAxm9mYxE93NWZe9/Tw4uht2NO', '', '1506887311755'),
(8, 'vuejs', 'vue@gmail.com', '$2a$10$Z4LG9e.g6pVH8rEIyauXaOWwJ0Ca2D19Qr9QsXKLZvC9Ck8LI7R06', 'A JS Framework!!', '1507214317140'),
(9, 'golang', 'golang@gmail.com', '$2a$10$FnQCugwFcqRhNqaSvtIiZeAinSWHincGh7jBy7XfrcGpBC5axuEN.', 'A programming language', '1507214510524');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follow_system`
--
ALTER TABLE `follow_system`
  ADD PRIMARY KEY (`follow_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `profile_views`
--
ALTER TABLE `profile_views`
  ADD PRIMARY KEY (`view_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `follow_system`
--
ALTER TABLE `follow_system`
  MODIFY `follow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `profile_views`
--
ALTER TABLE `profile_views`
  MODIFY `view_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
