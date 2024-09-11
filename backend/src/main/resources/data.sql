insert into users(email, enabled, first_name, last_name, nickname, password, username, bio)
values ('rick@gmail.com', true, 'Rick', 'Sanchez', 'rick',
        '$2a$10$mf1nYe0RREDy6dlCEpEL1.LTPCCzjETa40dx1/UNlcLv9ZB6uSiba',
        'ricksanchez', 'Im Rick'),
       ('morty@gmail.com', true, 'Morty', 'Smith', 'morty',
        '$2a$10$mf1nYe0RREDy6dlCEpEL1.LTPCCzjETa40dx1/UNlcLv9ZB6uSiba',
        'mortysmith', 'Oh jeez, Rick'),
       ('summer@gmail.com', true, 'Summer', 'Smith', 'summer',
        '$2a$10$mf1nYe0RREDy6dlCEpEL1.LTPCCzjETa40dx1/UNlcLv9ZB6uSiba',
        'summersmith', 'Ugh, whatever'),
       ('beth@gmail.com', true, 'Beth', 'Smith', 'beth',
        '$2a$10$mf1nYe0RREDy6dlCEpEL1.LTPCCzjETa40dx1/UNlcLv9ZB6uSiba',
        'bethsmith', 'I am a horse surgeon'),
       ('jerry@gmail.com', true, 'Jerry', 'Smith', 'jerry',
        '$2a$10$mf1nYe0RREDy6dlCEpEL1.LTPCCzjETa40dx1/UNlcLv9ZB6uSiba',
        'jerrysmith', 'It’s a fine line between good and bad'),
       ('birdperson@gmail.com', true, 'Bird', 'Person', 'birdperson',
        '$2a$10$mf1nYe0RREDy6dlCEpEL1.LTPCCzjETa40dx1/UNlcLv9ZB6uSiba',
        'birdperson', 'Wubba lubba dub dub'),
       ('squanchy@gmail.com', true, 'Squanchy', '', 'squanchy',
        '$2a$10$mf1nYe0RREDy6dlCEpEL1.LTPCCzjETa40dx1/UNlcLv9ZB6uSiba',
        'squanchy', 'Squanch it up!'),
       ('meeseeks@gmail.com', true, 'Mr', 'Meeseeks', 'meeseeks',
        '$2a$10$mf1nYe0RREDy6dlCEpEL1.LTPCCzjETa40dx1/UNlcLv9ZB6uSiba',
        'mrmeeseeks', 'I’m Mr. Meeseeks, look at me!'),
       ('unity@gmail.com', true, 'Unity', '', 'unity',
        '$2a$10$mf1nYe0RREDy6dlCEpEL1.LTPCCzjETa40dx1/UNlcLv9ZB6uSiba',
        'unity', 'We are Unity'),
       ('noobnoob@gmail.com', true, 'Noob', 'Noob', 'noobnoob',
        '$2a$10$mf1nYe0RREDy6dlCEpEL1.LTPCCzjETa40dx1/UNlcLv9ZB6uSiba',
        'noobnoob', 'Aw, jeez!'),
       ('tammy@gmail.com', true, 'Tammy', 'Gueterman', 'tammy',
        '$2a$10$mf1nYe0RREDy6dlCEpEL1.LTPCCzjETa40dx1/UNlcLv9ZB6uSiba',
        'tammygueterman', 'Long live the Galactic Federation!');

-- User 1 follows User 2, 3, 4
insert into following(user_id, following_id)
values (1, 2),
       (1, 3),
       (1, 4);

-- User 2 follows User 3, 4
insert into following(user_id, following_id)
values (2, 3),
       (2, 4);

-- User 3 follows User 4
insert into following(user_id, following_id)
values (3, 4);


-- User 2 is followed by User 1
insert into followers(user_id, follower_id)
values (2, 1);

-- User 3 is followed by User 1, 2
insert into followers(user_id, follower_id)
values (3, 1),
       (3, 2);

-- User 4 is followed by User 1, 2, 3
insert into followers(user_id, follower_id)
values (4, 1),
       (4, 2),
       (4, 3);


insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Proactive heuristic Graphical User Interface', 'okollach0@guardian.co.uk', true, 'Oriana', 'Kollach',
        'okollach0', '$2a$04$cbbSO/ynaxZV2r7Ez8o.l.aToTbtpWDJ8AOe5jc0d2RYd9mh58BPu', '122-454-7276', 'okollach0');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Up-sized mobile migration', 'hfermoy1@census.gov', true, 'Halsy', 'Fermoy', 'hfermoy1',
        '$2a$04$XgebHH1IEbITLJYSjszTYeYdmphf7Sk1rE1iyVpLXxhGMkzLR0uOm', '925-686-0624', 'hfermoy1');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Universal fresh-thinking encryption', 'fmeriot2@joomla.org', true, 'Fremont', 'Meriot', 'fmeriot2',
        '$2a$04$EO11womM7FQd1Fq6jW3k/uH7YA5H1.4mqx8ahd5/qMNNgTI8eESo6', '294-647-2097', 'fmeriot2');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Adaptive next generation database', 'bbaines3@cam.ac.uk', true, 'Betsey', 'Baines', 'bbaines3',
        '$2a$04$6NMAe77h3VIwAyUbmlzrXOFXffEqoDsP6le4woyxID3/C.61aMuZe', '212-290-5504', 'bbaines3');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Reduced discrete encryption', 'ntirkin4@aboutads.info', true, 'Nanine', 'Tirkin', 'ntirkin4',
        '$2a$04$0Gp/hvlPVP4KIN2va1BLXeB8uMSs6EXewLhuXuJeztrCmESXKP38y', '468-625-1901', 'ntirkin4');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Future-proofed non-volatile capability', 'mgoldring5@friendfeed.com', true, 'Michaela', 'Goldring',
        'mgoldring5', '$2a$04$L9BXFY1SGSuSTQMsH3xAM.vJPOsLdqQ0VxY.uKfswhpdbdmkX993C', '440-555-7976', 'mgoldring5');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Optional directional concept', 'ehighwood6@independent.co.uk', true, 'Eb', 'Highwood', 'ehighwood6',
        '$2a$04$sJv88o7lStj6ObEjTDEo6eazh3crIViSeoTGm2DAMgRGF9nEfjxT.', '765-760-9102', 'ehighwood6');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Enterprise-wide modular application', 'cfoley7@cam.ac.uk', true, 'Colly', 'Foley', 'cfoley7',
        '$2a$04$HcTi9y0xkaZhbGANVmFf0utDIgjqEXagAjXeT0FoVGbveGsvyCJAy', '591-147-6602', 'cfoley7');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Multi-lateral uniform core', 'jskelding8@zimbio.com', true, 'Jody', 'Skelding', 'jskelding8',
        '$2a$04$1gDHQgYnWSueQ0RXFsSAKOi.6mQx4RkhmLaQQEu3MLDwZkT9U0zF2', '248-757-2108', 'jskelding8');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Function-based real-time hierarchy', 'rvanleeuwen9@about.me', true, 'Richmond', 'Van Leeuwen', 'rvanleeuwen9',
        '$2a$04$ti8zG2nfTMvplIHVh1IfiuXKYlX4IOl1Fr6u2ycem1km.GPM3Gi4e', '576-193-3136', 'rvanleeuwen9');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Reverse-engineered bi-directional open system', 'ccawderya@goo.gl', true, 'Calida', 'Cawdery', 'ccawderya',
        '$2a$04$7Scy/yeR1hPnE/u3/Wp8gO2.66oEVVE9SVu9PWvx3wOWtOQa63Chu', '374-776-6250', 'ccawderya');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Decentralized homogeneous data-warehouse', 'rgrigorushkinb@mysql.com', true, 'Roshelle', 'Grigorushkin',
        'rgrigorushkinb', '$2a$04$mgQZ4EVZN10fiIy7kPuckusNG7d/qQTmjMvPuuu37lowFWmQmHToi', '761-999-6845',
        'rgrigorushkinb');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Multi-tiered 3rd generation algorithm', 'wdancyc@hhs.gov', true, 'Winslow', 'Dancy', 'wdancyc',
        '$2a$04$2/zw8meI8y4aMsnOVpeRROUFapVFlO.khaU7aCR32w2pzBOCqdcEi', '656-498-9627', 'wdancyc');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Persistent clear-thinking knowledge base', 'awadmored@unicef.org', true, 'Arturo', 'Wadmore', 'awadmored',
        '$2a$04$7LZh/wB3rBmppDsvJazv.evifbnrEPrlRPB08MjUoEsulezuLiKFW', '645-244-6168', 'awadmored');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Vision-oriented multi-tasking functionalities', 'mozintseve@theguardian.com', true, 'Malissia', 'Ozintsev',
        'mozintseve', '$2a$04$YbHSKFKwfTCn95Yjirq88OXjtpRoPG4kMsp3n.AGwSf/4bkQlsIaG', '641-818-4112', 'mozintseve');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Customizable human-resource help-desk', 'jmcgifff@engadget.com', true, 'Jaclyn', 'McGiff', 'jmcgifff',
        '$2a$04$xgAXSzlaQrD86Jgn30jOjuTPDLDc0V10m0zt5YLs6q56bothA5pLu', '952-253-4407', 'jmcgifff');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Upgradable 24 hour help-desk', 'rmarstersg@123-reg.co.uk', true, 'Rodrick', 'Marsters', 'rmarstersg',
        '$2a$04$T4N2xMg7iKX27otiEx9Wq.UaHvOeNORkj3zeGwhtuhX7/Q4ZBGJKS', '125-373-9274', 'rmarstersg');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Centralized grid-enabled implementation', 'ctockh@fema.gov', true, 'Chrysler', 'Tock', 'ctockh',
        '$2a$04$tQQEGzEIVtSxEErTz./GqO2k665gR59sNEkymSxzfVGkjdgzaJZ4G', '782-414-9141', 'ctockh');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Polarised mobile groupware', 'ccrouxi@fda.gov', true, 'Cass', 'Croux', 'ccrouxi',
        '$2a$04$uD2q/3hr/6BOE0oDwN2znOLI.wW/27vElaspbkIi/rHM0GTlQbGxW', '590-786-5599', 'ccrouxi');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('User-friendly secondary hierarchy', 'tugolottij@mapy.cz', true, 'Thaddeus', 'Ugolotti', 'tugolottij',
        '$2a$04$d1eL4/epuhHMMG1BersOLuV3bLtrFce9Rg7pbiYlQW9MTRNEF3ahm', '102-183-7045', 'tugolottij');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Adaptive heuristic system engine', 'measthopek@smugmug.com', true, 'Malcolm', 'Easthope', 'measthopek',
        '$2a$04$1j1S/684TWx2ZdSYHALnf.hAPYOrAAgyppqTn6GTmCuUiJCKRuirS', '277-540-5447', 'measthopek');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Organic tangible support', 'hgregsonl@japanpost.jp', true, 'Helen', 'Gregson', 'hgregsonl',
        '$2a$04$Jcs6vyw.KMMdjcFW2YFwxO21wZlkrqXTj/21nbHZHbwVWNdIkhDbG', '790-841-4994', 'hgregsonl');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Streamlined actuating core', 'zyanceym@homestead.com', true, 'Zebulon', 'Yancey', 'zyanceym',
        '$2a$04$RxNICMcsBrbECknzvtvGCO4QIOLlixTjtQdRX2EESizmIE84TNfBG', '655-863-6343', 'zyanceym');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Down-sized neutral monitoring', 'srockhalln@wunderground.com', true, 'Sabina', 'Rockhall', 'srockhalln',
        '$2a$04$Y6Etfh/h7kI5c8aYvlInHOjuojPJCstEEk1hjFtF5a4F0UnlzFYgq', '888-358-0407', 'srockhalln');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Managed object-oriented moderator', 'azimeko@qq.com', true, 'Ailsun', 'Zimek', 'azimeko',
        '$2a$04$eV0qGWreUtc84G8oIlW7Cu7APJhNCySYpm473VkfuvR2K2O.Y2NMy', '915-781-5896', 'azimeko');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Polarised bi-directional success', 'amaldenp@google.com.au', true, 'Abe', 'Malden', 'amaldenp',
        '$2a$04$oGkuSJSI3ZYX45M6ENrTcegZF20lqa46a3cQRqwHIVe1UQYmYDJMq', '288-866-5767', 'amaldenp');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Up-sized homogeneous projection', 'kgalbraethq@wikispaces.com', true, 'Kirk', 'Galbraeth', 'kgalbraethq',
        '$2a$04$LdpkyfYORrSzEAjQKzXcvuWDIl/Yw68E0YwTTu2Jf8IF.OGUUqg7O', '349-749-5752', 'kgalbraethq');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Team-oriented zero administration alliance', 'ahawkswoodr@scientificamerican.com', true, 'Aeriela',
        'Hawkswood', 'ahawkswoodr', '$2a$04$jikbAl5s6J7bWP2tjwNi7emp3pxHyS0PI/7F2ONOMspRm9nblCqkG', '452-409-0702',
        'ahawkswoodr');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Decentralized tertiary open system', 'zmanleys@w3.org', true, 'Zora', 'Manley', 'zmanleys',
        '$2a$04$3Jw7.yBlEQm5gjc6bvbW9OrppXgTwesQ/iDZDmuWoO2XDMYS/MZmu', '115-778-6501', 'zmanleys');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Stand-alone zero tolerance capacity', 'kmolant@indiatimes.com', true, 'Koren', 'Molan', 'kmolant',
        '$2a$04$2pRsxgCAhk.WJjUw.trGU.jiTyrWH/JbgKyIXf2BQdiLerzzZIakO', '795-925-4061', 'kmolant');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Ameliorated bi-directional process improvement', 'acockshttu@intel.com', true, 'Agretha', 'Cockshtt',
        'acockshttu', '$2a$04$Vgesw0aunNHo6qHl5azqMuljk14C9DtRAzFgMRM.EyuKQ7/WAZA7q', '152-649-9322', 'acockshttu');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Front-line encompassing paradigm', 'efermerv@examiner.com', true, 'Emanuel', 'Fermer', 'efermerv',
        '$2a$04$4ZbzuNK3ECHJNTGaL0zAd.IJQmu/yZMQ2GTbpGUbwKWI57FkmZvQO', '584-758-9105', 'efermerv');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Grass-roots fresh-thinking Graphical User Interface', 'pborlessw@w3.org', true, 'Pansie', 'Borless',
        'pborlessw', '$2a$04$g0tlZnvFulApoU.R6APGWO6ke5WAe/oeFV1Z0GvcBnrHEeRgNpTLi', '422-761-5992', 'pborlessw');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Balanced logistical alliance', 'dveartx@cpanel.net', true, 'Damiano', 'Veart', 'dveartx',
        '$2a$04$CqjaxoLxMNqm2INc4OsGK.iaCENVTd3xEVs2eQ3ofXysjZbuzTY/6', '972-538-8634', 'dveartx');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Reverse-engineered full-range knowledge base', 'szanicchiy@who.int', true, 'Siegfried', 'Zanicchi',
        'szanicchiy', '$2a$04$rLQDDhWIo5O8FsTeiZM8qu1ZrYlOxbVKuwwrqpAqxLYW8TZtlm6b2', '429-228-1302', 'szanicchiy');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Open-architected mobile throughput', 'mwythez@google.com', true, 'Magda', 'Wythe', 'mwythez',
        '$2a$04$ff/pGw/fcbqXv2NfdEn.7.OE2mgwvrm/PZkjFfvj/VnjyvoW7ag3e', '580-239-6693', 'mwythez');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Diverse heuristic portal', 'mthomas10@last.fm', true, 'Magdalene', 'Thomas', 'mthomas10',
        '$2a$04$OUGllrHmTjrPxhAzd/MQvOrgRMqbW9QUTEg6iJj7M1bKsb2.4twZG', '234-178-4928', 'mthomas10');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Inverse intermediate Graphical User Interface', 'nguillon11@discuz.net', true, 'Nobe', 'Guillon', 'nguillon11',
        '$2a$04$jdnhUICA6kwd.O25fVORBOeTF43fR6ehcP6tkxiEOvD8lN9urRpYC', '910-943-4659', 'nguillon11');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Decentralized global budgetary management', 'dpridham12@bravesites.com', true, 'Dorry', 'Pridham',
        'dpridham12', '$2a$04$DbGEK0z0NKQyh3PFx0Y9culaJqsyZ.2bSMoxlBdifHfe2P6ajmctu', '391-209-8012', 'dpridham12');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Reduced fault-tolerant installation', 'hhinder13@huffingtonpost.com', true, 'Hartley', 'Hinder', 'hhinder13',
        '$2a$04$EU0m84XiLZxPODLelDHlAODNshJcNeEFZCyAhKPhklzHYk.igGIsK', '656-199-9377', 'hhinder13');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Proactive secondary orchestration', 'rtippin14@reverbnation.com', true, 'Rici', 'Tippin', 'rtippin14',
        '$2a$04$1iSk6lwemkTNEeCWtC47bOAWIkVqNi0kMQ47DWpQj2jxnci9vXaLO', '858-723-6837', 'rtippin14');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Open-architected next generation help-desk', 'ggillon15@si.edu', true, 'Gweneth', 'Gillon', 'ggillon15',
        '$2a$04$V8bSUBk3OCU5li68HfSKEO3Ix45AmIAwMHIWpbveH9n.Am79.zEdu', '128-290-4512', 'ggillon15');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Reactive well-modulated function', 'kdelgaty16@fastcompany.com', true, 'Kermy', 'Delgaty', 'kdelgaty16',
        '$2a$04$85pHU51aHpR25ll6jXWAgOmZTROHB6QYICUsCCMuargaItCUD8DVq', '446-207-4732', 'kdelgaty16');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Innovative contextually-based complexity', 'amottram17@narod.ru', true, 'Analise', 'Mottram', 'amottram17',
        '$2a$04$7Vcszh98jNOVG/YDaxLsPe9AwQnq4yYD8oe5UtD7wPFzRKeYZfZaq', '362-716-0633', 'amottram17');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Optimized homogeneous system engine', 'ghitzmann18@phoca.cz', true, 'Gennifer', 'Hitzmann', 'ghitzmann18',
        '$2a$04$ZCOc9AoZHYr8w/PFfMj0s.cz/Iutj/T2QEPXytskiAR7PBnTLK6ky', '860-989-5171', 'ghitzmann18');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Public-key reciprocal service-desk', 'sbrand19@netlog.com', true, 'Sharleen', 'Brand', 'sbrand19',
        '$2a$04$xzCItv4LIDIszwjF/cuqlu.1yQi4g37miPbRLjhuH7CBcye58itWO', '592-805-4979', 'sbrand19');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Switchable clear-thinking projection', 'plowne1a@xrea.com', true, 'Philippe', 'Lowne', 'plowne1a',
        '$2a$04$YrYSwzDajIg2.F9.oV18ae3lnX/Fr.M.vWMqgEy1oW52o/yvPKkUu', '878-450-1999', 'plowne1a');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Diverse scalable hardware', 'ksprade1b@nhs.uk', true, 'Ketti', 'Sprade', 'ksprade1b',
        '$2a$04$3Fi8Z3MoNIVxSb9mjMEMeeToJpsk3vJpH8/llinrEcsAFWSFS3sBq', '692-148-1756', 'ksprade1b');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Customer-focused didactic synergy', 'dasprey1c@odnoklassniki.ru', true, 'Diane-marie', 'Asprey', 'dasprey1c',
        '$2a$04$w1gRiaBdHD6zjbmK4qBpT.dEJ2Jw5ne8d6nod58H/CflGw1RKSSrq', '306-995-1666', 'dasprey1c');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Advanced full-range parallelism', 'tollier1d@usnews.com', true, 'Thoma', 'Ollier', 'tollier1d',
        '$2a$04$NfzRAd5ZGuvLHqIb7L3BverIC3zK37pdw78c548gi2Aox4vBW6DWO', '252-925-9160', 'tollier1d');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Fully-configurable didactic complexity', 'nsherringham1e@trellian.com', true, 'Naomi', 'Sherringham',
        'nsherringham1e', '$2a$04$m89fJOTfFq.oE4ixd2iFd.KsMdpioSMvoCm6C6v4s5bx5DDxNeVR6', '606-844-9705',
        'nsherringham1e');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Enhanced leading edge knowledge user', 'mkenninghan1f@time.com', true, 'Marietta', 'Kenninghan',
        'mkenninghan1f', '$2a$04$dLF19xfdONlufOtIm948AOZnNAFMeMIwvOVFn8ldAwE8dput74rs6', '437-833-3681',
        'mkenninghan1f');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Ameliorated composite analyzer', 'ssowersby1g@livejournal.com', true, 'Suki', 'Sowersby', 'ssowersby1g',
        '$2a$04$tiibGfQdSlQ5MQSRul9Epe2yLZaj8ePIDIZ1/l6L2fRTRL.fjdCni', '432-114-2923', 'ssowersby1g');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Function-based cohesive orchestration', 'ngreen1h@alexa.com', true, 'Nata', 'Green', 'ngreen1h',
        '$2a$04$89ekgvqS1nxLDuG.cdHWb.LCJXO2GAVIPSv6a5NLvXU2eEBB.SjXa', '261-188-6076', 'ngreen1h');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Multi-lateral solution-oriented parallelism', 'atilford1i@princeton.edu', true, 'Axe', 'Tilford', 'atilford1i',
        '$2a$04$mAyviUqH/FyMhKxOmSCsJeX83uxsIBGGA4uSvNS6OEC9aBAB0ig9e', '543-981-1925', 'atilford1i');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Secured next generation adapter', 'rmcclune1j@freewebs.com', true, 'Rooney', 'McClune', 'rmcclune1j',
        '$2a$04$NVlB1VjrATPsiu3n99lnmeVnTHOzURwCB9haeybCSW3UnaWL4Awi6', '872-125-8230', 'rmcclune1j');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('De-engineered global concept', 'syourell1k@princeton.edu', true, 'Sadye', 'Yourell', 'syourell1k',
        '$2a$04$rYX9XdyU.Wwh.P9VUs14I.5ufrHCk6wV6q32r8B7itKT2bOLgam8S', '251-813-9773', 'syourell1k');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Open-source national success', 'fwhiffin1l@yelp.com', true, 'Florida', 'Whiffin', 'fwhiffin1l',
        '$2a$04$FdPCKm7rZ6cMU4T1Wx8Kq..pt8vf7RAhygaL1D1wBWpuHpRntkxha', '937-670-2982', 'fwhiffin1l');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Horizontal mission-critical model', 'scordelet1m@github.io', true, 'Sarine', 'Cordelet', 'scordelet1m',
        '$2a$04$RSrbAxq8XBFYBDoqsk72qeKIaUpPqVwqZgRRwo9AG9EFCJZlCoJ4O', '328-649-4343', 'scordelet1m');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Proactive executive hub', 'ggherardesci1n@ucla.edu', true, 'Gloriana', 'Gherardesci', 'ggherardesci1n',
        '$2a$04$V1XUFGi5cVJEkBpMWivQ5u.1YFghhk7QF9Ha8MLQPkRY0tDpQ92gW', '896-496-6753', 'ggherardesci1n');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Multi-tiered mobile knowledge base', 'esainsbury1o@paginegialle.it', true, 'Ellswerth', 'Sainsbury',
        'esainsbury1o', '$2a$04$.i0HrtMSwCI0x4tnkNjtve41YMZc4o0sVLVt6i8mGmfb8FU4NVCoC', '673-268-0226', 'esainsbury1o');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Fundamental stable alliance', 'hnecrews1p@taobao.com', true, 'Harrietta', 'Necrews', 'hnecrews1p',
        '$2a$04$U.MNClinxuAcs4SE3XdLH..CW/YJxqz4AtI7R0HjMQVQUM1PEZNaa', '481-773-9656', 'hnecrews1p');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Assimilated attitude-oriented parallelism', 'twhitfeld1q@list-manage.com', true, 'Terra', 'Whitfeld',
        'twhitfeld1q', '$2a$04$cwhSWe8K7Emj1Zv9jbiMNuO1cU0vsgCwPg3JB7/CtcJbULtbtiVQC', '339-699-7635', 'twhitfeld1q');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Persistent clear-thinking access', 'lallmark1r@tiny.cc', true, 'Lorain', 'Allmark', 'lallmark1r',
        '$2a$04$RZrv6fnX/j3n56YJyyMCWuhK96x40yg3vAbZsxB0uU2Bq32sTOGuK', '739-171-7879', 'lallmark1r');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Cloned 3rd generation extranet', 'ksherrell1s@bloglovin.com', true, 'Kaia', 'Sherrell', 'ksherrell1s',
        '$2a$04$8CGWGdYzbElfY4YjHZcrcO4I2F23l.2/IGRUOiq28WszNmQTCet66', '419-171-2688', 'ksherrell1s');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Extended interactive core', 'iwilber1t@elpais.com', true, 'Isadore', 'Wilber', 'iwilber1t',
        '$2a$04$h7HfaSZCo534XUO7nvmT4emwmYIQyo5wlk5syYBJ8SbHIhyd7odma', '855-981-9719', 'iwilber1t');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Progressive bandwidth-monitored data-warehouse', 'ksowood1u@wiley.com', true, 'Kevina', 'Sowood', 'ksowood1u',
        '$2a$04$Q18OGJptquchw4NtkHHKjei2uvwDpof7u62RLfKBSohm8CBliNDY.', '892-584-5299', 'ksowood1u');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Reverse-engineered grid-enabled infrastructure', 'gdunstone1v@abc.net.au', true, 'Goldy', 'Dunstone',
        'gdunstone1v', '$2a$04$6MQ/K9xj5tIQr7fKdOMXuOpdf/4zG92vC7jr8xEj9mi70lv/FD9pC', '390-752-1633', 'gdunstone1v');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Up-sized stable complexity', 'npraten1w@auda.org.au', true, 'Nora', 'Praten', 'npraten1w',
        '$2a$04$uakc6IEuv7NAzsmiaGTVA.vRux9cB5pJZRcPKBaXCJ9zCZcUx9Tj.', '457-162-4894', 'npraten1w');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Reverse-engineered context-sensitive artificial intelligence', 'awhannel1x@yelp.com', true, 'Amil', 'Whannel',
        'awhannel1x', '$2a$04$L1zg67B6de7ujNzRULLSVuec3PnLt6tF71yCBN217keBHTa87wOaa', '985-840-3766', 'awhannel1x');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Integrated neutral focus group', 'vkingsley1y@house.gov', true, 'Vidovik', 'Kingsley', 'vkingsley1y',
        '$2a$04$MMS0ezFY8fd3ik1CXzeq9uND723TGshDwjwFt80GL87SCUnFURnPi', '694-357-7919', 'vkingsley1y');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Optional mission-critical groupware', 'lquittonden1z@nyu.edu', true, 'Laraine', 'Quittonden', 'lquittonden1z',
        '$2a$04$rTaIigUbF1WhU/8VXRO/t.4yNwEBlvhVFs6KCIlrJvyjxsYjHhGZu', '200-654-1435', 'lquittonden1z');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Pre-emptive neutral neural-net', 'fvanyashkin20@nymag.com', true, 'Frasquito', 'Vanyashkin', 'fvanyashkin20',
        '$2a$04$SXH8WSf5bn1Ajs3wXQYxhOVWgcfhKfYeUJGUVxyzflKECUVdFjIzS', '857-356-4125', 'fvanyashkin20');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Horizontal bifurcated groupware', 'lhaughian21@wunderground.com', true, 'Leanora', 'Haughian', 'lhaughian21',
        '$2a$04$oZEup9ssZP0jmwIdMgSDF.FrR0SuNONs2JB/93IplL21apmgx6jBC', '707-995-3228', 'lhaughian21');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Multi-lateral tertiary collaboration', 'mpaley22@cmu.edu', true, 'Merwin', 'Paley', 'mpaley22',
        '$2a$04$uvX.JFlHBUVXnwBj6N6vh.mmVkVjEMdwqCUvsnSuy.Y6vT7ZG/3Fm', '984-321-9180', 'mpaley22');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Virtual even-keeled emulation', 'bwoodruff23@slate.com', true, 'Bettye', 'Woodruff', 'bwoodruff23',
        '$2a$04$pJGP2P14M1p12Tivkcp6geCf8O7.riN.FFUde8bmKy/vaHUWStQR.', '860-888-1118', 'bwoodruff23');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Decentralized national model', 'vbeevens24@sun.com', true, 'Valeda', 'Beevens', 'vbeevens24',
        '$2a$04$v/fA3g2CXgTFmjMZAsWqBOpSVtzyhpu2Fmh/LgBR6mi2L.AMvUJsW', '962-418-1920', 'vbeevens24');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Devolved attitude-oriented groupware', 'hhumberstone25@squidoo.com', true, 'Herta', 'Humberstone',
        'hhumberstone25', '$2a$04$uY3ZBlpAIOyPzuc2RFlvgOvxidsdW.Mbf9CkKmuy.2Tt0CETcznTK', '901-230-3867',
        'hhumberstone25');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Public-key intermediate neural-net', 'akiggel26@smh.com.au', true, 'Addia', 'Kiggel', 'akiggel26',
        '$2a$04$en1TOq62SV06YHjgMli5rudgTkCuIx1Jc5tRo5J3jQ9R9EaPw2WxC', '961-643-6631', 'akiggel26');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Re-engineered mission-critical secured line', 'plundy27@microsoft.com', true, 'Pietra', 'Lundy', 'plundy27',
        '$2a$04$I7nV80likqSf9r0RnMtUMejDHN6UtPhjICJxdvYmnTNwbOxGUxNV.', '965-555-3568', 'plundy27');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Vision-oriented user-facing extranet', 'dcordoba28@discovery.com', true, 'Donella', 'Cordoba', 'dcordoba28',
        '$2a$04$KqJo7CRgSV1itvH2OI6dgO0ucrbzkThk7gG2xbn2Sy8N3D3ZryuSe', '338-277-2203', 'dcordoba28');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Adaptive exuding info-mediaries', 'dalger29@unc.edu', true, 'Daphna', 'Alger', 'dalger29',
        '$2a$04$1dotFdidTHTPDQQJD3EUMOg18bDudUp9dNodE3GI1j70IezOHsKRS', '763-436-8417', 'dalger29');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Integrated zero administration firmware', 'ealdie2a@hatena.ne.jp', true, 'Ezekiel', 'Aldie', 'ealdie2a',
        '$2a$04$AmhgjqsMuiRsLlv8ELYs/ugh1R84UitVbykSXiMZGS20DPwDe91R6', '882-302-0658', 'ealdie2a');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Fully-configurable object-oriented matrix', 'gbrown2b@arstechnica.com', true, 'Germaine', 'Brown', 'gbrown2b',
        '$2a$04$QqmSjlcOdtcplp6lxZzhLOFIJd.BCVduzmLpvXyTOrYWgmWHksOQS', '139-885-9439', 'gbrown2b');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Face to face intermediate system engine', 'vtrevascus2c@dagondesign.com', true, 'Virginie', 'Trevascus',
        'vtrevascus2c', '$2a$04$DapWzAmqW3Ucpk8rO1dxZO7.R7quBg3UdTQ0S9Nac3tXvEDhtPGgO', '664-497-1383', 'vtrevascus2c');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Ameliorated bottom-line matrices', 'cwadeling2d@1und1.de', true, 'Chrystel', 'Wadeling', 'cwadeling2d',
        '$2a$04$QIplmUO51lMdccVFIQngI.Pg1eKeCK0ocp.Mz36Odb4B9VI2wZ5AO', '974-506-6813', 'cwadeling2d');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Diverse static knowledge user', 'bales2e@flavors.me', true, 'Berri', 'Ales0', 'bales2e',
        '$2a$04$8M.SkIjKUROoY6pEH0wca.OgU/.ntZTASdzyB8brMhQeihYxezkP.', '821-266-1601', 'bales2e');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Re-engineered global framework', 'sserginson2f@narod.ru', true, 'Salem', 'Serginson', 'sserginson2f',
        '$2a$04$82YsSBrR.WprEC8HpaX/3.iKXaYsVy8tT0taQ4H6pzjVc1ngXq.ZC', '708-375-2055', 'sserginson2f');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Stand-alone 5th generation protocol', 'wsesser2g@homestead.com', true, 'Walliw', 'Sesser', 'wsesser2g',
        '$2a$04$EugRwCB/1VWde4WV9ZfmlORAZymxf8Ng0yDdkJ4Sb/5chPWjrg3T.', '190-797-3844', 'wsesser2g');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Open-source bottom-line process improvement', 'rkohlerman2h@simplemachines.org', true, 'Rickey', 'Kohlerman',
        'rkohlerman2h', '$2a$04$PFc0r3RXLHX3hOf1792SKujPIp2FnTn1TFzYfecPYC/20LeTUWGE6', '301-556-4950', 'rkohlerman2h');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Proactive context-sensitive matrices', 'boakshott2i@google.it', true, 'Barnett', 'Oakshott', 'boakshott2i',
        '$2a$04$zK9ud66HZVwH/llgXF3xZec.DhpKjUZF2.lImob7RLxmv.b13ogwC', '267-725-4969', 'boakshott2i');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Balanced coherent migration', 'kandrolli2j@yahoo.com', true, 'Kip', 'Androlli', 'kandrolli2j',
        '$2a$04$MHlPw2x3cO6QyABYA5zzF.4iZORFqxWohLc3nTjJkn5hl.DFBtxqq', '166-924-3214', 'kandrolli2j');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Ergonomic intangible leverage', 'tstork2k@who.int', true, 'Tillie', 'Stork', 'tstork2k',
        '$2a$04$4y88py8AOBmhBAWRTKQZHe3GFfO4mgF8V/d4kwktBQRGz56YXQVNW', '850-200-4481', 'tstork2k');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Stand-alone holistic local area network', 'sswindell2l@opensource.org', true, 'Selia', 'Swindell',
        'sswindell2l', '$2a$04$.jlAdl1bDQ55GL674G6PYOo1Hn6qDoe2hoMFq2D.nGSHO1KxfgYSa', '422-976-3431', 'sswindell2l');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Customizable high-level instruction set', 'kmcgragh2m@angelfire.com', true, 'Kaye', 'McGragh', 'kmcgragh2m',
        '$2a$04$rQFAUSPqP6dYvV6//xL9a.yfya/mBb.1mIG1AJzTlRk6vSQj0eV9.', '623-381-7357', 'kmcgragh2m');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Reactive client-driven emulation', 'aattenborough2n@indiegogo.com', true, 'Ag', 'Attenborough',
        'aattenborough2n', '$2a$04$BY6glZTFSVOP9pSxwjGOxO384tjUJxI8D.gL2BC3mjUMFnrCvZ042', '724-440-6810',
        'aattenborough2n');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Face to face neutral project', 'bvile2o@stumbleupon.com', true, 'Brand', 'Vile', 'bvile2o',
        '$2a$04$imY7sSPqvU01.coN.vOpi.P7ANwRJS5PkeWiiWHslIvAveNbsvFWS', '198-629-0256', 'bvile2o');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Cloned cohesive software', 'wskechley2p@pen.io', true, 'Wallis', 'Skechley', 'wskechley2p',
        '$2a$04$Yhj3/CuoPWCQMcqVmjCG9OtnRFcvqF.qo31zzkMjHPPBfQB0Td5Mu', '288-623-8225', 'wskechley2p');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Multi-tiered exuding core', 'dstandage2q@jigsy.com', true, 'Dwayne', 'Standage', 'dstandage2q',
        '$2a$04$1BMzpKt3SQeOFXBV55FAzeMBATR45ghBTvKPTopPS70MOfpNZMepG', '221-202-8098', 'dstandage2q');
