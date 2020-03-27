# CORS

## Examples portswigger
Learning CORS with portswigger could be observed under Example folders

## CORS testing and learning
### Credits: https://dev.to/miguelmota/understanding-cross-origin-resource-sharing-cors-2i3e

Requirements:   
npm, node and browser :P 

CORS testing application could be emulated by cloning the repo and running the server using   
node server.js   
   
#### Demo 1: Fetching cross.site resources   
First we would try to fetch an api(api/post) of cross.site:8000 from the amazing.world:9000 website and see check our console for details Did you see any error??   

#### Demo 2: Allow amazing.world to access the api   
Adding Access-Control-Allow-Headers on the server to see the changes   
There are 3 approaches now, we would look into few vulnerabilities of each methods if not set properly   
   
Allow all: *   
Regular expression allowing   
Whitelisting   

#### Demo 3: Preflight requests   
This time we would try to access the api by not using simple request which would indeed call for preflight request   

#### Demo 4: Sending credentials and cookies   
This time we would try to send some cookies and check how the server replies with new settings   
