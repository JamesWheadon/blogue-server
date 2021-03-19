# Blogue - server

An anonymous community journalling site built using JavaScript, HTML, and CSS.
Users can make posts anonymously and receive comments/reactions on these posts.

### Installation

-   Clone or download this repo and [blogue-client](https://github.com/roselynle/blogue-client) repo

### Usage

-   Open your terminal/CLI and navigate to the `blogue-server` folder
-   Run `npm install` to install dependencies
-   Run `npm start` to launch server
-   Navigate to the `blogue-client` folder
-   Run `npm install` to install dependencies
-   Load `index.html` in your browser
-   Happy posting!

## Technologies

-   Server side: JavaScript
    -   Dependencies include: Express, Body-Parser, Cors
-   Test suite: Jest, supertest

## Process

-   Discussion on what functionality we need on our server for the client
-   Basic CRUD functionality implemented
-   Improvements made upon existing functionality to give additional features to the client side

## Wins & Challenges

### Wins

-   Achieved a minimum viable product. The following functionalities are available to the client: make GET requests to retrieve all posts, make post and patch requests to create posts, and react or comment on other peoples' posts
-   Implemented full CRUD functionalities on server side ( fully functional GET ,POST, PATCH, DELETE methods)
-   Added additional feautures: A Sort posts function which sends back posts in ascending, descending or by ascending order of comments + reactions;
    A search posts function which returns posts where the subject or journal input includes the search query string. 
-   Tested all functions and API Endpoints

### Challenges

-   Difficulties with testing on complicated functions
-   Coming across numerous bugs and errors while setting up server 

## Bugs
-   No known bugs. The following bugs were encountered during the process and fixed: delete method would delete posts even if postID given did not have a match in the data

## Future Features

-   Adding a functionality to allow the users to sort the submitted posts (e.g. in most recent or most reacted order)
-   Granting superuser access to the admin so that they are able to delete or edit any posts (e.g. posts that may be inappropriate or hateful)
-   Grouping the posts with tags pertaining to their subject matter, so that users to find posts relating to a specific subject matter.
-   Search feature to allow users to find posts using specific keywords

## Licence

-   ISC
