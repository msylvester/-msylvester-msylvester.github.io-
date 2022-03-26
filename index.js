import "./styles.css";
class queue {
	constructor() {
		this.arr = [];
	}

	push = (n) => {
		this.arr.push(n);
		this.size += 1;
	}

	empty = () => (this.arr.length === 0);

	front = () => (this.arr[0]);

	pop = () => (this.arr.length !== 0 ? this.arr.shift() : null);
	
}
let fillColor = 'pink', n;

const table = document.getElementById("table");
const inputColor = document.getElementById("color");
function hexToRgb(hex) {
	// copied from stack overflow
	// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (result) {
		var c = `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
		return c;
	}
	else {
		return 'black'
	}
}
const createTable = (numRows, numCols) => {
	console.log('he')

	while (table.firstChild) {
		table.removeChild(table.firstChild);
	}
	console.log('he')
	for (let row = 0; row < numRows; row++) {
		const tr = document.createElement("tr");
		table.appendChild(tr);
		for (let col = 0; col < numCols; col++) {
			const td = document.createElement("td");
			tr.appendChild(td);
			td.dataset.row = row;
			td.dataset.col = col;
			td.title = `row ${row} col ${col}`;
			td.id = `${row}_${col}`;
			td.addEventListener("click", click);
		}
	}

};
const handleEdges = (row, col, colors) => {
	const { preC = "#FFFFFF", newC } = colors,
		ele = document.getElementById(`${row}_${col}`);
	console.log("here we are");
	const height = 10,
		width = 15;
	let verticeColor = "#FFFFFF";
	if (ele && ele.style) {
		const { backgroundColor = "#FFFFFF" } = document.getElementById(
			`${row}_${col}`
		).style;
		verticeColor = backgroundColor || "#FFFFFF";
		console.log('vertie ', verticeColor)
		if (verticeColor === 'rgb(0, 0, 0)') {
			verticeColor = "#FFFFFF"
		}
	}
	console.log(`${row} ${col} ${preC} ${newC} ${verticeColor}`)
	if (
		row < 0 ||
		row >= height ||
		col < 0 ||
		col >= width ||
		verticeColor !== preC ||
		verticeColor === newC
	) {
		return false;
	}
	return true;
};

const BFS = (e, x, y, preC, newC) => {
	let queue = [];
	queue.push([parseInt(x), parseInt(y)]);
	e.target.style.backgroundColor = newC;
	console.log(`here we are ${x} ${y} ${preC} ${queue}`);
	let z = 30;
	while (queue.length > 0) {
		z--;
		let currPixel = queue[queue.length - 1];
		console.log(`here is the curr ${currPixel}`);
		queue.pop();
		try {
			console.log(`here i  ${currPixel}`);
			console.log(`here is ${currPixel[0]}`);
		} catch (e) {
			console.log(`here is ${e}`);
		}

		let posX = currPixel && currPixel.length && currPixel[0];
		let posY = currPixel && currPixel.length && currPixel[1];
		posX = parseInt(posX);
		posY = parseInt(posY);
		const rowsGtrOne = handleEdges(posX - 1, posY, { preC, newC }),
			colsLssMax = handleEdges(posX, posY + 1, { preC, newC }),
			rowsLssMax = handleEdges(posX + 1, posY, { preC, newC }),
			colsGtrOne = handleEdges(posX, posY - 1, { preC, newC });
		let mustClick = false;
		if (rowsGtrOne) {
			if (document.getElementById(`${posX - 1}_${posY}`)) {
				if (document.getElementById(`${posX - 1}_${posY}`) === preC) {
					document.getElementById(
						`${posX - 1}_${posY}`
					).style.backgroundColor = newC;
				}
			}
			queue.push([posX - 1, posY]);
			mustClick = true;

		}
		if (colsGtrOne) {
			if (document.getElementById(`${posX}_${posY + 1}`)) {
				if (document.getElementById(`${posX}_${posY + 1}`) === preC) {
					document.getElementById(
						`${posX}_${posY + 1}`
					).style.backgroundColor = newC;
				}
			}
			queue.push([posX, posY + 1]);
			mustClick = true;
		}
		if (colsLssMax) {
			if (document.getElementById(`${posX + 1}_${posY}`)) {
				if (document.getElementById(`${posX + 1}_${posY}`) === preC) {
					document.getElementById(
						`${posX + 1}_${posY}`
					).style.backgroundColor = newC;
				}
			}
			queue.push([posX + 1, posY]);
			mustClick = true;
		}
		if (rowsLssMax) {
			if (document.getElementById(`${posX}_${posY - 1}`)) {
				if (document.getElementById(`${posX}_${posY - 1}`) === preC) {
					document.getElementById(
						`${posX}_${posY - 1}`
					).style.backgroundColor = newC;
				}
			}
			queue.push([posX, posY - 1]);
			mustClick = true;

		}
	};
}
const floodFillBFS = async(cx, cy) => {
	var grid = document.querySelectorAll('.element-block');
	fillColor = document.getElementById('colorBox').value;
	fillColor = hexToRgb(fillColor);
	n = grid.length;
	var pos = (cx * col) + cy;
	await helper(grid, pos);
}

const fillSquares = (e, color) => {
	let {
		target: {
			style: { backgroundColor: oldColor  }
		},
		target: {
			dataset: { row = null, col = null }
		}
	} = e;

	console.log(`here is teh old color: ${oldColor}`);
	BFS(e, row, col, oldColor, color);
};

const click = (e) => {
	const { value: action = "" } = document.getElementById("action"),
		{ value: color = "" } = inputColor;
	action === "paint"
		? (e.target.style.backgroundColor = color)
		: fillSquares(e, color);
};
createTable(10, 15);