insert into users (bio, email, enabled, first_name, last_name, nickname, password, phone, username)
values ('Face to face 4th generation contingency', 'glindenfeld2r@macromedia.com', true, 'Grenville', 'Lindenfeld',
        'glindenfeld2r', '$2a$04$haidOkyZgu2fC2STxUZ45.vzk1UjGIklCk1vXZm7qpeRp0HFAu8Du', '312-488-9222',
        'glindenfeld2r');

-- followers:
insert into followers (user_id, follower_id)
values (78, 10);
insert into followers (user_id, follower_id)
values (61, 44);
insert into followers (user_id, follower_id)
values (106, 39);
insert into followers (user_id, follower_id)
values (89, 47);
insert into followers (user_id, follower_id)
values (27, 67);
insert into followers (user_id, follower_id)
values (46, 68);
insert into followers (user_id, follower_id)
values (20, 103);
insert into followers (user_id, follower_id)
values (15, 28);
insert into followers (user_id, follower_id)
values (49, 109);
insert into followers (user_id, follower_id)
values (6, 34);
insert into followers (user_id, follower_id)
values (64, 107);
insert into followers (user_id, follower_id)
values (66, 53);
insert into followers (user_id, follower_id)
values (104, 47);
insert into followers (user_id, follower_id)
values (55, 3);
insert into followers (user_id, follower_id)
values (15, 41);
insert into followers (user_id, follower_id)
values (91, 31);
insert into followers (user_id, follower_id)
values (5, 94);
insert into followers (user_id, follower_id)
values (103, 4);
insert into followers (user_id, follower_id)
values (54, 110);
insert into followers (user_id, follower_id)
values (64, 76);
insert into followers (user_id, follower_id)
values (19, 107);
insert into followers (user_id, follower_id)
values (102, 51);
insert into followers (user_id, follower_id)
values (51, 10);
insert into followers (user_id, follower_id)
values (68, 32);
insert into followers (user_id, follower_id)
values (104, 25);
insert into followers (user_id, follower_id)
values (41, 110);
insert into followers (user_id, follower_id)
values (95, 10);
insert into followers (user_id, follower_id)
values (52, 19);
insert into followers (user_id, follower_id)
values (30, 56);
insert into followers (user_id, follower_id)
values (48, 35);
insert into followers (user_id, follower_id)
values (98, 40);
insert into followers (user_id, follower_id)
values (73, 94);
insert into followers (user_id, follower_id)
values (8, 17);
insert into followers (user_id, follower_id)
values (102, 44);
insert into followers (user_id, follower_id)
values (44, 80);
insert into followers (user_id, follower_id)
values (21, 70);
insert into followers (user_id, follower_id)
values (99, 67);
insert into followers (user_id, follower_id)
values (15, 84);
insert into followers (user_id, follower_id)
values (56, 97);
insert into followers (user_id, follower_id)
values (98, 1);
insert into followers (user_id, follower_id)
values (33, 45);
insert into followers (user_id, follower_id)
values (101, 61);
insert into followers (user_id, follower_id)
values (110, 40);
insert into followers (user_id, follower_id)
values (72, 55);
insert into followers (user_id, follower_id)
values (96, 77);
insert into followers (user_id, follower_id)
values (11, 17);
insert into followers (user_id, follower_id)
values (57, 13);
insert into followers (user_id, follower_id)
values (83, 51);
insert into followers (user_id, follower_id)
values (30, 14);
insert into followers (user_id, follower_id)
values (103, 38);
insert into followers (user_id, follower_id)
values (15, 18);
insert into followers (user_id, follower_id)
values (3, 15);
insert into followers (user_id, follower_id)
values (19, 34);
insert into followers (user_id, follower_id)
values (13, 88);
insert into followers (user_id, follower_id)
values (23, 87);
insert into followers (user_id, follower_id)
values (102, 100);
insert into followers (user_id, follower_id)
values (89, 5);
insert into followers (user_id, follower_id)
values (104, 99);
insert into followers (user_id, follower_id)
values (81, 55);
insert into followers (user_id, follower_id)
values (44, 59);
insert into followers (user_id, follower_id)
values (76, 105);
insert into followers (user_id, follower_id)
values (74, 59);
insert into followers (user_id, follower_id)
values (55, 75);
insert into followers (user_id, follower_id)
values (43, 8);
insert into followers (user_id, follower_id)
values (52, 77);
insert into followers (user_id, follower_id)
values (8, 26);
insert into followers (user_id, follower_id)
values (39, 41);
insert into followers (user_id, follower_id)
values (49, 66);
insert into followers (user_id, follower_id)
values (59, 25);
insert into followers (user_id, follower_id)
values (106, 8);
insert into followers (user_id, follower_id)
values (24, 102);
insert into followers (user_id, follower_id)
values (8, 13);
insert into followers (user_id, follower_id)
values (36, 99);
insert into followers (user_id, follower_id)
values (50, 8);
insert into followers (user_id, follower_id)
values (25, 24);
insert into followers (user_id, follower_id)
values (81, 51);
insert into followers (user_id, follower_id)
values (1, 48);
insert into followers (user_id, follower_id)
values (50, 19);
insert into followers (user_id, follower_id)
values (32, 21);
insert into followers (user_id, follower_id)
values (95, 4);
insert into followers (user_id, follower_id)
values (25, 95);
insert into followers (user_id, follower_id)
values (79, 11);
insert into followers (user_id, follower_id)
values (49, 107);
insert into followers (user_id, follower_id)
values (47, 77);
insert into followers (user_id, follower_id)
values (86, 5);
insert into followers (user_id, follower_id)
values (9, 47);
insert into followers (user_id, follower_id)
values (4, 14);
insert into followers (user_id, follower_id)
values (86, 52);
insert into followers (user_id, follower_id)
values (42, 32);
insert into followers (user_id, follower_id)
values (67, 82);
insert into followers (user_id, follower_id)
values (36, 28);
insert into followers (user_id, follower_id)
values (7, 9);
insert into followers (user_id, follower_id)
values (82, 107);
insert into followers (user_id, follower_id)
values (28, 10);
insert into followers (user_id, follower_id)
values (68, 7);
insert into followers (user_id, follower_id)
values (105, 6);
insert into followers (user_id, follower_id)
values (23, 3);
insert into followers (user_id, follower_id)
values (101, 54);
insert into followers (user_id, follower_id)
values (92, 59);
insert into followers (user_id, follower_id)
values (53, 82);

