-- MySQL dump 10.13  Distrib 8.4.11, for Win64 (x86_64)
--
-- Host: localhost    Database: ego_db
-- ------------------------------------------------------
-- Server version	8.4.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `ego_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ego_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `ego_db`;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_product` (`user_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (1,7,3,'2026-10-01 06:42:00'),(2,7,4,'2026-10-01 06:54:00'),(3,7,1,'2026-10-01 06:54:12'),(4,7,2,'2026-10-01 07:10:04'),(8,9,1,'2026-10-01 07:38:30');
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `size` int NOT NULL,
  `condition_percent` int NOT NULL,
  `badge_color` varchar(100) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'nike','Nike Air Force 1',3500.00,42,95,'bg-success','https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80','2026-09-29 15:58:56'),(2,'nike','Nike Dunk Low',3200.00,41,90,'bg-secondary','https://i.ebayimg.com/images/g/E6UAAOSwHehntlHs/s-l1600.webp','2026-09-29 15:58:56'),(3,'adidas','Adidas Samba',2700.00,40,98,'bg-warning text-dark','https://assets.adidas.com/images/w_500,f_auto,q_auto/3a4ab3dac9c1429389cd77e280f3c8e4_9366/adidas_Originals_x_Liberty_London_Samba_OG_IH9056_01_00_standard.jpg','2026-09-29 15:58:56'),(4,'jordan','Air Jordan 1',4800.00,43,99,'bg-danger','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRABgPAMoO5u0Ra8nJDmA6g7ZRzxRI7I-AaGlcuGEqcMm4xbXofcspzwMdz&s=10','2026-09-29 15:58:56'),(5,'newbalance','New Balance 530',2900.00,39,95,'bg-success','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT96QL0YydnLkom1gpJHhHsgomVJgDUqPO3PwU1h6tR3LgNtZCA5I2XQDA&s=10','2026-09-29 15:58:56'),(6,'converse','Converse Wave Motion Trainer Leather',2500.00,39,90,'bg-success','/images/Converse Wave Motion Trainer Leather.webp','2026-09-29 15:58:56'),(7,'converse','Chuck Taylor All Star Malden Street Suede',2300.00,39,90,'bg-success','/images/Chuck Taylor All Star Malden Street Suede.webp','2026-09-29 15:58:56'),(8,'converse','Chuck 70 Canvas Wide',2100.00,41,90,'bg-success','/images/Chuck 70 Canvas Wide.webp','2026-09-29 15:58:56'),(9,'converse','Converse x Comme des Garçons PLAY Chuck 70.1',3000.00,40,95,'bg-success','/images/Converse x Comme des Garçons PLAY Chuck 70.1.webp','2026-09-29 15:58:56'),(10,'converse','Converse x Comme des Garçons PLAY Chuck 70',2700.00,42,90,'bg-success','/images/Converse x Comme des Garçons PLAY Chuck 70.webp','2026-09-29 15:58:56'),(11,'converse','Converse x Comme des Garçons PLAY Chuck 70',2700.00,42,90,'bg-success','/images/Converse x Comme des Garçons PLAY Chuck 70.webp','2026-09-29 15:58:56'),(12,'newbalance','New Balance 9060 Sportstyle',1900.00,42,90,'bg-success','/images/New Balance 9060 Sportstyle.webp','2026-09-29 15:58:56'),(13,'newbalance','New Balance 204L Sportstyle',2100.00,40,92,'bg-success','/images/New Balance 204L Sportstyle.webp','2026-09-29 15:58:56'),(14,'newbalance','New Balance 327 Sportstyle',2100.00,38,90,'bg-success','/images/New Balance 327 Sportstyle.webp','2026-09-29 15:58:56'),(15,'newbalance','New Balance 2010 Lifestyle',2500.00,39,95,'bg-success','/images/New Balance 2010 Lifestyle.webp','2026-09-29 15:58:56'),(16,'newbalance','New Balance 740',1800.00,40,95,'bg-success','/images/New Balance 740.webp','2026-09-29 15:58:56'),(17,'puma','PUMA Palermo',1800.00,41,90,'bg-success','/images/Palermo.avif','2026-09-29 15:58:56'),(18,'puma','PUMA Palermo',2000.00,40,95,'bg-success','/images/Palermo (1).avif','2026-09-29 15:58:56'),(19,'puma','PUMA Palermo',2200.00,40,90,'bg-success','/images/Palermo(3).avif','2026-09-29 15:58:56'),(20,'puma','Speedcat-Ballet',2000.00,40,90,'bg-success','/images/รองเท้าหนังกลับ-Speedcat-Ballet-สำหรับผู้หญิง (3).avif','2026-09-29 15:58:56'),(21,'puma','Speedcat-Ballet',2000.00,39,92,'bg-success','/images/รองเท้าหนังกลับ-Speedcat-Ballet-สำหรับผู้หญิง (2).avif','2026-09-29 15:58:56'),(22,'puma','Speedcat-Ballet',1900.00,39,85,'bg-success','/images/รองเท้าหนังกลับ-Speedcat-Ballet-สำหรับผู้หญิง (1).avif','2026-09-29 15:58:56'),(23,'puma','Speedcat-Ballet',2100.00,42,90,'bg-success','/images/รองเท้าหนังกลับ-Speedcat-Ballet-สำหรับผู้หญิง.avif','2026-09-29 15:58:56'),(24,'puma','Speedcat-OG',2100.00,40,90,'bg-success','/images/รองเท้าผ้าใบ-Speedcat-OG-สำหรับทุกเพศ (4).avif','2026-09-29 15:58:56'),(25,'puma','Speedcat-OG',2100.00,41,90,'bg-success','/images/รองเท้าผ้าใบ-Speedcat-OG-สำหรับทุกเพศ (3).avif','2026-09-29 15:58:56'),(26,'puma','Speedcat-OG',1800.00,40,90,'bg-success','/images/รองเท้าผ้าใบ-Speedcat-OG-สำหรับทุกเพศ (2).avif','2026-09-29 15:58:56'),(27,'puma','Speedcat-OG',1900.00,38,85,'bg-success','/images/รองเท้าผ้าใบ-Speedcat-OG-สำหรับทุกเพศ (1).avif','2026-09-29 15:58:56'),(28,'puma','Speedcat-OG',2100.00,39,90,'bg-success','/images/รองเท้าผ้าใบ-Speedcat-OG-สำหรับทุกเพศ.avif','2026-09-29 15:58:56'),(29,'vans','Skip to the end of the images gallery',2100.00,39,90,'bg-success','/images/Skip to the end of the images gallery.jpg','2026-09-29 15:58:56'),(30,'vans','VANS PREMIUM SUPER LOWPRO TRAINER - PIG SUEDE BROWN',2200.00,41,90,'bg-success','/images/VANS PREMIUM SUPER LOWPRO TRAINER - PIG SUEDE BROWN.jpg','2026-09-29 15:58:56'),(31,'vans','VANS OLD SKOOL',2100.00,40,90,'bg-success','/images/VANS OLD SKOOL.jpg','2026-09-29 15:58:56'),(32,'vans','VANS CLASSIC SLIP-ON - GREEN WHITE',1900.00,42,90,'bg-success','/images/VANS CLASSIC SLIP-ON - GREEN WHITE.png','2026-09-29 15:58:56'),(33,'asics','GEL-NIMBUS 10.1',2300.00,42,95,'bg-success','/images/GEL-NIMBUS 10.1.webp','2026-09-29 15:58:56'),(34,'asics','GEL-KAYANO 20',2500.00,42,95,'bg-success','/images/GEL-KAYANO 20.webp','2026-09-29 15:58:56'),(35,'asics','GEL-1130',2100.00,40,90,'bg-success','/images/GEL-1130.jpg','2026-09-29 15:58:56'),(36,'asics','GEL-NYC',2000.00,38,90,'bg-success','/images/GEL-NYC.webp','2026-09-29 15:58:56'),(37,'asics','GT-2160',2300.00,41,90,'bg-success','/images/GT-2160.webp','2026-09-29 15:58:56'),(38,'adidas','Superstar II',3400.00,41,90,'bg-success','/images/Superstar II.avif','2026-09-29 15:58:56'),(39,'adidas','Stan Smith',3500.00,40,90,'bg-success','/images/Stan Smith.avif','2026-09-29 15:58:56'),(40,'adidas','Samba OG',2500.00,43,90,'bg-success','/images/Samba OG.avif','2026-09-29 15:58:56'),(41,'adidas','ADISTAR CONTROL 5',2400.00,43,90,'bg-success','/images/รองเท้า ADISTAR CONTROL 5.avif','2026-09-29 15:58:56'),(42,'adidas','Adizero EVO SL',2300.00,40,90,'bg-success','/images/รองเท้า Adizero EVO SL.avif','2026-09-29 15:58:56'),(43,'nike','Nike SB Dunk Low Pro',2500.00,38,90,'bg-success','/images/Nike SB Dunk Low Pro.avif','2026-09-29 15:58:56'),(44,'nike','Nike Dunk Low SE',3000.00,39,90,'bg-success','/images/Nike Dunk Low SE.avif','2026-09-29 15:58:56'),(45,'jordan','Jordan 1 Retro Low OG SP Fragment x Travis Scott',5000.00,40,99,'bg-success','/images/Jordan 1 Retro Low OG SP Fragment x Travis Scott.webp','2026-09-29 15:58:56'),(46,'jordan','Jordan 1 Retro Low OG SP Travis Scott Mocha',4800.00,41,90,'bg-success','/images/Jordan 1 Retro Low OG SP Travis Scott Mocha.webp','2026-09-29 15:58:56'),(47,'nike','Canvas and Parachute Beige',3000.00,41,90,'bg-success','images/Canvas and Parachute Beige.avif','2026-09-29 15:58:56');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'John','john@example.com',NULL,'2026-09-29 15:47:59'),(6,'Jane','jane@example.com',NULL,'2026-09-29 15:47:59'),(7,'Dale','dale67509@gmail.com','9eed01457b06ffcc0c45012d86aba862:3d81b604ffea0653b317110c1c8be1dca658b630f9b6f93ee663d05e7827a4ee3d1e01abfa606d5a79f62c4e849104ee875d69bb378378bec816a796a40673e9','2026-10-01 06:07:06'),(8,'arisa','arisa17294@gmail.com','c1d013cbf4b6bdae8fa82a757a242045:4bdb4133627b7d63b2c32d3a2dc529f06d0b297960537e2def7e3657788c73b159ed23c190fd7f7693153c0feba8377bae2cdb4b9df10296747911c474625f15','2026-10-01 07:13:54'),(9,'a2548risa','a2548risa@gmail.com','8697c9ebbff2c0bab039fbb9de2e32bf:ea04b0902fcde465066425fa9f872569b36783d3bb1763b7bf772e91c13b2e01b595223a9a40743a3fa73a709ddcc1215fc1190114f6037231d688dcd573ba8e','2026-10-01 07:27:39'),(10,'Andrea.1121.25','andrea.1121dela@gmail.com','b0a60583a8f920e0c8d89a0f0eede3f9:7c053350ce0defd2dda254aa0c87771bbb972c9ec1f9b061ea5f1385689b750d48e66b0b4dfb525427a840c6ac33e7b610d9841375b7203013893f40bec370d7','2026-10-01 08:50:57');
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

-- Dump completed on 2026-10-02  1:18:17
