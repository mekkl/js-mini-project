## Issues
### #0001 | Mocha hangs - 06/11/2018
Mocha hænger efter end testing. Ifølge [boneskull](https://boneskull.com/mocha-v4-nears-release/#mochawontforceexit) som skriver følgende "If the `mocha` process is still alive after your tests seem "done", then your tests have scheduled something to happen (asynchronously) and haven't cleaned up after themselves properly. Did you leave a socket open?".

Problemet kan løses ved et quick-fix hvis man benytter `--exit`. Dette skal løses bedre i fremtiden!

### #0002 | No debug msg - 07/11/2018
~~Problemet er kun set når det køres på mac - Når der bliver benyttet følgende to `package.json` scripts: `dev-mac` og `test-mac`, så bliver javascript `debug` modulet ikke aktiveret. Der bliver altså ikke logget i konsolen.~~

~~En mistanke er at `DEBUG='...'` ikke fungerer som det skal.~~

#### Fix - 08/11/2018
Scriptet skulle ændres fra `DEBUG=miniproject:* & mocha --recursive --exit` til `DEBUG=miniproject:* mocha --recursive --exit`

### #0003 | MissingSchemaError - 08/11/2018
~~Den nye function, i `./facades/position/positionFacade` , `findNearbyUsers` smider følgende Error `MissingSchemaError: Schema hasn't been registered for model "User".`. Umiddelbart bunder det i, at User schemaet ikke er blevet registreret til modellen User. Der benyttes `.populate()` som er den function der 'joiner' Position og User.~~

#### Fix - 08/11/2018
Løsningen var et flytte, i alle testFacader, en blok af variabledeklarationer op over:
```javascript
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.connection = {};
```

blokken af variabler der blev flyttet over var f.eks:
```javascript
const LocationBlog = require("../../models/LocationBlog");
const authFacade = require("../../facades/authFacade");
const User = require("../../models/User");
```

De to test der synede voldte problemet, og hvor overstående løsning virkede, var `testAuthFacade.js` og `testBlogFacade.js`. For sikkerheds skyld blev ændringen også implementeret i `testPositionFacade.js` og `testUserFacade.js`

### #0004 | exit code 3228369023 - 08/11/2018
~~Når der på en Windows maskine skal tilføje data til db, indtil videre kun set ved en bulk create, så ses det, at følgende error kommer `error Command failed with exit code 3228369023`. Denne error dukker KUN op ved en bulk indsætning:~~ 
```javascript
users = await Promise.all([
    new User({ firstName: "Kurt", lastName: "Wonnegut", userName: "kw", password: "test", email: "a@b.dk" }).save(),
    new User({ firstName: "Hanne", lastName: "Wonnegut", userName: "hw", password: "test", email: "b@b.dk" }).save(),
    ])
```

~~eller:~~
```javascript
users = await User.insertMany([
    new User({ firstName: "Bruce", lastName: "Wayne", userName: "joker", password: "test", email: "bat@man.org" }),
    new User({ firstName: "Joker", lastName: "NoName", userName: "batman", password: "test", email: "jo@ker.org" })
    ], { ordered: true })
```

~~men ikke:~~
```javascript
await Position.deleteMany({}).exec();
```

#### Fix - 08/11/2018
Problemet skyldtes måske følgende: *"This error code (3228369023 red.) is usually due to antivirus or malware scanner interfering with the npm install ... Disable or correctly configure your virus scanners and malware scanners."* Selvom jeg klonede projektet og downloadede afhængighederne med antivirus slået fra, så hjalp det ikke. 

Problemet opstod kun på min egen Windows maskine. Det var nemlig testet på en anden også.

Ved download af den nye LTS node version, blev problemet løst.

### #0005 | no route to static files - 25/11/18
~~Da projektet skal deployes på en ubuntu server i en droplet, og nginx på dropletten sender alt videre til tomcat på `/`, så bliver nginx nødt til, at sende requests videre til en sub path. Den valgte sub path kan f.eks. være `/node`.~~

~~Problemet opstår nu i, at `app.use(express.static(path.join(__dirname, 'public')));` i `app.js` fortæller node, at de statiske filer i mappen `public` kan hentes ved `/some/static/file`. Men da nginx sender alt videre til tomcat som ikke matcher `/node`, så vil node aldrig kunne få requests efter dens static filer.~~

#### Fix - 27/11/2018
Løsningen var, at lave følgende ændring i `app.js`

```javascript
+ app.use('/node', express.static(path.join(__dirname, 'public')));
- app.use(express.static(path.join(__dirname, 'public')));
```

Følgende ændring gør, at de statiske filer nu kan hentes ved `/node/some/static/file` og læg mærke til, at den første subpath er `/node` som nginx nu vil sende videre til projektet og derved serverer de statiske filer.