# curated-ship-gifs
Get a random shipping related gif that won't freak out the normals

Provides `ship` and `fail` gifs.

## Preview

Go to [the deployed site](http://curated-ship-gifs.petegoo.com) and click the relevant preview link

## Need to Blacklist a gif?
Open a PR changing the blacklist.json file

## Using the API

### Pre-approved gifs

Send a GET to
 
http://curated-ship-gifs.petegoo.com/ship
 
 or
  
http://curated-ship-gifs.petegoo.com/fail  

### Avoiding blacklisted gifs

Send a GET to
 
http://curated-ship-gifs.petegoo.com/ship/lucky
 
 or
  
http://curated-ship-gifs.petegoo.com/fail/lucky  
 
 or
  
http://curated-ship-gifs.petegoo.com/search?q=boat+fail  

