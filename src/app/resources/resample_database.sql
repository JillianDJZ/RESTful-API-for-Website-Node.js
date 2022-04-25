INSERT INTO `category`(`id`, `name` ) VALUES (1,'Smartphones');
INSERT INTO `category`(`id`, `name` ) VALUES (2,'Computers & Laptops');
INSERT INTO `category`(`id`, `name` ) VALUES (3,'Books');
INSERT INTO `category`(`id`, `name` ) VALUES (4,'CDs');
INSERT INTO `category`(`id`, `name` ) VALUES (5,'DVDs');
INSERT INTO `category`(`id`, `name` ) VALUES (6,'Motorbikes');
INSERT INTO `category`(`id`, `name` ) VALUES (7,'Bicycles');
INSERT INTO `category`(`id`, `name` ) VALUES (8,'Farm Equipment');
INSERT INTO `category`(`id`, `name` ) VALUES (11,'Furniture');
INSERT INTO `category`(`id`, `name` ) VALUES (10,'Homeware');
INSERT INTO `category`(`id`, `name` ) VALUES (9,'Jewellery');
INSERT INTO `category`(`id`, `name` ) VALUES (12,'Watches');
INSERT INTO `category`(`id`, `name` ) VALUES (13,'Instruments');
INSERT INTO `category`(`id`, `name` ) VALUES (14,'Electronics');
INSERT INTO `category`(`id`, `name` ) VALUES (15,'Office Equipment');
INSERT INTO `category`(`id`, `name` ) VALUES (16,'Tablets');
INSERT INTO `category`(`id`, `name` ) VALUES (17,'Paintings & Sculptures');
INSERT INTO `category`(`id`, `name` ) VALUES (18,'Bulk Items');
INSERT INTO `category`(`id`, `name` ) VALUES (19,'Gaming Consoles');
INSERT INTO `category`(`id`, `name` ) VALUES (20,'Hair Care');
INSERT INTO `category`(`id`, `name` ) VALUES (21,'Perfume');
INSERT INTO `category`(`id`, `name` ) VALUES (22,'Clothing');
INSERT INTO `category`(`id`, `name` ) VALUES (23,'Lego');
INSERT INTO `category`(`id`, `name` ) VALUES (24,'Figurines');
INSERT INTO `category`(`id`, `name` ) VALUES (25,'Cars');

INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (1, "Vintage Lego Set", "An aged search and rescue Lego set, some pieces are missing.",                                                                                                                                                                   23,"2022-05-01 22:30:00", "auction_1.png", 25, 1);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (2, "Bulk Home Items", "I'm moving out of the country soon and need to sell off all my old appliances.\nWhats included:\nMicrowave\nCooking timer\nCutlery\nTableware",                                                                                   10,"2022-06-22 08:30:00", "auction_2.png", 1, 2);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (3, "Beautiful Antique Hand Crafted Furniture", "This collection of great pre-loved furniture could be yours, some pieces might benefit from a bit of touching up.\nNo parting out individual pieces sorry.",                                             11, "2022-04-30 16:30:00", "auction_3.png", 500, 3);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (4, "Mazda MX-5 Auto", "A great wee car that has treated me well the last 4 years. No issues only selling since I want to get the latest model",                                                                                                          25, "2022-09-30 23:59:59", "auction_4.jpg", 13000, 1);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (5, "I-Phone 18", "A futuristic phone given to me by a time traveller.",                                                                                                                                                                                  1, "2022-12-31 09:45:00", "auction_5.jpg", 1, 5);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (6, "2019 Lamborghini Aventador", "The speediest car around, turns heads wherever I go.\nPerfect condition, has been regularly serviced.",                                                                                                                25, "2021-12-01 22:30:00", "auction_6.jpg", 350000, 4);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (7, "2021 Harley Davidson Iron 883", "Harley Davidson's greatest 2021 entry to the motorbike market. Selling since I'm getting to old to ride now, looking for an owner who will treat her nice.",                                                        6, "2022-12-31 23:59:59", "auction_7.png", 8500, 4);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (8, "Samsung 65\" OLED TV" , "A few minor scuffs on the edges but screen is good, priced to sell.",                                                                                                                                                       14, "2021-12-21 17:00:00", "auction_8.png", 950, 2);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (9, "Nintendo Wii console and 15 games", "Get yourself a great deal with this Wii combo coming with 15 games and all the accessories. Relive the early 2010's.",                                                                                          19, "2023-01-01 23:59:59", "auction_9.jpg", 1, 6);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (10, "Gem encrusted Rolex", "The finest watch you'll find in New Zealand.\nOriginally bought in america in 2001 for 120k, was estimated by professionals to be worth 300k now.",                                                                          12, "2022-12-21 13:45:00", "auction_10.jpg", 200000, 7);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (11, "HP Laptop", "HP Laptop from 2018, not sure what model it is. 8gb ram, intel i5 and 500gb HDD. Screen has a few marks but nothing major.",                                                                                                           2, "2021-02-01 20:00:00", "auction_11.jpg", 500, 8);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (12, "Puffer Jacket", "The warmest jacket I've ever owned.\nDefinitely recommend, need to get rid of it since I lost some weight and doesn't fit anymore (size XL). My loss is your gain.",                                                               22, "2021-02-23 15:00:00", "auction_12.jpg", 25, 1);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (13, "90's Fender Stratocaster", "Age old classic electric guitar, in working order. It has served me well in many gigs. However my collection has got out of hand and my wife is forcing me to downsize\nSee my other auctions for some great guitars.", 13, "2021-05-21 19:45:00", "auction_13.jpg", 2500, 7);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (14, "Custom Electric Guitar", "A custom guitar I received as a promotion on tour. It has served me well in many gigs. However my collection has got out of hand and my wife is forcing me to downsize.\nSee my other auctions for some great guitars.",  13, "2021-05-21 19:45:00", "auction_14.jpg", 1500, 7);
INSERT INTO `auction` (`id`, `title`, `description`, `category_id`, `end_date`, `image_filename`, `reserve`, `seller_id`) VALUES (15, "John Deere Tractor", "Great tractor, runs well.",                                                                                                                                                                                                   8, "2021-07-07 17:00:00", "auction_15.jpg", 5000, 3);

INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (1, 13, 2, 2000, "2021-05-13 11:30:11");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (2, 13, 4, 2200, "2021-05-14 09:58:23");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (3, 13, 2, 2300, "2021-05-14 10:32:43");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (4, 13, 5, 2500, "2021-05-16 19:02:09");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (5, 13, 2, 2550, "2021-05-16 21:15:54");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (6, 13, 5, 2800, "2021-05-17 11:56:01");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (7, 14, 2, 1500, "2021-05-18 22:10:12");

INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (8, 1, 3, 25, "2021-07-02 11:30:03");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (9, 1, 2, 30, "2021-07-02 18:17:25");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (10, 1, 3, 45, "2021-07-02 22:49:56");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (11, 1, 5, 50, "2021-07-03 20:06:23");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (12, 1, 3, 55, "2021-08-11 09:13:11");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (13, 1, 5, 75, "2021-08-11 17:33:25");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (14, 1, 2, 80, "2021-08-12 10:01:40");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (15, 1, 5, 85, "2021-08-12 23:01:02");
INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (16, 1, 3, 100, "2021-08-13 11:31:19");

INSERT INTO `auction_bid` (`id`, `auction_id`, `user_id`, `amount`, `timestamp`) VALUES (17, 3, 1, 100, "2021-09-01 18:12:20");