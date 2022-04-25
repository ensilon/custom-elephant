/**
 * giving socket.io a run for it's money?
 */
export class mrSock {
	
	url;
	sock;
	dispatch;
	statusElement;
	static urls=[]; // connection cache
	
  	constructor (url) {
		this.url = url; // could we just get this from WebSocket?
		this.dispatch = [];
		// implement singleton per url
		for (let old_url of mrSock.urls) {
			if (url == old_url.my_url) {
				return old_url.myself;
			}
		}
		this.sock = new WebSocket(url);
		//console.log(url);
		mrSock.urls.push({ my_url: url, myself: this });

		const sockStatus = document.getElementById("tsc"); // is there a way to pass this, maybe class factory?
		// XXX skip if not present in DOM
		this.statusElement = document.createElement('p')
		//console.log(sockStatus.innerText);
		this.statusElement.innerText = url + " setup";
		sockStatus.appendChild(this.statusElement);
  

  		const ono = function(event) {
			this.statusElement.innerText = this.url + " open";
			this.send({type: "cell-list", payload: { dummy: "is dumb"} }); // hack until main.js onopen cb in place
  		}
		this.sock.onopen = ono.bind(this);

 		const onc = function(event) {
			this.statusElement.innerText = this.url + " closed";
  		}
  		this.sock.onclose = onc.bind(this);
  		
  		const cb = function(event) {
			console.log(event.data);
			const jsondata = JSON.parse(event.data);
			    //console.log(mrSock.handlers.toString());
			    let one_matched = false;
				for (let handler of this.dispatch) {
					//console.log("trying handler id: " + handler.ep + " json.id" + jsondata.payload.id);
					if (handler.type == jsondata.type) {
						handler.cb(jsondata.payload);
						one_matched = true;
						break;  // what if we allow multiple cb per "type"?  is it just that easy?
					}
				}
				if (one_matched == false) {
					console.log("unregeistered tsc event type " + jsondata.toString());
				}
  		}
  		this.sock.onmessage = cb.bind(this);
 	} // constructor
 	
  	send(jsn) { // better ensapsulation if we do: send(type, payload)
		this.sock.send(JSON.stringify(jsn));
	}

  	registerCallback(type, cb) {
		this.dispatch.push({type: type, cb: cb });
	}
}