-- following :
insert into following (user_id, following_id)
values (73, 43);
insert into following (user_id, following_id)
values (46, 26);
insert into following (user_id, following_id)
values (28, 60);
insert into following (user_id, following_id)
values (10, 14);
insert into following (user_id, following_id)
values (89, 46);
insert into following (user_id, following_id)
values (105, 44);
insert into following (user_id, following_id)
values (107, 74);
insert into following (user_id, following_id)
values (46, 95);
insert into following (user_id, following_id)
values (68, 93);
insert into following (user_id, following_id)
values (64, 66);
insert into following (user_id, following_id)
values (32, 4);
insert into following (user_id, following_id)
values (52, 97);
insert into following (user_id, following_id)
values (48, 57);
insert into following (user_id, following_id)
values (25, 25);
insert into following (user_id, following_id)
values (89, 95);
insert into following (user_id, following_id)
values (68, 5);
insert into following (user_id, following_id)
values (23, 15);
insert into following (user_id, following_id)
values (104, 38);
insert into following (user_id, following_id)
values (99, 33);
insert into following (user_id, following_id)
values (80, 31);
insert into following (user_id, following_id)
values (57, 13);
insert into following (user_id, following_id)
values (99, 67);
insert into following (user_id, following_id)
values (34, 105);
insert into following (user_id, following_id)
values (43, 56);
insert into following (user_id, following_id)
values (3, 85);
insert into following (user_id, following_id)
values (80, 3);
insert into following (user_id, following_id)
values (15, 84);
insert into following (user_id, following_id)
values (73, 92);
insert into following (user_id, following_id)
values (97, 62);
insert into following (user_id, following_id)
values (42, 95);
insert into following (user_id, following_id)
values (7, 102);
insert into following (user_id, following_id)
values (61, 25);
insert into following (user_id, following_id)
values (19, 1);
insert into following (user_id, following_id)
values (35, 17);
insert into following (user_id, following_id)
values (23, 8);
insert into following (user_id, following_id)
values (108, 42);
insert into following (user_id, following_id)
values (14, 48);
insert into following (user_id, following_id)
values (58, 6);
insert into following (user_id, following_id)
values (103, 28);
insert into following (user_id, following_id)
values (81, 8);
insert into following (user_id, following_id)
values (91, 24);
insert into following (user_id, following_id)
values (13, 75);
insert into following (user_id, following_id)
values (46, 90);
insert into following (user_id, following_id)
values (78, 3);
insert into following (user_id, following_id)
values (27, 4);
insert into following (user_id, following_id)
values (31, 30);
insert into following (user_id, following_id)
values (33, 67);
insert into following (user_id, following_id)
values (73, 44);
insert into following (user_id, following_id)
values (90, 27);
insert into following (user_id, following_id)
values (100, 85);
insert into following (user_id, following_id)
values (10, 54);
insert into following (user_id, following_id)
values (81, 96);
insert into following (user_id, following_id)
values (79, 82);
insert into following (user_id, following_id)
values (42, 49);
insert into following (user_id, following_id)
values (34, 84);
insert into following (user_id, following_id)
values (22, 8);
insert into following (user_id, following_id)
values (37, 61);
insert into following (user_id, following_id)
values (106, 102);
insert into following (user_id, following_id)
values (101, 63);
insert into following (user_id, following_id)
values (57, 90);
insert into following (user_id, following_id)
values (106, 103);
insert into following (user_id, following_id)
values (104, 62);
insert into following (user_id, following_id)
values (62, 19);
insert into following (user_id, following_id)
values (88, 81);
insert into following (user_id, following_id)
values (102, 37);
insert into following (user_id, following_id)
values (22, 17);
insert into following (user_id, following_id)
values (77, 66);
insert into following (user_id, following_id)
values (47, 42);
insert into following (user_id, following_id)
values (107, 60);
insert into following (user_id, following_id)
values (81, 61);
insert into following (user_id, following_id)
values (19, 109);
insert into following (user_id, following_id)
values (62, 57);
insert into following (user_id, following_id)
values (74, 66);
insert into following (user_id, following_id)
values (75, 50);
insert into following (user_id, following_id)
values (30, 92);
insert into following (user_id, following_id)
values (51, 70);
insert into following (user_id, following_id)
values (67, 94);
insert into following (user_id, following_id)
values (25, 1);
insert into following (user_id, following_id)
values (37, 88);
insert into following (user_id, following_id)
values (35, 77);
insert into following (user_id, following_id)
values (79, 92);
insert into following (user_id, following_id)
values (35, 105);
insert into following (user_id, following_id)
values (103, 95);
insert into following (user_id, following_id)
values (48, 98);
insert into following (user_id, following_id)
values (77, 14);
insert into following (user_id, following_id)
values (50, 20);
insert into following (user_id, following_id)
values (23, 104);
insert into following (user_id, following_id)
values (30, 7);
insert into following (user_id, following_id)
values (50, 49);
insert into following (user_id, following_id)
values (6, 83);
insert into following (user_id, following_id)
values (91, 82);
insert into following (user_id, following_id)
values (63, 30);
insert into following (user_id, following_id)
values (93, 62);
insert into following (user_id, following_id)
values (69, 108);
insert into following (user_id, following_id)
values (49, 73);
insert into following (user_id, following_id)
values (61, 8);
insert into following (user_id, following_id)
values (8, 65);
insert into following (user_id, following_id)
values (36, 4);
insert into following (user_id, following_id)
values (70, 85);


