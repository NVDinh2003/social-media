INSERT INTO public."following" (following_id,user_id) VALUES
	 (5,5),
	 (1,1),
	 (5,1),
	 (4,4);

INSERT INTO public.followers (follower_id,user_id) VALUES
	 (1,5);


INSERT INTO public.posts (audience,author_id,is_reply,poll_id,reply_restriction,reply_to,scheduled,posted_date,scheduled_date,"content",address,post_district_id,post_province_id,post_ward_id) VALUES
	 (0,5,NULL,NULL,0,NULL,false,'2024-11-08 09:44:54.660132',NULL,'Hello !','thon 6','492','48','20227'),
	 (0,5,NULL,NULL,0,NULL,false,'2024-11-08 09:48:31.916382',NULL,'',NULL,NULL,NULL,NULL),
	 (0,4,NULL,NULL,0,NULL,false,'2024-11-08 09:55:42.38035',NULL,'test for repost post 🗿',NULL,NULL,NULL,NULL),
	 (0,5,true,NULL,0,3,false,'2024-11-08 11:46:57.760679',NULL,'nice xừ! ',NULL,NULL,NULL,NULL);

INSERT INTO public.images (post_id,image_id,image_name,image_path,image_type,image_url) VALUES
	 (2,1,'confused-gif','https://media.tenor.com/DKRgOMjm2vAAAAAC/confused-confused-face.gif','gif','https://media.tenor.com/DKRgOMjm2vAAAAAC/confused-confused-face.gif');


INSERT INTO public.post_repost_juntion (post_id,user_id) VALUES
	 (3,5);