import { TimeSheetCell } from './tsc.js'
import { mrSock } from './mrsock.js'

const row = document.getElementById("row1");

//cellsock = new mrSock("ws://" + location.host + "/elephWeb/Tsc");
// wait for open
//cellsock.send({ type:"cell-list" });

// onmessage callback

// dummy to test DOM stuff
const cells = [1, 3, 5, 7, 9];
for (let cellid of cells) {
	let cellElem = document.createElement('ts-cell');
	cellElem.setAttribute('timesheet-id', cellid);
	row.appendChild(cellElem);
}