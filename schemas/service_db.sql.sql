-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: service_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `icon_url` text,
  `description` text,
  `min_price` decimal(38,2) DEFAULT NULL,
  `max_price` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Driver','https://yourcdn.com/icons/driver.png','Transport services including intercity and local drops',300.00,1000.00),(2,'Tutor','https://yourcdn.com/icons/tutor.png','Home and online tutoring for all subjects and grades',200.00,800.00),(3,'Electrician','https://yourcdn.com/icons/electrician.png','Electrical repairs, installations, and rewiring',400.00,1200.00),(4,'Plumber','https://yourcdn.com/icons/plumber.png','Pipe fittings, leak repairs, and water systems',350.00,1100.00),(5,'Repair','https://yourcdn.com/icons/repair.png','Device and appliance maintenance services',250.00,900.00),(6,'Painter','https://yourcdn.com/icons/painter.png','Interior and exterior painting services',500.00,1500.00),(7,'Cook','https://yourcdn.com/icons/cook.png','Home cooking and catering services',300.00,1000.00),(8,'Tailor','https://yourcdn.com/icons/tailor.png','Custom stitching and clothing alterations',200.00,700.00);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_taskers`
--

DROP TABLE IF EXISTS `category_taskers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_taskers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `profile_pic_url` text,
  `category_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `bio` text,
  `price` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `asset_type` varchar(100) DEFAULT NULL,
  `asset_model` varchar(100) DEFAULT NULL,
  `asset_color` varchar(50) DEFAULT NULL,
  `asset_identifier` varchar(50) DEFAULT NULL,
  `asset_summary` text,
  PRIMARY KEY (`id`),
  KEY `FK_category` (`category_id`),
  KEY `FK_user` (`user_id`),
  CONSTRAINT `category_taskers_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FK_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_taskers`
--

