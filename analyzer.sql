-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2024 at 09:39 AM
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
-- Database: `analyzer`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `adminkey` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `name`, `adminkey`, `email`, `phone`) VALUES
(1, 'Admin1', 'adminkey123', 'admin1@example.com', '01510000000'),
(2, 'Admin2', 'adminkey456', 'admin2@example.com', '01520000000'),
(3, 'Admin3', 'adminkey789', 'admin3@example.com', '01530000000'),
(4, 'Admin4', 'adminkey101', 'admin4@example.com', '01540000000'),
(5, 'Admin5', 'adminkey202', 'admin5@example.com', '01550000000'),
(6, 'Admin6', 'adminkey303', 'admin6@example.com', '01560000000'),
(7, 'Admin7', 'adminkey404', 'admin7@example.com', '01570000000'),
(8, 'Admin8', 'adminkey505', 'admin8@example.com', '01580000000'),
(9, 'Admin9', 'adminkey606', 'admin9@example.com', '01590000000'),
(10, 'Admin10', 'adminkey707', 'admin10@example.com', '01600000000');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_id` int(11) NOT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`company_id`, `company_name`, `location`, `email`, `phone_number`, `type`) VALUES
(1, 'Tech Solutions', 'Dhaka', 'info@techsolutions.com', '0298000000', 'Software Development'),
(2, 'Innovate IT', 'Sylhet', 'contact@innovateit.com', '0823000000', 'IT Services'),
(3, 'Creative Minds', 'Chittagong', 'info@creativeminds.com', '0312000000', 'Digital Marketing'),
(4, 'Smart Tech', 'Khulna', 'contact@smarttech.com', '0417000000', 'Software Solutions'),
(5, 'NextGen Solutions', 'Rajshahi', 'info@nextgensolutions.com', '0721000000', 'IT Consultancy'),
(6, 'ProTech', 'Barisal', 'contact@protech.com', '0431000000', 'Web Development'),
(7, 'MegaSoft', 'Rangpur', 'info@megasoft.com', '0521000000', 'Software Engineering'),
(8, 'SoftServe', 'Dhaka', 'contact@softserve.com', '0299000000', 'Customer Service Solutions'),
(9, 'FastTech', 'Sylhet', 'info@fasttech.com', '0824000000', 'Hardware Solutions'),
(10, 'TechWave', 'Chittagong', 'contact@techwave.com', '0313000000', 'Network Solutions');

-- --------------------------------------------------------

--
-- Table structure for table `cv`
--

CREATE TABLE `cv` (
  `cv_id` int(11) NOT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `file` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cv`
--

