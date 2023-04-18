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
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `events_id` int NOT NULL AUTO_INCREMENT,
  `event_text` varchar(500) DEFAULT NULL,
  `imageUpload` varchar(50) DEFAULT NULL,
  `imagetype` int DEFAULT NULL,
  `user_id` varchar(45) NOT NULL,
  `time_stamp` varchar(45) DEFAULT NULL,
  `lat` varchar(45) DEFAULT NULL,
  `longitude` varchar(45) DEFAULT NULL,
  `event_end_date` varchar(45) DEFAULT NULL,
  `event_end_time` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`events_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,' Each of the upload options described above can also be performed as a signed upload, but in this case, an authentication signature must be generated on your backend server. This can be implemented in conjunction with one of backend SDKs, which implement helpers to automatically generate the authentication signature for the upload.',NULL,NULL,'FCFWHB6671','06-04-2023 15:54:29','17.4278848','78.447334','2023-04-09','06:30'),(2,' Each of the upload options described above can also be performed as a signed upload, but in this case, an authentication signature must be generated on your backend server. This can be implemented in conjunction with one of  backend SDKs, which implement helpers to automatically generate the authentication signature for the upload.','D:\\uploads\\FCFWHB6671_1680776699874.jpg',0,'FCFWHB6671','06-04-2023 15:54:59','17.4278898','78.4473402','2023-04-08','16:00'),(3,'heelo','D:\\uploads\\FCFTJD2320_1680778044261.jpg',0,'FCFTJD2320','06-04-2023 16:17:24','17.4110062','78.4410784','2023-04-02','17:30'),(4,'The Upload widget is a ready-made, responsive user interface that enables your users to upload files from a variety of sources directly to You can customize and embed this UI within your web application with just a few lines of code.',NULL,NULL,'FCFWHB6671','06-04-2023 22:03:52','17.4298447','78.4554839','2023-04-29','17:00'),(5,'The Upload widget is a ready-made, responsive user interface that enables your users to upload files from a variety of sources directly to You can customize and embed this UI within your web application with just a few lines of code.','D:\\uploads\\FCFTJD2320_1681113996930.jpg',0,'FCFTJD2320','10-04-2023 13:36:36','17.4279111','78.4473124','2023-04-19','16:30'),(6,'dtkchgvnb ',NULL,NULL,'FCFTJD2320','10-04-2023 13:38:34','17.4279078','78.447311','2023-04-02','15:00'),(7,'Meet SOLID principles, your saviour! SOLID stands for: \r\n Single responsibility principle\r\nOpen-closed principle\r\nLiskov substitution principle\r\nInterface segregation principle\r\nDependency inversion principle',NULL,NULL,'FCFTJD2320','10-04-2023 13:40:41','17.4278795','78.4473381','2023-04-26','18:30'),(8,'heyo','D:\\uploads\\FCFTJD2320_1681117840154.jpg',0,'FCFTJD2320','10-04-2023 14:40:40','17.4101645','78.4410783','2023-04-11','16:30'),(9,'h',NULL,NULL,'FCFTJD2320','10-04-2023 15:41:37','17.4101645','78.4410783','2023-04-29','15:41'),(10,'hry','D:\\uploads\\FCFTJD2320_1681201766656.mp4',1,'FCFTJD2320','11-04-2023 13:59:26','17.427891','78.4472674','2023-04-12','14:00'),(11,'hey','D:\\uploads\\FCFTJD2320_1681286375362.jpg',0,'FCFTJD2320','12-04-2023 13:29:35','17.4278966','78.4472758','2023-04-13','16:32'),(12,'jkm,','D:\\uploads\\FCFTJD2320_1681287332988.mp4',1,'FCFTJD2320','12-04-2023 13:45:32','17.4278966','78.4472758','2023-04-14','17:00'),(13,'klm,','D:\\uploads\\FCFTJD2320_1681287371623.mp4',1,'FCFTJD2320','12-04-2023 13:46:11','17.4101344','78.4428994','2023-04-14','17:00'),(14,'hjnyu','D:\\uploads\\FCFTJD2320_1681287460759.jpg',0,'FCFTJD2320','12-04-2023 13:47:40','17.4278867','78.4472726','2023-04-20','17:51'),(15,'this is coffee','D:\\uploads\\FCFTSD2593_1681295085754.mp4',1,'FCFTSD2593','12-04-2023 15:54:45','17.4279138','78.4473283','2023-04-13','16:55'),(16,'hhi','D:\\uploads\\FCFWPB2177_1681297506495.jpg',0,'FCFWPB2177','12-04-2023 16:35:06','17.4279136','78.4473136','2023-04-14','16:36'),(17,'ho','D:\\uploads\\FCFWPB2177_1681297532332.mp4',1,'FCFWPB2177','12-04-2023 16:35:32','17.4279136','78.4473136','2023-04-17','16:37'),(18,'h','D:\\uploads\\FCFWPB2177_1681297806388.jpg',0,'FCFWPB2177','12-04-2023 16:40:06','17.4279115','78.447306','2023-04-27','16:39');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-17 16:20:03
