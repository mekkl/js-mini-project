# js-mini-project
## Setup
Download Node afhængigheder ved at kører nedestående kommandoer, fra roden af projektet:
```
$ yarn
```
eller,
```
$ npm install
```

For at oprette forbindelse til en db, så skal der oprettes en `settings.js` fil med samme indhold som `settings.example.js` med undtagelser af url'en til db'en som skal udfyldes. __Kør derfor nedestående kommandoer fra roden af projektet__.

For Windows:
```
$ copy settings.example.js settings.js
```

For Mac/Linux:
```
$ cp settings.example.js settings.js
```

## Usage
Der kan benyttes følgende scripts (se `package.json` for mere info). `start`, `dev-mac`, `dev-win`, `test-mac`, `test-win`, `test-dev-mac`, `test-dev-win`

## Model/idea
The idea is to have a backend for users, as sketched in this model. 
A user can have a geo-position, which will be sent from his phone. The position will only “live” for a short time, in order to be up-to-date. If not updated before this time, it will be removed. Users can also hold several job positions (programmer, student, football trainer etc.)
Authenticated Users, can create LocationBlog-entries as sketched in the figure and, also authenticated users, can “like” an entry (once only).

![](./model.png)

The model is deliberately held very simple, and miss many parts necessary for a “real” system. The model is also meant ONLY  as initial thoughts, which should be used as inspiration during the Schema Design.

## Architecture
This is not a single system, but rather three small demo systems with a lot of redundancy meant to try out different technologies. Having a common database + facade for all projects makes it easier to get time for all of it.

## Part-1: 
The first part represents a traditional web application, built with server-side rendering (pug, ejs or handlebars) and a MongoDB/mongoose database. Via this app, you should be able to log-in, create blog entries, and ideally also watch and like these entries.

## Part-2:
A simple friend-finder app, where you can log-in, via a phone, provide a radius to search for friends, and will be provided with a map, with the position of all your friend (inside this radius).

## Part-3: 
Will introduce features from 1+2, but this time using Graph-QL, in order to demonstrate the advantages of this new technology.

## Links
[mLab](https://mlab.com/home) - hoster databasen.