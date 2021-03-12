-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 12, 2021 at 07:07 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `softgrid`
--

-- --------------------------------------------------------

--
-- Table structure for table `patnar`
--

CREATE TABLE `patnar` (
  `patnarId` int(11) NOT NULL,
  `my_id` int(11) NOT NULL,
  `patner_id` int(11) NOT NULL,
  `status` tinyint(2) NOT NULL DEFAULT '1',
  `crd` datetime NOT NULL,
  `upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patnar`
--

INSERT INTO `patnar` (`patnarId`, `my_id`, `patner_id`, `status`, `crd`, `upd`) VALUES
(1, 4, 1, 1, '2021-03-11 17:33:28', '2021-03-11 17:33:28'),
(2, 2, 1, 1, '2021-03-11 17:52:44', '2021-03-11 17:52:44'),
(3, 2, 4, 1, '2021-03-11 17:53:49', '2021-03-11 17:53:49'),
(4, 2, 3, 1, '2021-03-11 17:53:55', '2021-03-11 17:53:55');

-- --------------------------------------------------------

--
-- Table structure for table `request_user`
--

CREATE TABLE `request_user` (
  `id` int(11) NOT NULL,
  `request_by` int(11) NOT NULL DEFAULT '0',
  `request_for` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(2) NOT NULL,
  `crd` datetime NOT NULL,
  `upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request_user`
--

INSERT INTO `request_user` (`id`, `request_by`, `request_for`, `status`, `crd`, `upd`) VALUES
(1, 1, 2, 0, '2021-03-11 17:10:48', '2021-03-11 17:10:48'),
(2, 1, 3, 0, '2021-03-11 17:10:55', '2021-03-11 17:10:55'),
(3, 1, 4, 0, '2021-03-11 17:11:01', '2021-03-11 17:11:01'),
(4, 2, 1, 0, '2021-03-11 17:11:43', '2021-03-11 17:11:43'),
(5, 2, 3, 0, '2021-03-11 17:11:48', '2021-03-11 17:11:48'),
(6, 2, 4, 0, '2021-03-11 17:11:52', '2021-03-11 17:11:52'),
(7, 3, 1, 0, '2021-03-11 17:12:42', '2021-03-11 17:12:42'),
(8, 3, 2, 0, '2021-03-11 17:12:46', '2021-03-11 17:12:46'),
(9, 3, 4, 0, '2021-03-11 17:12:50', '2021-03-11 17:12:50'),
(10, 4, 3, 0, '2021-03-11 17:15:42', '2021-03-11 17:15:42'),
(11, 4, 1, 0, '2021-03-11 17:15:48', '2021-03-11 17:15:48'),
(12, 4, 2, 0, '2021-03-11 17:15:52', '2021-03-11 17:15:52');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` bigint(20) NOT NULL,
  `full_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `social_id` varchar(255) NOT NULL,
  `social_type` varchar(20) CHARACTER SET utf16 NOT NULL COMMENT 'facebook, google',
  `user_type` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT 'hirer, worker, both',
  `profile_photo` text CHARACTER SET utf8 NOT NULL,
  `is_profile_url` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1: url, 0: name',
  `about_me` varchar(300) CHARACTER SET utf8 NOT NULL,
  `auth_token` varchar(64) CHARACTER SET utf8 NOT NULL,
  `device_type` tinyint(4) NOT NULL COMMENT '1:IOS, 2:Android',
  `device_token` varchar(255) CHARACTER SET utf8 NOT NULL,
  `profile_location` text CHARACTER SET utf8 NOT NULL,
  `profile_city` varchar(200) CHARACTER SET utf8 NOT NULL,
  `profile_state` varchar(200) CHARACTER SET utf8 NOT NULL,
  `profile_country` varchar(200) CHARACTER SET utf8 NOT NULL,
  `profile_latitude` float NOT NULL,
  `profile_longitude` float NOT NULL,
  `current_location` text CHARACTER SET utf8 NOT NULL,
  `current_city` varchar(200) CHARACTER SET utf8 NOT NULL,
  `current_state` varchar(200) CHARACTER SET utf8 NOT NULL,
  `current_country` varchar(200) CHARACTER SET utf8 NOT NULL,
  `current_latitude` float NOT NULL,
  `current_longitude` float NOT NULL,
  `availability` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1: available, 0: not available',
  `signup_from` tinyint(4) NOT NULL COMMENT '1:IOS, 2:android, 3:website',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '1:Active,0:Inactive ',
  `date` date NOT NULL,
  `crd` datetime NOT NULL,
  `upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `full_name`, `email`, `password`, `social_id`, `social_type`, `user_type`, `profile_photo`, `is_profile_url`, `about_me`, `auth_token`, `device_type`, `device_token`, `profile_location`, `profile_city`, `profile_state`, `profile_country`, `profile_latitude`, `profile_longitude`, `current_location`, `current_city`, `current_state`, `current_country`, `current_latitude`, `current_longitude`, `availability`, `signup_from`, `status`, `date`, `crd`, `upd`) VALUES
(1, 'tushar', 'tushar.mindiii@gmail.com', '$2y$10$7U0.U2Dcz1g8cZUThSS8d.ESETFjanRJ62Rh.IqzYehKBPt7H.Mo2', '', '', '', '', 0, '', '2561b020becba909f0285a9ed17d1aec8feb5dba', 1, '', '', '', '', '', 0, 0, '', '', '', '', 0, 0, 1, 1, 1, '2021-03-12', '2021-03-11 18:56:49', '2021-03-11 18:56:49'),
(2, 'shekhar', 'mca.tushar@yahoo.in', '$2y$10$1mY93SJFXk35faq2f5RSguu82RM7VQQX0/a.VupXq7INoZQr/j.ky', '', '', '', '', 0, '', 'd9fbf760ababf770bb67c3801544b1f9c6309789', 0, '', '', '', '', '', 0, 0, '', '', '', '', 0, 0, 1, 1, 1, '2021-03-11', '2021-03-13 19:00:18', '2021-03-11 18:56:49'),
(3, 'test', 'test@gmail.com', '$2y$10$xHXYNX2zeQqCLT0gLIIcdeRNZFluaoevsarDddp6LRrSXLZRN0Pdm', '', '', '', '', 0, '', 'c0965e0d34fcd0100a6248cf90d2d0c2a714dc2a', 1, '', '', '', '', '', 0, 0, '', '', '', '', 0, 0, 1, 1, 1, '2021-03-11', '2021-03-11 19:02:40', '2021-03-11 18:56:49'),
(4, 'demo', 'test@test.com', '$2y$10$GSXuGvUc3XsgotHS9pClp.MT8o8EpPll6cmdTPu.FUC7ewjxrVSCu', '', '', '', 'R1k3AcLKEfsNFOnM.jpg', 0, '', '051c0b3658714314f1f91e648fcc7614e2e372ac', 0, '', '', '', '', '', 0, 0, '', '', '', '', 0, 0, 1, 0, 1, '2021-03-12', '2021-03-11 17:30:25', '2021-03-11 18:56:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patnar`
--
ALTER TABLE `patnar`
  ADD PRIMARY KEY (`patnarId`);

--
-- Indexes for table `request_user`
--
ALTER TABLE `request_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patnar`
--
ALTER TABLE `patnar`
  MODIFY `patnarId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `request_user`
--
ALTER TABLE `request_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
