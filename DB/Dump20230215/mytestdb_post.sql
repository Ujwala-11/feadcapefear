-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: mytestdb
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_text` varchar(145) NOT NULL,
  `imageUpload` varchar(45) DEFAULT NULL,
  `user_id` varchar(45) DEFAULT NULL,
  `time_stamp` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `post_type` varchar(45) DEFAULT NULL,
  `org_id` varchar(45) DEFAULT NULL,
  `lat` varchar(45) DEFAULT NULL,
  `longitude` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'emergency','D:\\uploads\\FCFWJD7923_1676276461707.jpeg','FCFWJD7923','13-02-2023 13:51:01',NULL,'1','0','5','5'),(2,'Normal','D:\\uploads\\FCFWJD9305_1676276643079.jpg','FCFWJD9305','13-02-2023 13:54:03',NULL,'2','0','4','4'),(3,'hello','D:\\uploads\\FCFWJD9305_1676276738143.jpg','FCFWJD9305','13-02-2023 13:55:38',NULL,'1','1','60','60'),(4,'hi...im Joseph','D:\\uploads\\FCFTJG5663_1676276965879.avif','FCFTJG5663','13-02-2023 13:59:25',NULL,'2','2','73','58'),(5,'hello..this is slav','D:\\uploads\\FCFWSR1473_1676287321962.avif','FCFWSR1473','13-02-2023 16:52:01',NULL,'1','0','24','46'),(6,'hello','D:\\uploads\\FCFWJD9305_1676362676151.avif','FCFWJD9305','14-02-2023 13:47:56',NULL,'1','1','50','33'),(7,'hey','D:\\uploads\\FCFWJD9305_1676376685488.avif','FCFWJD9305','14-02-2023 17:41:25',NULL,'1','0','22','86'),(8,'hello','D:\\uploads\\FCFWJD9305_1676455489040.avif','FCFWJD9305','15-02-2023 15:34:49',NULL,'1','0','17.3244416','78.5743872');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-15 16:16:48
