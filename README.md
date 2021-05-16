# Zendesk Ticket Viewer

The express based web app shows the list of available zendesk tickets using the zendesk API. 25 tickets are shown per page. It also diplays the details of each ticket by clicking the links in the ticket list.

## Installation

This project uses node v14.15.0 and yarn v1.22.4

Run the following command to install dependencies

    yarn install

## Usage

To start the server, run the following command and replace username and password with the information that I have sent you through email for security reasons

    USERNAME={username} PASSWORD={password} yarn start

Please open the following url to view the app in your browser once the server has started: http://localhost:3000

To run the tests, run the following command (no need to supply username and password because there is a mock API)

    yarn test

## The WHY

### CLI vs web UI

CLI might have been the easiest and simplest approach but its use is limited in web development, and I was hoping to use web app Zendesk take-home task as an opportunity to learn express used broadly.

### Why node.js & express

I chose JavaScript as it is my main language.
Express was used for simplicity (light-weight) and learning opportunities. React would have been a good option too for a learning opportunity but since it requires a lot of dependencies, which is not encouraged for this task, I decided not to use it. If I was making this application for a real company then I would have used Next.js that offers a lot of features out of the box.

### Codebase overview

The routes folder contains js files for each page, which are responsible for fetching data using the lib/zendeskAPI module and rendering data into the views. they also take care of error handling with friendly error messages

The views folder has ejs files for HTML and javascript, which are responsible for showing data and text

The app.js file sets up express app and routes each request to the right file

The lib/zendeskAPI.js contains functions to fetch tickets from zendesk API

### Testing approach

I used supertest library to make http requests, and document parser to query dom for testing purposes.

The tests can be run even without the internet connection or Zendesk APIs not being available or data being changed as mock data was used.