LOCK TABLES `category_taskers` WRITE;
/*!40000 ALTER TABLE `category_taskers` DISABLE KEYS */;
INSERT INTO `category_taskers` VALUES (40,'Ravi Wheels',4.6,'https://yourcdn.com/driver1.png',1,101,'Driver','Experienced city driver with 5+ years of service',NULL,1,NULL,NULL,NULL,NULL,NULL),(41,'Neha Tutor',4.5,'https://yourcdn.com/tutor1.png',2,102,'Tutor','Math and science tutor for high school students',NULL,1,NULL,NULL,NULL,NULL,NULL),(42,'Arjun Spark',4.4,'https://yourcdn.com/electrician1.png',3,103,'Electrician','Certified electrician for home and office setups',NULL,1,NULL,NULL,NULL,NULL,NULL),(43,'Meera Pipes',4.3,'https://yourcdn.com/plumber1.png',4,104,'Plumber','Plumbing expert for leak repairs and installations',NULL,1,NULL,NULL,NULL,NULL,NULL),(44,NULL,NULL,NULL,5,105,'Repair','Mobile and laptop repair specialist',NULL,1,NULL,NULL,NULL,NULL,NULL),(45,NULL,NULL,NULL,6,106,'Painter','Interior painter with color consultation experience',NULL,1,NULL,NULL,NULL,NULL,NULL),(46,NULL,NULL,NULL,7,107,'Cook','Home cook offering daily meal plans and catering',NULL,1,NULL,NULL,NULL,NULL,NULL),(47,NULL,NULL,NULL,8,108,'Tailor','Tailor for custom stitching and alterations',NULL,1,NULL,NULL,NULL,NULL,NULL),(48,'Ravi Wheels',4.6,'https://yourcdn.com/driver1.png',1,NULL,'Driver','Experienced city driver with 5+ years of service',250,1,'Vehicle','Toyota Camry','Black','KL07CD7890','Comfortable 4-seater sedan with AC, GPS, and clean interiors'),(49,'Sonal Ride',4.3,'https://yourcdn.com/driver2.png',1,NULL,'Driver','Reliable and punctual female driver for families',220,1,'Vehicle','Honda Jazz','Red','KL08EF2311','Compact hatchback with child-lock safety and great mileage'),(50,'Vikram Shift',4.5,'https://yourcdn.com/driver3.png',1,NULL,'Driver','Owns a commercial van, great for office moves',300,1,'Vehicle','Mahindra Bolero','White','KL10BA4567','Spacious van suitable for cargo or group transport with roof racks'),(51,'Alok Tours',4.2,'https://yourcdn.com/driver4.png',1,NULL,'Driver','Provides sightseeing packages in Kerala',280,1,'Vehicle','Hyundai Xcent','Silver','KL11ZZ9988','Tour-friendly compact sedan with audio system and mobile charger support');
/*!40000 ALTER TABLE `category_taskers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reported_issues`
--

DROP TABLE IF EXISTS `reported_issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reported_issues` (
  `issue_id` bigint NOT NULL AUTO_INCREMENT,
  `tasker_id` bigint NOT NULL,
  `issue_description` text NOT NULL,
  `reported_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`issue_id`),
  KEY `tasker_id` (`tasker_id`),
  CONSTRAINT `reported_issues_ibfk_1` FOREIGN KEY (`tasker_id`) REFERENCES `category_taskers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reported_issues`
--

LOCK TABLES `reported_issues` WRITE;
/*!40000 ALTER TABLE `reported_issues` DISABLE KEYS */;
INSERT INTO `reported_issues` VALUES (1,48,'Reported via frontend UI','2025-07-10 16:32:26'),(2,48,'Reported via frontend UI','2025-07-10 16:32:28'),(3,48,'Reported via frontend UI','2025-07-10 16:32:28');
/*!40000 ALTER TABLE `reported_issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip_history`
--

DROP TABLE IF EXISTS `trip_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip_history` (
  `trip_id` bigint NOT NULL AUTO_INCREMENT,
  `driver_id` bigint DEFAULT NULL,
  `trip_date` date DEFAULT NULL,
  `trip_description` text,
  PRIMARY KEY (`trip_id`),
  KEY `driver_id` (`driver_id`),
  CONSTRAINT `trip_history_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `category_taskers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_history`
--

LOCK TABLES `trip_history` WRITE;
/*!40000 ALTER TABLE `trip_history` DISABLE KEYS */;
INSERT INTO `trip_history` VALUES (1,48,'2025-07-01','Airport drop for a family of four with luggage'),(2,48,'2025-07-05','Night ride from Aluva to Kochi city'),(3,49,'2025-06-28','School pickup and drop for 3 children'),(4,49,'2025-07-03','Tourist ride to Fort Kochi with narration'),(5,50,'2025-07-02','Cargo transport from MG Road to Thrikkakara'),(6,51,'2025-07-04','Excursion to Athirappilly waterfalls for 6 passengers');
/*!40000 ALTER TABLE `trip_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `profile_pic_url` varchar(255) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgx0oqf703aa8cmro1cimhh13v` (`category_id`),
  CONSTRAINT `FKgx0oqf703aa8cmro1cimhh13v` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'adharshadharsh1479@gmail.com','$2a$10$xEFTrMfY04/J4zdlbYbXMeIBviXgtdzA5pEt3dfzFuvN4jcNkl4lK',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'abcd@gmail.com','abcdefg',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'rgrgwrgrrrrrrrg','fgfgfdf',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'sfdfdfdfaefsdg','gsdgsfvb',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'ammu@gmail.com','adharsg',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'soorya@gmail.com','soorya',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'hjadkfa','$2a$10$p7YgbaFamIzDnmW4Nyd64OfnpVOjRR6oUo36yP9rypTHK8R/k3aYi',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'akkus@gmail.com','$2a$10$50tMJHbpiPLkEQPOV7aX6Orf5e4nxkBKwfky6A.EHAeCb5HaMYI46',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'abhishek@gmail.com','$2a$10$m9WAKIdyvRr04xlagnt3QefSh.C/oENyd12fO.mG6N6DbOd7WjTaS',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'ravi@tasker.com','$2a$10$ENCODED_PASSWORD','Ravi Kumar',NULL,NULL,NULL,NULL,NULL,NULL),(11,'meera@tasker.com','$2a$10$ENCODED_PASSWORD','Meera Sharma',NULL,NULL,NULL,NULL,NULL,NULL),(12,'arun@tasker.com','$2a$10$ENCODED_PASSWORD','Arun Thomas',NULL,NULL,NULL,NULL,NULL,NULL),(13,'user1','$2a$10$Tw6Fzdu/RiPrAMMha6B6HuKiLs7XpK.A43Ih.etuf8ldnnpYvcbMK',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'user1@gmail.com','$2a$10$9P7H3GNs.tKswPYBa7DwgOB/MH7GcdY.cgxItp613JkOgMtQzyvKW',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'hello@gmail.com','$2a$10$eME2iWemqwgVfxhik1uXzO2WYkhu.iz3ZcxzLs3ekT99WJRisVnIm',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(101,NULL,NULL,'Ramesh Driver',NULL,NULL,NULL,NULL,NULL,NULL),(201,'ramesh@example.com','hashedpass1','Ramesh Driver',NULL,NULL,NULL,NULL,NULL,NULL),(202,'asha@example.com','hashedpass2','Asha Pilot',NULL,NULL,NULL,NULL,NULL,NULL),(203,'meera@example.com','hashedpass3','Meera Tutor',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-11  0:15:18
