# Tristan & Isolde: A Remix
## Hur jag har tänkt och hur saker fungerar
Webbservern körs, och i `server.js` får servern instruktioner om vilka funktioner som ska köras. Den kör även igång en session, vilken gör att de val spelaren har gjort sparas i en lista. Den kör även igång express, och säger åt att det är i viewsfoldern som alla filer som ska visas upp ligger.

Därefter säger `server.js` åt servern att använda alla olika routes som ligger i routesfoldern. Dessa säger åt servern vad som ska hända när man besöker en viss sida. Indexroutern (`index.js`) definerar exempelvis vad som ska hända i root, alltså webbplatsens startsida. Alla dessa måste importeras i början av filen för att kunna användas. Detta förutsätter även att de är exporterade.

I exempelvis `index.js` används `res.render()` för att skicka data till klienten efter att root har hämtats med `router.get`. Det är ungefär likadant för alla sådanna, men för att ge ett exempel så skickar vi `title` och `message` till `index.njk` såhär:
```javascript
router.get("/", (req, res) => {
    res.render("index.njk", {
        title: "Tristan & Isolde: Remixed",
        message: "A remixed version of Wagner's Tristan & Isolde."
    });
});
```

Jag har även lagt till en `router.post()` som raderar session history. Denna används med en asyncfunktion i `script.js` när restartknappen trycks.

När användaren startar äventyret får den läsa prologen, och när den är redo omdirigeras den till `/story/1`. Ettan indikerar vilket ID från `story.json` som ska visas upp. Då skickas sidans titel, beskrivning, val, alla tidigare vals ID:n samt sidans egna ID. För att kunna implementera conditional logic var jag tvungen att skicka med hela listan så att den kunde itereras över ifall att sidan skulle ha requirements.

Alla val har ett target som defineras i `story.json`. Beroende på target kommer användaren att omdirigeras till en ny sida (`/story/id`) med en ny titel, beskrivning och val.

När sidan laddas läggs även sidotiteln in i listan `req.session.choices`, och sidans ID läggs till i `req.session.choice_id`. Allt detta hanteras av routern `story.js`.

Anledningen till att jag har dessa två listor är för att kunna visa upp alla tidigare val i `/choices`. Dessa är även nödvändiga för att sidan ska kunna se efter om ett vals requirement finns i `req.session.choice_id`. Beroende på val tidigare i textäventyret kommer olika val att visas upp. Berättelsen styrs alltså beroende på användarens tidigare val, och även lite på slumpen!

## Skillnad från 11ty
En sida skapad med 11ty är statisk, det vill säga allting sker hos klienten. Här är några delar statiska, men sessions är exempelvis något som är specifikt för en webbserver. Jag skulle dessutom ha behövt skriva en massa olika .md-filer med 11ty om jag skulle vilja uppnå ett liknande resultat. Med en webbserver kan jag bara iterera över en .json-fil som har all nödvändig data. Därefter kan servern skicka all nödvändig data till klienten där sidan kan byggas utifrån ett njktemplat.

## Routes
Jag har två routes:
- `index.js`
- `story.js`

Indexroutern hanterar root, det vill säga allt som inte har med resten av berättelsen att göra. Storyroutern hanterar allting som har med berättelsen att göra, som exempelvis `/choices` och att skicka data från `story.json` till frontenden.

Jag hade kunnat ha allting i en och samma fil, men detta hade blivit otroligt långt och stökigt. Att organisera filerna på detta gör inte bara saker mer logiskt, utan det gör det även lättare att hantera när man jobbar med det eftersom man har brutit ned det i mindre bitar. Man måste bara vara noggrann med vart man stoppar allting så att det faktiskt fungerar. Man vill t.ex kunna komma åt alla nödvändiga variabler så att de inte ligger i en annan fil.

## Nya funktioner
Jag lade till sessions, vilka möjliggör att spelarens val i framtiden bestäms av de val spelaren gör tidigare i berättelsen. Om spelaren väljer att berätta för Brangäne om planen i ett tidigare skede i spelet kommer spelare kunna märka om hon är i köket genom att rulla 1d20. Beroende på hur spelaren rullar kan den märka Brangäne i köket.

## Förbättringar
Det hade varit kul att designa grafik till spelet i form av bilder. Tyvärr fanns det inte tid till detta. En mer skojig UI hade också varit kul att fixa, men jag valde att lägga fokus på funktionerna snarare än sidans design.