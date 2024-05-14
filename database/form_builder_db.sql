-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2024 at 12:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `form_builder_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `form_list`
--

CREATE TABLE `form_list` (
  `id` int(30) NOT NULL,
  `form_code` varchar(100) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `fname` text NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_list`
--

INSERT INTO `form_list` (`id`, `form_code`, `title`, `description`, `fname`, `date_created`, `date_updated`) VALUES
(9, '8269410214', 'Enter Title Here', 'Enter Description Here', '8269410214.html', '2024-05-13 15:13:23', NULL),
(10, '3922628119', 'Enter Form Name Here', '', '3922628119.html', '2024-05-14 09:11:31', NULL),
(11, '631976650', 'Form1', 'Description 1', '631976650.html', '2024-05-14 11:25:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `responses`
--

CREATE TABLE `responses` (
  `id` int(30) NOT NULL,
  `rl_id` int(30) NOT NULL,
  `meta_field` text NOT NULL,
  `meta_value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `responses`
--

INSERT INTO `responses` (`id`, `rl_id`, `meta_field`, `meta_value`) VALUES
(1, 16, '0', 'hggggg'),
(2, 16, '1', 'hghhg'),
(3, 17, '0', 'xzdsdsds'),
(4, 17, '1', 'sdsdsdsdsdsds'),
(5, 17, '2', '1'),
(6, 17, '3', 'Enter Option'),
(7, 18, '0', 'grrer'),
(8, 18, '1', 'rtrtr'),
(9, 18, '2', '1'),
(10, 18, '3', 'Enter Option'),
(11, 19, '0', 'kjljlkllk'),
(12, 19, '1', '.,lk.l'),
(13, 19, '2', 'Enter Option, Enter Option, Enter Option'),
(14, 19, '3', 'Enter Option'),
(15, 19, '5', 'option2'),
(16, 19, '6', '2024-05-14'),
(17, 19, '7', '09:12'),
(18, 19, '4', '1715667176_Screenshot (3).png');

-- --------------------------------------------------------

--
-- Table structure for table `response_list`
--

CREATE TABLE `response_list` (
  `id` int(30) NOT NULL,
  `form_code` varchar(100) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `response_list`
--

INSERT INTO `response_list` (`id`, `form_code`, `date_created`) VALUES
(16, '8269410214', '2024-05-13 15:13:33'),
(17, '8269410214', '2024-05-13 15:15:23'),
(18, '8269410214', '2024-05-13 15:27:19'),
(19, '3922628119', '2024-05-14 09:12:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `form_list`
--
ALTER TABLE `form_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `responses`
--
ALTER TABLE `responses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `response_list`
--
ALTER TABLE `response_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `form_list`
--
ALTER TABLE `form_list`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `responses`
--
ALTER TABLE `responses`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `response_list`
--
ALTER TABLE `response_list`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
