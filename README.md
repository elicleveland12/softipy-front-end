# SoftiPy
by Sivan Adler, David Floyd, and Eli Cleavland


A project created during our time at the [Flatiron School](https://flatironschool.com/)

![](https://media.giphy.com/media/xlpb51NI4PMXBMU7Pg/giphy.gif)

## TECHNOLOGIES
- React
- Ruby on Rails
- Deezer API
- Custom CSS

## DESCRIPTION
SoftiPy is a music streaming service and playlist building application, built on a React front end and a Ruby on Rails back end. Upon login, a User will see their dashboard, where they can see all of the users, a search bar, and a list of their own playlists. We used Deezer's open source song API in order to allow for a user to search for any song by the keyword of their choosing. Users can also create and edit playlists by dragging songs into the desired playlist. Users are also able to click on any other user and see their playlists, and add it into their own playlists, allowing them to edit that playlist without affecting the original users playlist.


## INSTALL
1. Clone down this repository to your local machine. 
2. Clone down the [backend repository](https://github.com/sivanadler/Softipy-Back-End) to your local machine.
3. Run ```bundle install``` in your terminal after cloning down the backend repository. 
4. Before launching the app, you'll need to launch our database. In your terminal for the backend repository, run ```rails db:create``` and ```rails db:migrate```.
5. Run ```rails s``` in that same terminal session to launch our server.
6. Once your server is running, run ```npm install``` in your terminal for the front-end cloned repository.
7. Once you have installed the npm packages installed and you've started your rails server, run ``` npm start ``` in your terminal for the front-end repository. You will be prompted to start your server on another port (since your backend is already running). Type ```y``` to continue.


## CONTRIBUTORS GUIDE
1. Fork and clone this repository.
2. Fork and clone the [backend repository](https://github.com/sivanadler/Softipy-Back-End) .
3. Create your feature branch ```git checkout -b my-new-feature```.
4. Commit your changes ```git commit -m 'Add some feature'```.
5. Push to the branch ```git push origin my-new-feature```.
6. Create a new Pull Request.
