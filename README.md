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

For at oprette forbindelse til en db, så skal der oprettes en `.env` fil med samme indhold som `EXAMPLE.env` med undtagelser af url'en til db'en, som skal udfyldes manuelt. __Kør derfor nedestående kommandoer fra roden af projektet__, og tilføj din url til din mongodb i `.env`.

For Windows:
```
$ copy EXAMPLE.env .env
```

For Mac/Linux:
```
$ cp EXMAPLE.env .env
```

Hvis projektet skal deployes på en server med andre node servere, og derfor skal have en anden base url end `/`, så HUSK at ændre `BASE_URL` i `.env` til, at matche den som deployment serveren server node projektet på.

### Geolocation for browser user
For at at bruger, som benytter browseren (chrome f.eks.) så skal forbindelsen ske via. en HTTPS forbindelse. Chrome har nemlig [fjernet Geolocation API](https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only) fra usikre Origins i Chrome 50.

1. Én løsning er at Node projectet skal deployes på en server der er sat op til, at benytte HTTPS.
2. Hvis Node projectet skal vises i en "proof-of-concept" anledning, så kan [ngrok](https://ngrok.com/) benyttes til, at oprette en tunnel til dit Node project via. HTTPS.

## Usage
Der kan benyttes scripts som `package.json` indeholder.

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

## Part-4
Design a GraphQL endpoint on top of the facade-methods defined in the mini-project. Implement a React/Apollo-Client using many of the Queries/Mutations implemented by the GraphQL endpoint.

## Links
### DB hosting
- [mLab](https://mlab.com/home) - hoster databasen.

### Good graphql refs
- [resolvere](https://www.apollographql.com/docs/graphql-tools/resolvers.html)
- [modularizing](https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2)
- [a lot of good references](https://github.com/chentsulin/awesome-graphql)
