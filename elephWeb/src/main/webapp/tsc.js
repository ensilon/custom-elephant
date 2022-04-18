import { mrSock } from './mrsock.js'

export class TimeSheetCell extends HTMLElement {

   // Can define constructor arguments if you wish.
  constructor() {
    // If you define a constructor, always call super() first!
    // This is specific to CE and required by the spec.
    super();
    
    //console.log(":yey:");
	this.sock = new mrSock("ws://localhost:8080/elephWeb/Tsc"); // need singleton

	// Create a shadow root
	this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

	// Create (nested) span elements
	const wrapper = document.createElement('div');
	wrapper.setAttribute('contenteditable','true');
	wrapper.innerText = "0";

	// Create some CSS to apply to the shadow dom
//	const style = document.createElement('style');
//	style.textContent = '';

    // attach the created elements to the shadow DOM
	this.shadowRoot.append(wrapper);

	// Apply external styles to the shadow dom
	const linkElem = document.createElement('link');
	linkElem.setAttribute('rel', 'stylesheet');
	linkElem.setAttribute('href', 'tsc.css');

	// Attach the created element to the shadow dom
	this.shadowRoot.appendChild(linkElem);

 
    this.addEventListener("keydown", (e) => {
       if (e.keyCode == '13') {
          console.log("oh no you di-int");
	  	  this.shadowRoot.querySelector("div").className = "";
	      this.shadowRoot.querySelector("div").className = "bloody";
	      e.preventDefault();
	      this.blur();
	  
	      let cell_id = this.getAttribute("timesheet-id");
	      let contents = this.shadowRoot.querySelector("div").innerText;
	      console.log(contents);
	      this.sock.send({ type:"cell-update", id: cell_id, contents: contents });

	   //   setTimeout(() => {
	         // fire our lazers!!!
	  //       console.log("ONE. SECOND. LATER.");
	  //   	this.ack();
	 // 	  }, 3000);
	  	  return false;
       }
    });
  
  } // constructor !!

    ack() {
       this.shadowRoot.querySelector("div").className = "rolling-meadows";
        let myid = this.getAttribute("timesheet-id");
        console.log("saved id : " + myid);
    }
    connectedCallback() {
      if (this.hasAttribute("timesheet-id")) {
        let myid = this.getAttribute("timesheet-id");
        console.log("my id is : " + myid);
		this.shadowRoot.querySelector("div").setAttribute('id', myid);
	    //this.innerHTML = `<div contenteditable=true id=$myid>0</div>`;
		this.sock.registerWsListener(myid, this);
      }
    }

}
   

customElements.define('ts-cell', TimeSheetCell);