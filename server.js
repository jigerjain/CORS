const express = require('express')
const app = express()
const port1 = 8000
const port2 = 9000



app.use(express.static(__dirname))

// Step 1 setting up ACAO for all the domains
app.use((req, res, next) => {
    let whitelist = ['localhost','http://localhost:9000'];
    let regex = /^https?:\/\/localhost/g;

    // Allow all approach
//  res.set('Access-Control-Allow-Origin', '*')

    // Whitelisting approach
    if (whitelist.includes(req.get('origin'))){
        res.set('Access-Control-Allow-Origin', req.get('origin'))
        console.log("Whitelist approach")
    }

    // Regex approach
    if (regex.test(req.get('origin'))){
        res.set('Access-Control-Allow-Origin', req.get('origin'))
        console.log("Regex approach")
    }
    next()
})

// api call 
app.get('/api/posts', (req, res) =>{
    res.json([
      {id: 1, content: 'foo'},
      {id: 1, content: 'bar'},
    ])
})

// First server on port 8000
app.listen(port1, () => {
  console.log(`listening on port ${port1}`)
})

// Second server on port 9000
app.listen(port2, () => {
  console.log(`listening on port ${port2}`)
})
