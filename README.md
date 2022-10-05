# tasks-app

mongoDB vanilla ts tasks app

open .env file, with:

1) JWT_SECRET={your choice of some letters, no spaces, no apostrophes ("/')}

2) MONGODB_URI={your mongoDB connection link}

open a terminal window and:

1. npm i (may need body-parser)

2. nodemon

head over to: `http://localhost:3000/`

sign up.

log in.

add a task by going to recently created, tapping the button in the middle of the page that says description, going though the fields and tapping "click to save changes".

you can mark them as done by tapping the check mark and undone by tapping it again.

edit by tapping the paper and pen icon on the right of the name of the task, and delete by tapping the trash icon.

then in home page (get there by tapping the hamburger icon on the top right and tapping home), you can see all your need to do tasks. done tasks aren't visible there.
