/**
 * giving socket.io a run for it's money?
 */
export class mrSock {
	
	sock;
	static handlers=[];
	
  	constructor (url) {
		
		
		this.sock = new WebSocket(url);
		const sockStatus = document.getElementById("tsc");
		//console.log(sockStatus.innerText);
		sockStatus.innerText = "setup";
  

  		this.sock.onopen = function(event) {
			sockStatus.innerText = "is open";
  		}

  		this.sock.onmessage = function(event) {
			console.log(event.data);
			const jsondata = JSON.parse(event.data);
			switch(jsondata.type) {
			  case "cell-update":
			    //console.log(mrSock.handlers.toString());
				for (let handler of mrSock.handlers) {
					console.log("trying handler id: " + handler.ep + " json.id" + jsondata.id);
					if (handler.ep == jsondata.id) {
						handler.cb.ack();
						break;
					}
				}
				break;
			  default:
					console.log("unknown tsc event type " + jsondata.id);
			}
  		}
 	}
 	
  	send(jsn) {
		this.sock.send(JSON.stringify(jsn));
	}

  	registerWsListener (tsid, cb_func) {
		mrSock.handlers.push({ep: tsid, cb: cb_func});	
  	}
 
};