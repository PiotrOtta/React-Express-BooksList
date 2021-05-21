# React-Express-BooksList
## books data is stored in phpmyadmin database.

React "Books list" project using Axios and Styled Components. </br>
Backend is using Express, mysql and cors (dev only) to connect to localhost database(named in my case react_database) created in phpmyadmin (Xampp). </br>
Table in database in named "books" and has only 4 columns:  </br>
| id | title | author | image |
| --- | --- | --- | --- |
| int( primary key ) | varchar(50)  | varchar(50) | longtext (not blob) | </br>

User is able to add new books (there are no restrictions in terms of image size or text inserted), filter the list by text and delete them. </br>
Books with no image given will have "placeholder" image instead. </br>

Project is in Polish - this also applies to the comments. </br>
Screenshots folder is unnecessary for the project to run. </br>

## Video showcase on Youtube
https://youtu.be/Eai1J9bjU0w </br>
Disclaimer: The music in the video does not belong to me and I do not receive ad revenue from the video itself.

## Screenshots showcasing the project

<img src="https://github.com/PiotrOtta/React-Express-BooksList/blob/main/screenshots/booklist_01.png" width="500">
<img src="https://github.com/PiotrOtta/React-Express-BooksList/blob/main/screenshots/booklist_02.png" width="500">
<img src="https://github.com/PiotrOtta/React-Express-BooksList/blob/main/screenshots/booklist_03.png" width="500">
<img src="https://github.com/PiotrOtta/React-Express-BooksList/blob/main/screenshots/booklist_04.png" width="500">

## To install dependencies and npm modules

In the project directory, you can run:

### `npm install`