-- posts:
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        '2024-03-16 01:19:09', 0, false, 16);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
        '2024-05-15 09:14:17', 0, false, 19);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        '2024-07-05 20:52:58', 0, false, 86);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
        '2024-02-17 05:10:26', 0, false, 2);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', '2024-08-31 01:25:22',
        0, false, 49);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
        '2023-11-02 21:19:52', 0, false, 31);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
        '2024-01-03 02:03:58', 0, false, 10);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
        '2024-08-07 03:33:17', 0, false, 92);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
        '2024-03-19 07:26:24', 0, false, 14);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', '2024-07-28 02:44:41', 0,
        false, 50);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
        '2024-07-09 16:44:23', 0, false, 45);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
        '2024-04-01 22:33:19', 0, false, 56);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
        '2024-08-17 22:17:16', 0, false, 104);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
        '2023-12-29 03:05:15', 0, false, 101);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        '2024-07-08 11:51:47', 0, false, 23);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
        '2024-04-06 06:43:05', 0, false, 6);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
        '2024-07-02 18:06:15', 0, false, 93);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        '2024-03-18 05:49:43', 0, false, 61);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        '2024-03-02 12:20:24', 0, false, 41);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
        '2024-06-05 16:43:27', 0, false, 59);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', '2023-11-22 17:13:14', 0, false, 36);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', '2023-09-13 19:29:43', 0, false, 95);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
        '2024-03-05 15:27:15', 0, false, 64);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
        '2024-04-28 07:59:57', 0, false, 6);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        '2024-04-18 04:31:37', 0, false, 108);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
        '2024-01-06 18:14:56', 0, false, 19);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
        '2023-11-20 05:16:59', 0, false, 101);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        '2023-10-30 03:03:25', 0, false, 16);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
        '2024-05-04 12:57:15', 0, false, 47);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        '2023-12-14 21:11:07', 0, false, 60);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '2023-12-23 20:22:23', 0,
        false, 72);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
        '2024-03-31 22:55:33', 0, false, 6);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
        '2024-06-25 17:32:46', 0, false, 22);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        '2024-03-19 09:07:04', 0, false, 104);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', '2024-08-30 02:56:00', 0, false,
        73);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        '2024-01-31 21:16:22', 0, false, 73);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        '2023-12-23 10:52:25', 0, false, 19);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'In congue. Etiam justo. Etiam pretium iaculis justo.', '2023-11-03 20:30:20', 0, false, 78);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
        '2024-07-22 12:42:49', 0, false, 109);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
        '2023-09-30 21:27:55', 0, false, 76);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
        '2024-03-28 17:07:14', 0, false, 30);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', '2023-11-16 17:37:34', 0,
        false, 22);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
        '2024-05-05 16:41:51', 0, false, 66);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
        '2024-08-13 02:55:16', 0, false, 11);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', '2024-03-10 09:25:30', 0, false, 82);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
        '2024-05-11 15:51:37', 0, false, 70);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis',
        '2024-06-04 03:30:06', 0, false, 89);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
        '2023-09-20 15:12:21', 0, false, 6);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
        '2024-06-15 02:03:51', 0, false, 39);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
        '2024-03-31 12:39:40', 0, false, 24);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        '2023-11-17 13:57:31', 0, false, 35);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
        '2023-11-10 22:28:51', 0, false, 15);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
        '2023-11-10 13:24:46', 0, false, 89);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', '2024-05-01 03:50:52', 0, false, 21);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
        '2024-02-13 21:59:33', 0, false, 83);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
        '2023-12-20 00:14:59', 0, false, 102);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
        '2024-03-02 19:32:00', 0, false, 83);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '2024-01-16 12:11:05', 0,
        false, 53);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        '2023-11-16 13:12:36', 0, false, 61);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        '2024-04-15 06:56:30', 0, false, 44);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        '2023-09-25 21:15:23', 0, false, 96);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        '2024-03-05 17:27:18', 0, false, 26);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        '2024-02-03 17:40:28', 0, false, 30);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
        '2024-02-29 10:11:20', 0, false, 105);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
        '2024-05-27 23:10:54', 0, false, 108);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
        '2023-11-04 05:37:30', 0, false, 12);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
        '2023-10-09 04:32:41', 0, false, 72);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
        '2024-01-19 03:38:15', 0, false, 70);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', '2024-06-08 05:36:40',
        0, false, 54);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        '2024-06-21 09:56:41', 0, false, 31);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
        '2024-07-15 05:08:09', 0, false, 100);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', '2024-04-06 08:31:56', 0, false,
        83);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
        '2024-03-04 13:52:46', 0, false, 17);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis',
        '2023-10-13 11:06:12', 0, false, 49);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
        '2024-08-18 11:27:27', 0, false, 31);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Fusce consequat. Nulla nisl. Nunc nisl.', '2023-12-08 06:26:35', 0, false, 12);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
        '2024-06-30 00:26:19', 0, false, 86);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
        '2023-11-13 18:28:26', 0, false, 7);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
        '2024-04-14 04:15:56', 0, false, 89);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', '2023-12-13 16:46:14', 0, false, 26);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
        '2024-02-05 11:48:55', 0, false, 27);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
        '2023-12-31 03:23:24', 0, false, 46);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        '2024-02-14 17:18:06', 0, false, 83);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
        '2023-10-05 07:44:45', 0, false, 9);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
        '2024-01-26 22:43:35', 0, false, 83);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
        '2024-03-31 04:12:24', 0, false, 20);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
        '2024-07-25 12:29:35', 0, false, 78);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', '2024-03-07 11:26:27', 0, false, 70);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
        '2024-05-07 23:07:09', 0, false, 50);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        '2024-05-25 23:44:18', 0, false, 8);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        '2024-01-28 11:36:44', 0, false, 6);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        '2024-06-03 01:02:54', 0, false, 99);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        '2024-05-30 15:03:08', 0, false, 53);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        '2024-02-05 07:54:37', 0, false, 94);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
        '2023-09-14 10:25:52', 0, false, 47);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
        '2024-07-02 14:15:32', 0, false, 55);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        '2024-01-15 13:47:00', 0, false, 33);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
        '2024-04-19 04:22:09', 0, false, 45);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0, 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        '2024-02-14 04:21:02', 0, false, 11);
insert into posts (audience, content, posted_date, reply_restriction, scheduled, author_id)
values (0,
        'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        '2024-04-26 13:29:32', 0, false, 10);