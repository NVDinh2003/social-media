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
