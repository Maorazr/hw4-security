
1. register / login to the blog.
2. click on the csrf_attack.html 
3. a post will be created and will be in the drafts.
4. the response will be something like that:

id	427
title	"malicious post title"
content	"malicious post content"
published	false
authorId	33
videoUrl	null
author	
id	33
name	"maorazriel"
username	"Maorazrr"
email	"maor@mail.com"
emailVerified	null
image	null
createdAt	"2023-07-31T10:46:06.158Z"
updatedAt	"2023-08-01T08:38:22.919Z"
password	"$2b$10$DOiiNQCEJ/8TedEgVOyNdOX5K8KJjT5th9K6AcZg/6tUp0gFHCuTW"
profilePic	"http://res.cloudinary.com/dhl4ej1ci/image/upload/v1690879102/Blog/ProfilePic/97b2c280-0ee0-4693-9540-eb90e451bf02.jpg"

optional attack:

5. go to drafts and publish the post.
6. go to csrf_attack_del and change the post_id to the id you got in the response.
7. click on it and it will delete the post that has been created and will redirect you to the main page.