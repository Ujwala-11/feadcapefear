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
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `from_user` varchar(45) NOT NULL,
  `to_user` varchar(45) NOT NULL,
  `message` varchar(225) DEFAULT NULL,
  `time_stamp` varchar(30) DEFAULT NULL,
  `type` int NOT NULL,
  `chatimage` varchar(500) DEFAULT NULL,
  `imagetype` int DEFAULT NULL,
  PRIMARY KEY (`chat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (2,'FCFTJD2320','FCFWHB6671','hi','4/4/2023, 2:23:19 PM',1,'D:\\uploads\\undefined_1680598417823.jpg',0),(4,'FCFWDR9946','FCFWHB6671','hailey','4/4/2023, 2:40:38 PM',1,'D:\\uploads\\undefined_1680599473668.jpg',0),(5,'FCFWDR9946','FCFWHB6671','','4/4/2023, 2:41:15 PM',1,'D:\\uploads\\undefined_1680599497576.jpg',0),(6,'FCFWDR9946','FCFWHB6671','jane','4/4/2023, 2:44:04 PM',1,'D:\\uploads\\undefined_1680599669127.jpg',0),(7,'FCFWDR9946','FCFWHB6671','','4/4/2023, 2:44:31 PM',1,'D:\\uploads\\undefined_1680599684558.jpg',0),(8,'FCFWHB6671','FCFWDR9946','hey','4/4/2023, 2:57:14 PM',1,'D:\\uploads\\undefined_1680600450351.jpg',0),(9,'FCFWDR9946','FCFWHB6671','hi','4/4/2023, 2:58:50 PM',1,'D:\\uploads\\undefined_1680605497517.jpg',0),(10,'FCFTSD2593','FCFWHB6671','','4/4/2023, 4:22:33 PM',1,'D:\\uploads\\undefined_1680605572037.jpg',0),(11,'FCFTSD2593','FCFWHB6671','hi','4/4/2023, 4:22:57 PM',1,'D:\\uploads\\undefined_1680605722254.jpg',0),(12,'FCFTSD2593','FCFWHB6671','hi','4/5/2023, 2:20:47 PM',0,NULL,NULL),(13,'FCFTSD2593','FCFWHB6671','hi there','4/5/2023, 2:36:19 PM',0,NULL,NULL),(14,'FCFWHB6671','FCFTSD2593','hey','4/5/2023, 2:47:55 PM',0,NULL,NULL),(15,'FCFWHB6671','FCFTSD2593','hi','4/5/2023, 3:02:36 PM',1,'D:\\uploads\\undefined_1680687196686.jpg',0),(16,'FCFWHB6671','FCFTSD2593','','4/5/2023, 3:04:16 PM',1,'D:\\uploads\\undefined_1680687269393.jpg',0),(17,'FCFWHB6671','FCFTSD2593','hhhh','4/5/2023, 3:48:50 PM',0,NULL,NULL),(18,'FCFWHB6671','FCFTSD2593','hi','4/5/2023, 4:02:47 PM',0,NULL,NULL),(19,'FCFWHB6671','FCFTSD2593','hey','4/5/2023, 4:02:47 PM',1,'D:\\uploads\\undefined_1680690792494.jpg',0),(20,'FCFTSD2593','FCFTJD2320','hey','4/10/2023, 4:46:28 PM',0,NULL,NULL),(21,'FCFTSD2593','FCFTJD2320','he is john','4/10/2023, 4:47:13 PM',1,'D:\\uploads\\undefined_1681125447028.jpg',0),(22,'FCFTSD2593','FCFTJD2320','hi','4/10/2023, 4:47:13 PM',1,'D:\\uploads\\undefined_1681125457318.jpg',0),(23,'FCFWDR9946','FCFTJD2320','hp','4/10/2023, 4:48:22 PM',0,NULL,NULL),(24,'FCFWDR9946','FCFTJD2320','jn','4/10/2023, 4:48:22 PM',0,NULL,NULL),(25,'FCFWDR9946','FCFTJD2320','','4/10/2023, 4:48:22 PM',1,'D:\\uploads\\undefined_1681125524038.jpg',0),(26,'FCFWDR9946','FCFTJD2320','hl','4/10/2023, 4:48:22 PM',1,'D:\\uploads\\undefined_1681125532373.jpg',0),(27,'FCFWHB6671','FCFTJD2320','hey','4/10/2023, 4:50:16 PM',0,NULL,NULL),(28,'FCFWDR9946','FCFTJD2320','hi','4/10/2023, 4:53:13 PM',1,'D:\\uploads\\undefined_1681125804402.jpg',0),(29,'FCFWDR9946','FCFTJD2320','lll','4/10/2023, 4:55:01 PM',0,NULL,NULL),(30,'FCFTSD2593','FCFTJD2320','hh','4/10/2023, 4:55:57 PM',0,NULL,NULL),(31,'FCFTJD2320','FCFTSD2593','hey .','4/12/2023, 2:23:55 PM',1,'D:\\uploads\\undefined_1681289663709.mp4',1),(32,'FCFTJD2320','FCFTSD2593','ho','4/12/2023, 2:50:43 PM',0,NULL,NULL),(33,'FCFTJD2320','FCFWPB2177','','4/12/2023, 4:29:35 PM',1,'D:\\uploads\\undefined_1681297185664.mp4',1),(34,'FCFTSD2593','FCFWPB2177','hey','4/12/2023, 11:47:52 PM',1,'D:\\uploads\\undefined_1681323521467.mp4',1),(35,'FCFWPB2177','FCFTJD2320','cool','4/12/2023, 11:52:11 PM',1,'D:\\uploads\\undefined_1681323747140.mp4',1),(36,'FCFWHB6671','FCFTJD2320','hi','4/12/2023, 11:52:45 PM',1,'D:\\uploads\\undefined_1681323779086.mp4',1),(37,'FCFWHB6671','FCFTJD2320','oho','4/12/2023, 11:52:45 PM',1,'D:\\uploads\\undefined_1681323794269.jpg',0),(38,'FCFWHB6671','FCFTJD2320','ok','4/12/2023, 11:53:31 PM',0,NULL,NULL),(39,'FCFWHB6671','FCFTJD2320','hi','4/12/2023, 11:53:31 PM',0,NULL,NULL),(40,'FCFTSD2593','FCFTJD2320','h','4/12/2023, 11:54:22 PM',0,NULL,NULL),(41,'FCFTJD2320','FCFWHB6671','hi','4/13/2023, 3:50:15 PM',0,NULL,NULL),(42,'FCFTJD2320','FCFWPB2177','hi','4/13/2023, 3:57:18 PM',0,NULL,NULL),(43,'FCFWPB2177','FCFWDR9946','hi','4/13/2023, 3:58:28 PM',0,NULL,NULL),(44,'FCFWHB6671','FCFWPB2177','hailey','4/13/2023, 3:59:45 PM',0,NULL,NULL),(45,'FCFTSD2593','FCFWPB2177','dplash','4/13/2023, 3:59:57 PM',0,NULL,NULL),(46,'FCFWDR9946','FCFWPB2177','don','4/13/2023, 4:00:07 PM',0,NULL,NULL),(47,'FCFTJD2320','FCFWPB2177','yeah','4/13/2023, 4:00:14 PM',0,NULL,NULL),(48,'FCFWPB2177','FCFWHB6671','hi','4/13/2023, 4:03:21 PM',0,NULL,NULL),(49,'FCFTJD2320','FCFWHB6671','hi','4/13/2023, 4:29:03 PM',0,NULL,NULL),(50,'FCFTJD2320','FCFWHB6671','ii','4/13/2023, 4:31:48 PM',0,NULL,NULL),(51,'FCFWHB6671','FCFTJD2320','hi','4/13/2023, 4:39:04 PM',0,NULL,NULL),(52,'FCFWPB2177','FCFTJD2320','no','4/13/2023, 4:39:31 PM',0,NULL,NULL),(53,'FCFTJD2320','FCFWHB6671','hi','4/17/2023, 3:52:46 PM',0,NULL,NULL);
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-17 16:20:02