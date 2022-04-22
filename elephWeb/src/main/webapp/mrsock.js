/**
 * giving socket.io a run for it's money?
 */
export class mrSock {
	
	sock;
	handlers=[];
	gotcells_cb;
	static urls=[]; // connection cache
	
  	constructor (url) {
		for (let old_url of mrSock.urls) {
			if (url == old_url.my_url) {
				return old_url.myself;
			}
		}
		this.sock = new WebSocket(url);
		console.log(url);
		mrSock.urls.push({ my_url: url, myself: this });

		const sockStatus = document.getElementById("tsc");
		//console.log(sockStatus.innerText);
		sockStatus.innerText = "setup";
  

  		 const ono = function(event) {
			sockStatus.innerText = "is open";
			this.send({ type:"cell-list" });
  		}
		this.sock.onopen = ono.bind(this);

  		this.sock.onclose = function(event) {
			sockStatus.innerText = "is closed";
  		}

  		const cb = function(event) {
			console.log(event.data);
			const jsondata = JSON.parse(event.data);
			switch(jsondata.type) {
			  case "cell-update":
			    //console.log(mrSock.handlers.toString());
				for (let handler of this.handlers) {
					//console.log("trying handler id: " + handler.ep + " json.id" + jsondata.id);
					if (handler.ep == jsondata.id) {
						handler.cb();
						break;
					}
				}
				break;
			  case "cell-list":
			    this.gotcells_cb();
			  break;
			  default:
					console.log("unknown tsc event type " + jsondata.toString());
			}
  		}

  		this.sock.onmessage = cb.bind(this);
 	}
 	
  	send(jsn) {
		this.sock.send(JSON.stringify(jsn));
	}

  	registerWsListener (tsid, cb_func) {
		this.handlers.push({ep: tsid, cb: cb_func});	
  	}
  	
  	registerGotcells(cb) {
		this.gotcells_cb = cb;
	}
 
};