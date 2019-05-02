-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: May 02, 2019 at 10:00 AM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_densmora`
--

-- --------------------------------------------------------

--
-- Table structure for table `rcdb_coaster`
--

DROP TABLE IF EXISTS `rcdb_coaster`;
CREATE TABLE `rcdb_coaster` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `park` int(11) DEFAULT NULL,
  `manufacturer` int(11) NOT NULL,
  `year_opened` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `max_speed` int(11) NOT NULL,
  `in_operation` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rcdb_coaster`
--

INSERT INTO `rcdb_coaster` (`id`, `name`, `park`, `manufacturer`, `year_opened`, `height`, `max_speed`, `in_operation`) VALUES
(1, 'Maverick', 1, 1, 2007, 105, 70, 1),
(2, 'Millenium Force', 1, 1, 2000, 310, 93, 1),
(3, 'Disaster Transport', 1, 1, 1985, 63, 40, 0),
(4, 'Top Thrill Dragster', 1, 1, 2003, 420, 120, 1),
(5, 'Magnum XL-200', 1, 2, 1989, 205, 72, 1),
(6, 'Raptor', 1, 4, 1994, 137, 57, 1),
(7, 'Gemini', 1, 2, 1978, 125, 60, 1),
(8, 'Valravn', 1, 4, 2016, 223, 75, 1),
(9, 'GateKeeper', 1, 4, 2013, 170, 67, 1),
(10, 'Steel Vengeance', 1, 3, 2018, 205, 74, 1),
(11, 'Wicked Twister', 1, 1, 2002, 215, 72, 1);

-- --------------------------------------------------------

--
-- Table structure for table `rcdb_coaster_features`
--

DROP TABLE IF EXISTS `rcdb_coaster_features`;
CREATE TABLE `rcdb_coaster_features` (
  `cid` int(11) NOT NULL,
  `fid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rcdb_coaster_features`
--

INSERT INTO `rcdb_coaster_features` (`cid`, `fid`) VALUES
(1, 1),
(1, 2),
(3, 3),
(4, 1),
(6, 2),
(6, 4),
(7, 5),
(8, 2),
(8, 6),
(9, 2),
(9, 7),
(10, 2),
(11, 1),
(11, 8);

-- --------------------------------------------------------

--
-- Table structure for table `rcdb_features`
--

DROP TABLE IF EXISTS `rcdb_features`;
CREATE TABLE `rcdb_features` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rcdb_features`
--

INSERT INTO `rcdb_features` (`id`, `name`) VALUES
(1, 'Launching'),
(2, 'Looping'),
(3, 'Indoor'),
(4, 'Inverted'),
(5, 'Racing'),
(6, 'Dive'),
(7, 'Wing Rider'),
(8, 'Backwards'),
(9, 'Wooden');

-- --------------------------------------------------------

--
-- Table structure for table `rcdb_manufacturer`
--

DROP TABLE IF EXISTS `rcdb_manufacturer`;
CREATE TABLE `rcdb_manufacturer` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state_province` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rcdb_manufacturer`
--

INSERT INTO `rcdb_manufacturer` (`id`, `name`, `city`, `state_province`, `country`) VALUES
(1, 'Intamin AG', 'Wollerau', 'Schwyz', 'Switzerland'),
(2, 'Arrow Dynamics', 'Clearfield', 'UT', 'United States'),
(3, 'Rocky Mountain Construction', 'Hayden', 'ID', 'United States'),
(4, 'Bolliger & Mabillard', 'Monthey', 'Valais', 'Switzerland'),
(5, 'Custom Coasters International', 'West Chester', 'OH', 'United States');

-- --------------------------------------------------------

--
-- Table structure for table `rcdb_park`
--

DROP TABLE IF EXISTS `rcdb_park`;
CREATE TABLE `rcdb_park` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state_province` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `owner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rcdb_park`
--

INSERT INTO `rcdb_park` (`id`, `name`, `city`, `state_province`, `country`, `owner`) VALUES
(1, 'Cedar Point', 'Sandusky', 'OH', 'United States', 1),
(2, 'Kings Island', 'Mason', 'OH', 'United States', 1),
(3, 'Canada\'s Wonderland', 'Vaughan', 'ON', 'Canada', 1),
(4, 'Six Flags Over Texas', 'Arlington', 'TX', 'United States', 2),
(5, 'Six Flags Fiesta Texas', 'San Antonio', 'TX', 'United States', 2),
(6, 'Holiday World', 'Santa Claus', 'IN', 'United States', 3);

-- --------------------------------------------------------

--
-- Table structure for table `rcdb_park_owner`
--

DROP TABLE IF EXISTS `rcdb_park_owner`;
CREATE TABLE `rcdb_park_owner` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state_province` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rcdb_park_owner`
--

INSERT INTO `rcdb_park_owner` (`id`, `name`, `city`, `state_province`, `country`) VALUES
(1, 'Cedar Fair', 'Sandusky', 'OH', 'United States'),
(2, 'Six Flags', 'Grand Prairie', 'TX', 'United States'),
(3, 'Koch Development Corporation', 'Santa Claus', 'IN', 'United States');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rcdb_coaster`
--
ALTER TABLE `rcdb_coaster`
  ADD PRIMARY KEY (`id`),
  ADD KEY `park` (`park`),
  ADD KEY `manufacturer` (`manufacturer`);

--
-- Indexes for table `rcdb_coaster_features`
--
ALTER TABLE `rcdb_coaster_features`
  ADD PRIMARY KEY (`cid`,`fid`),
  ADD KEY `fid` (`fid`);

--
-- Indexes for table `rcdb_features`
--
ALTER TABLE `rcdb_features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rcdb_manufacturer`
--
ALTER TABLE `rcdb_manufacturer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rcdb_park`
--
ALTER TABLE `rcdb_park`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `rcdb_park_owner`
--
ALTER TABLE `rcdb_park_owner`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rcdb_coaster`
--
ALTER TABLE `rcdb_coaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `rcdb_features`
--
ALTER TABLE `rcdb_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `rcdb_manufacturer`
--
ALTER TABLE `rcdb_manufacturer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rcdb_park`
--
ALTER TABLE `rcdb_park`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `rcdb_park_owner`
--
ALTER TABLE `rcdb_park_owner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rcdb_coaster`
--
ALTER TABLE `rcdb_coaster`
  ADD CONSTRAINT `rcdb_coaster_ibfk_1` FOREIGN KEY (`park`) REFERENCES `rcdb_park` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `rcdb_coaster_ibfk_2` FOREIGN KEY (`manufacturer`) REFERENCES `rcdb_manufacturer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `rcdb_coaster_features`
--
ALTER TABLE `rcdb_coaster_features`
  ADD CONSTRAINT `rcdb_coaster_features_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `rcdb_coaster` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rcdb_coaster_features_ibfk_2` FOREIGN KEY (`fid`) REFERENCES `rcdb_features` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rcdb_park`
--
ALTER TABLE `rcdb_park`
  ADD CONSTRAINT `rcdb_park_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `rcdb_park_owner` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
