we need to make a website that shows the games and the progress this can be trough photo's video's and text 

with a little bit of cultural conection between them 



should be good and polished and be good to hand over to other people 





we have 4 module's

1. game showcase - ladingspace for all the games 
2. bulletin board - a shared feed where people can talk to eachother with tags for city's or game's with also reactions per post 
3. AI Culture Companion - when a tag is applied that is a city the AI generate's cultural facts that apply to that city 
4. CMS - a admin interface for managing the game pages and moderating posts 





3.1 **game showcase + CMS**

each game gets its own page with info and photo and video 

* game title and description 
* credits
* play or download button 
* media 



3.2 **Bulletin board** 

a shared feed where student post text and photos about the project 



3.3 **AI Culture Companion**

tags serve as a prompt for the AI to give a cultural fact about the city in the tags 

the facts get stored in a database that grows with every tag 



4 **Tech structure** 

* frontend - HTML and CSS, public facing pages. responsive layout 
* Admin / CMS - PHP game page-, user-, content management. session-based authentication 
* database - MySQL, stores users, games, posts, comments, facts and assignments. One shared database for all modules.
* AI integration - AI API, called server-side from Node.js. Never expose API key on the client 
* file storage - uploaded images stored on the server filesystem in /uploads. served as a static files 



5 **Planning and time distribution**

the project runs in 3 phases and it comes with a guideline 

1. 11 - 13 november - Amsterdam - Setup, database, CMS skeleton, static HTML pages online. - +- 12h
2. 27 jan, 28 jan, 3 feb, 4 feb, - online - online bulletin board, AI integration, Culture Wall, testing - +- 22h
3. 20 - 22 april - Stockholm - Polish, bug fixes, pitch preparation, postmortem - +- 6h



**Task split**

* Anna-Maria -- backend lead: Node.js API, claude API, image upload, database schema
* Rens & daimien -- CMS \& PHP: admin panel, game page management, user authentication, moderation tools
* "bush" -- frontend: all public facing pages, responsive layouts, Culture Wall display
* Olle -- bulletin board: post creation flow, comment system, tag filtering, reactions
* thimothy -- AI integration: prompt engineering, fact database, caption suggestion UI, Culture Wall logic



6 **deliverables**

* proof of concept - Static HTML pages live on a public URL. Database schema defined. basic design in place.
* Working platform - All four modules functional. AI API integrated. Bulletin board live with real student content.
* postmortem document - A short written reflection: what worked, what didn't, what the team would do differently 





olle 
anna maria 
daimien
rens
costic AKA "bush" 
thimothy