INSERT INTO `cv` (`cv_id`, `user_id`, `job_id`, `file`) VALUES
(1, 'Mahmudul', 1, 'mahmudul_cv.pdf'),
(2, 'Ayesha', 2, 'ayesha_cv.pdf'),
(3, 'Karim', 3, 'karim_cv.pdf'),
(4, 'Fatema', 4, 'fatema_cv.pdf'),
(5, 'Rahim', 5, 'rahim_cv.pdf'),
(6, 'Sumaiya', 6, 'sumaiya_cv.pdf'),
(7, 'Habib', 7, 'habib_cv.pdf'),
(8, 'Nusrat', 8, 'nusrat_cv.pdf'),
(9, 'Arif', 9, 'arif_cv.pdf'),
(10, 'Tania', 10, 'tania_cv.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `job_id` int(11) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `job_title` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `requirement` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`job_id`, `company_id`, `job_title`, `type`, `requirement`) VALUES
(1, 1, 'QA Engineer', 'Full-time', 'Experience in automated testing, Selenium knowledge required'),
(2, 2, 'Software Tester', 'Part-time', 'Manual testing experience, knowledge of test case creation'),
(3, 3, 'Automation Tester', 'Full-time', 'Proficiency in Python and Selenium'),
(4, 4, 'Test Manager', 'Full-time', 'Leadership skills, experience in managing QA teams'),
(5, 5, 'Performance Tester', 'Contract', 'Experience in load testing tools like JMeter'),
(6, 6, 'Mobile App Tester', 'Full-time', 'Experience in testing iOS and Android applications'),
(7, 7, 'Security Tester', 'Full-time', 'Knowledge of penetration testing and security protocols'),
(8, 8, 'Manual Tester', 'Part-time', 'Detail-oriented, experience in manual testing'),
(9, 9, 'Test Analyst', 'Full-time', 'Analytical skills, experience in test planning and execution'),
(10, 10, 'Senior QA Engineer', 'Full-time', 'Extensive experience in QA processes and tools');

-- --------------------------------------------------------

--
-- Table structure for table `job_seeker`
--

CREATE TABLE `job_seeker` (
  `name` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_seeker`
--

INSERT INTO `job_seeker` (`name`, `address`, `email`, `phone_number`, `password`) VALUES
('Arif', '303 Oak St, Sylhet', 'arif@example.com', '01790000000', 'password303'),
('Ayesha', '456 Oak Rd, Chittagong', 'ayesha@example.com', '01720000000', 'password456'),
('Fatema', '321 Elm St, Rajshahi', 'fatema@example.com', '01740000000', 'password321'),
('Habib', '101 Maple Rd, Rangpur', 'habib@example.com', '01770000000', 'password101'),
('Karim', '789 Pine St, Sylhet', 'karim@example.com', '01730000000', 'password789'),
('Mahmudul', '123 Main St, Dhaka', 'mahmudul@example.com', '01710000000', 'password123'),
('Nusrat', '202 Cherry St, Dhaka', 'nusrat@example.com', '01780000000', 'password202'),
('Rahim', '654 Cedar Rd, Khulna', 'rahim@example.com', '01750000000', 'password654'),
('Sumaiya', '987 Birch St, Barisal', 'sumaiya@example.com', '01760000000', 'password987'),
('Tania', '404 Pine Rd, Chittagong', 'tania@example.com', '01800000000', 'password404');

-- --------------------------------------------------------

--
-- Table structure for table `sorted_cv`
--

CREATE TABLE `sorted_cv` (
  `cv_id` int(11) NOT NULL,
  `file` text DEFAULT NULL,
  `match_rate` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sorted_cv`
--

INSERT INTO `sorted_cv` (`cv_id`, `file`, `match_rate`) VALUES
(1, 'mahmudul_cv.pdf', 85.50),
(2, 'ayesha_cv.pdf', 78.20),
(3, 'karim_cv.pdf', 82.30),
(4, 'fatema_cv.pdf', 74.10),
(5, 'rahim_cv.pdf', 80.00),
(6, 'sumaiya_cv.pdf', 77.50),
(7, 'habib_cv.pdf', 83.20),
(8, 'nusrat_cv.pdf', 79.40),
(9, 'arif_cv.pdf', 81.10),
(10, 'tania_cv.pdf', 76.30);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `cv`
--
ALTER TABLE `cv`
  ADD PRIMARY KEY (`cv_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `job_id` (`job_id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `job_seeker`
--
ALTER TABLE `job_seeker`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `sorted_cv`
--
ALTER TABLE `sorted_cv`
  ADD PRIMARY KEY (`cv_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `cv`
--
ALTER TABLE `cv`
  MODIFY `cv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cv`
--
ALTER TABLE `cv`
  ADD CONSTRAINT `cv_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `job_seeker` (`name`),
  ADD CONSTRAINT `cv_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `job` (`job_id`);

--
-- Constraints for table `job`
--
ALTER TABLE `job`
  ADD CONSTRAINT `job_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`);

--
-- Constraints for table `sorted_cv`
--
ALTER TABLE `sorted_cv`
  ADD CONSTRAINT `sorted_cv_ibfk_1` FOREIGN KEY (`cv_id`) REFERENCES `cv` (`cv_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
