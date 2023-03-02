-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2023 at 08:18 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dumbsound`
--

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `old` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `start_career` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`id`, `name`, `old`, `type`, `start_career`, `created_at`, `updated_at`) VALUES
(1, 'Ed Sheeran', '35', 'Solo', '2009', '2023-02-17 06:40:54.352', '2023-02-17 06:40:54.352'),
(2, 'Bunga Citra Lestari', '35', 'Solo', '2009', '2023-02-17 06:41:06.781', '2023-02-17 06:41:06.781'),
(3, 'Virgoun', '35', 'Solo', '2019', '2023-02-17 18:18:54.593', '2023-02-17 18:18:54.593'),
(4, 'Anang Hermansyah', '45', 'Group', '2018', '2023-02-17 18:19:29.105', '2023-02-17 18:19:29.105'),
(5, 'Raffi Ahmad', '36', 'Solo', '2001', '2023-02-17 18:20:34.288', '2023-02-17 18:20:34.288'),
(6, 'Surya Ganteng', '25', 'Solo', '2015', '2023-02-21 11:44:52.719', '2023-02-21 11:44:52.719'),
(7, 'Anjie', '34', 'Solo', '2015', '2023-02-25 20:59:38.287', '2023-02-25 20:59:38.287');

-- --------------------------------------------------------

--
-- Table structure for table `musics`
--

CREATE TABLE `musics` (
  `id` bigint(20) NOT NULL,
  `artist_id` bigint(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `attache` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `musics`
--

INSERT INTO `musics` (`id`, `artist_id`, `title`, `year`, `thumbnail`, `attache`, `created_at`, `updated_at`) VALUES
(5, 3, 'Kilas Balik', '2019', 'thumbnail1.png', 'music1.mp3', '2023-02-17 20:44:31.120', '2023-02-17 20:44:31.120'),
(6, 5, 'Perfect', '2023', 'thumbnail2.png', 'music2.mp3', '2023-02-17 20:46:34.918', '2023-02-17 20:46:34.918'),
(7, 1, 'Mesin Waktu', '2019', 'thumbnail3.png', 'music3.mp3', '2023-02-17 20:48:22.435', '2023-02-17 20:48:22.435'),
(8, 2, 'Angin Kencang', '2019', 'thumbnail4.png', 'music4.mp3', '2023-02-17 20:50:39.616', '2023-02-17 20:50:39.616'),
(9, 1, 'Kill Bill', '2015', 'thumbnail5.png', 'music5.mp3', '2023-02-17 20:52:14.100', '2023-02-17 20:52:14.100'),
(10, 3, 'Here With Me', '2010', 'thumbnail6.png', 'music6.mp3', '2023-02-17 20:52:41.593', '2023-02-17 20:52:41.593'),
(11, 1, 'Shape Of You', '2016', 'thumbnail7.png', 'music7.mp3', '2023-02-17 20:53:28.664', '2023-02-17 20:53:28.664'),
(12, 2, 'Billioner', '2020', 'thumbnail8.png', 'music8.mp3', '2023-02-17 20:54:11.526', '2023-02-17 20:54:11.526'),
(13, 2, 'Pelangi', '2011', 'thumbnail9.png', 'music9.mp3', '2023-02-17 20:54:34.614', '2023-02-17 20:54:34.614'),
(14, 2, 'I Love U', '2019', 'thumbnail10.png', 'music10.mp3', '2023-02-17 20:55:09.539', '2023-02-17 20:55:09.539'),
(15, 1, 'Until I Find U', '2019', 'thumbnail11.png', 'music11.mp3', '2023-02-17 20:56:00.305', '2023-02-17 20:56:00.305'),
(16, 5, 'Cinta Buta', '2018', 'thumbnail12.png', 'music1.mp3', '2023-02-17 21:58:20.057', '2023-02-17 21:58:20.057'),
(17, 2, 'Mawar Hitam', '2007', 'thumbnail13.png', 'music5.mp3', '2023-02-17 22:00:36.849', '2023-02-17 22:00:36.849'),
(18, 3, 'Titanic', '2002', 'thumbnail14.png', 'music6.mp3', '2023-02-18 20:16:47.078', '2023-02-18 20:16:47.078'),
(19, 6, 'Perfect', '2023', 'image-575261630.png', 'music-450064344.mp3', '2023-02-21 11:46:21.727', '2023-02-21 11:46:21.727'),
(20, 1, 'Sirvan', '1997', 'image-4138326404.png', 'music-4282982269.mp3', '2023-02-25 20:57:24.783', '2023-02-25 20:57:24.783'),
(21, 5, 'Sial', '2012', 'image-3876972730.png', 'music-1786100664.mp3', '2023-02-25 20:58:44.435', '2023-02-25 20:58:44.435');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '2023-02-17 06:39:40.868', '2023-02-17 06:39:40.868'),
(2, 'User', '2023-02-17 06:39:44.535', '2023-02-17 06:39:44.535');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `start_date` datetime(3) DEFAULT NULL,
  `due_date` datetime(3) DEFAULT NULL,
  `status_user` varchar(255) DEFAULT NULL,
  `status_payment` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `start_date`, `due_date`, `status_user`, `status_payment`, `created_at`, `updated_at`) VALUES
(1677139101, 7, '2023-02-23 14:58:20.911', '2023-03-25 14:58:21.808', 'Not Active', 'Success', '2023-02-23 14:58:21.808', '2023-02-23 14:58:40.955'),
(1677256102, 8, '2023-02-24 23:28:21.978', '2023-02-24 23:28:22.894', 'Not Active', 'Pending', '2023-02-24 23:28:22.895', '2023-02-24 23:28:22.895'),
(1677257551, 8, '2023-02-24 23:52:30.139', '2023-03-26 23:52:31.123', 'Active', 'Success', '2023-02-24 23:52:31.123', '2023-02-24 23:56:30.528'),
(1677257951, 9, '2023-02-24 23:59:10.577', '2023-02-24 23:59:44.601', 'Not Active', 'Failed', '2023-02-24 23:59:11.312', '2023-02-24 23:59:47.375'),
(1677375978, 9, '2023-02-26 08:46:13.840', '2023-03-28 08:46:18.508', 'Not Active', 'Pending', '2023-02-26 08:46:18.511', '2023-02-26 08:46:18.511'),
(1677376348, 9, '2023-02-26 08:52:27.206', '2023-03-28 08:52:28.212', 'Not Active', 'Pending', '2023-02-26 08:52:28.213', '2023-02-26 08:52:28.213'),
(1677453951, 11, '2023-02-27 06:25:34.986', '2023-03-29 06:25:51.013', 'Active', 'Success', '2023-02-27 06:25:51.014', '2023-02-27 06:26:33.460');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `fullname`, `email`, `password`, `gender`, `phone`, `address`, `created_at`, `updated_at`) VALUES
(1, 1, 'Administrator', 'admin@gmail.com', '$2a$10$ij2LVYxZhxe02s8cCg8w7OeGwqOMeu9ND1m4shSp5aryjXTwlZPe.', 'Male', '085729299918', 'Tangerang', '2023-02-17 06:40:13.746', '2023-02-17 06:40:13.746'),
(7, 2, 'Farid Nugroho', 'farid@gmail.com', '$2a$10$YZp/a/1gZNhPR4hLh.c7I.BMVF6xmrVM.HiQw5fSCGBOgyuWQOp8O', 'Male', '085729299918', 'Tangerang Selatan', '2023-02-23 14:53:56.277', '2023-02-23 14:53:56.277'),
(8, 2, 'Arya Krisna', 'krisna@gmail.com', '$2a$10$kbZYAGQs5emKATViHCuotu1lSoJdjZTrb58gb2h8XWp4CYtaIRRLC', 'Male', '0857209293846932', 'Denpasar', '2023-02-24 11:37:38.531', '2023-02-24 11:37:38.531'),
(9, 2, 'Teddy Aji', 'teddy@gmail.com', '$2a$10$iy9w/i/EAz95iNlBpx3uLOF8kLQeSfF7yr.81ZwWacQwwwBR2yhmi', 'Male', '08676534632', 'Denpasar', '2023-02-24 23:58:02.443', '2023-02-24 23:58:02.443'),
(10, 2, 'Rizal Salasi', 'salasi@gmail.com', '$2a$10$YQKLOqNezXTiUBuM80cteu7cHUB9soosRW2iF8R2PLW2YNKuRRFVq', 'Male', '08363547324', 'Tangerang Selatan', '2023-02-25 00:05:05.719', '2023-02-25 00:05:05.719'),
(11, 2, 'Farid Nugroho', 'faridnugroho1011@gmail.com', '$2a$10$f9sHuu.nSDxvbJ3HMaUBLuoKa4aNvMbK3SUGd4llU7inNvT8644AO', 'Male', '08573847538394', 'Tangerang Selatan', '2023-02-27 06:24:05.531', '2023-02-27 06:24:05.531');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `musics`
--
ALTER TABLE `musics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_musics_artist` (`artist_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_transactions_user` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_role` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `musics`
--
ALTER TABLE `musics`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1677453952;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `musics`
--
ALTER TABLE `musics`
  ADD CONSTRAINT `fk_musics_artist` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `fk_transactions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
