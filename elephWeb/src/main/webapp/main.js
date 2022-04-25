import { TimeSheetCell } from './tsc.js'
import { mrSock } from './mrsock.js'

const row = document.getElementById("row1");

const cellsock = new mrSock("ws://" + location.host + "/elephWeb/Tsc");

// onopen callback
//cellsock.send({ type:"cell-list" });

// onmessage callback
function gotcells(payload) {
	
  //console.log(payload);

	let cellElem = document.createElement('ts-cell');
	cellElem.setAttribute('timesheet-id', payload.cellid);
	row.appendChild(cellElem);
}

cellsock.registerCallback("cell-list", gotcells);