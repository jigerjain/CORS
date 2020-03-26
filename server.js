const express = require('express')
const app = express()
const port1 = 8000
const port2 = 9000

const isPreflight = (req) => {
  return (
    req.method === 'OPTIONS' &&
    req.headers['origin'] &&
    req.headers['access-control-request-method']
  )
}

app.use(express.static(__dirname))

// Step 1 setting up ACAO for all the domains
app.use((req, res, next) => {
    let whitelist = ['cross-site','http://cross-site:9000'];
    let regex = /^https?:\/\/cross/g;

    //  Demo 1   (Allowing resources to be accessible by all)
    //  Allow all approach
    // res.set('Access-Control-Allow-Credentials', 'true')                <--- Demo 1 Uncomment this
    
    //  res.set('Access-Control-Allow-Origin', req.get('origin'))

    // Whitelisting approach
    /*
    if (whitelist.includes(req.get('origin'))){
        res.set('Access-Control-Allow-Origin', req.get('origin'))
        console.log("Whitelist approach")
    }
    */

    // Regex approach
    /*
    if (regex.test(req.get('origin'))){
        res.set('Access-Control-Allow-Origin', req.get('origin'))
        console.log("Regex approach")
    }
    */
    
    // Preflight Test
    /*
    if (isPreflight(req)) {
      // Headers to be set if there is a preflight request
      res.set('Access-Control-Allow-Methods', 'PUT, DELETE'),
      res.set('Access-Control-Allow-Headers', 'X-CUSTOM-HEADER')
      res.status(204).end()
      return
    } else {
        res.set('Can_You_See_This_Header', '120')
        //res.set('Access-Control-Expose-Headers', 'Can_You_See_This_Header') // Add this!
        
    }
    */
    next()
})

// api call 
app.get('/api/posts', (req, res) =>{
    //res.set('Set-Cookie', 'username=Celal; Path=/')
    res.json([
      {id: 1, content: 'foo'},
      {id: 1, content: 'baaaar'},
    ])
})

// First server on port 8000
app.listen(port1, () => {
  console.log(`Same-site listening on port ${port1}`)
})

// Second server on port 9000
app.listen(port2, () => {
  console.log(`Cross-site listening on port ${port2}`)
})
