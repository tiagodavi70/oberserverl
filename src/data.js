let cols = [
    "episode id",
    "timestep",
    "agent joint state",
    "agent gripper state",
    "joint actions",
    "gripper actions",
    "bottom burner",
    "top burner",
    "light switch",
    "slide cabinet",
    "hinge cabinet",
    "microwave",
    "kettle pos",
    "kettle rot"
]

let data = {};

function downloadJson(json, filename) {
    // Convert the JSON object to a string
    const jsonString = JSON.stringify(json, null, 2);
    console.log(json)
    // Create a new Blob object from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });
  
    // Create a download link element
    const downloadLink = document.createElement("a");
  
    // Set the download link's properties
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;
  
    // Append the download link to the document
    document.body.appendChild(downloadLink);
  
    // Trigger a click event on the download link
    downloadLink.click();
  
    // Clean up by removing the download link
    document.body.removeChild(downloadLink);
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function tabulate(data, columns, sel) {
	var table = sel ? d3.select(sel) : d3.select('body').append('table')
	var thead = table.append('thead')
	var	tbody = table.append('tbody');

	// append the header row
	thead.append('tr')
	.selectAll('th')
	.data(columns)
	.join('th')
		.text(function (column) { return column; });

	// create a row for each object in the data
	var rows = tbody.selectAll('tr')
	.data(data)
	.join('tr');

	// create a cell in each row for each column
	var cells = rows.selectAll('td')
	.data(function (row) {
		return columns.map(function (column) {
			return {column: column, value: row[column]};
		});
	})
	.join('td')
		.text(function (d) { return d.value; });

	return table;
}
  
function preprocessTransformArray(v) {
    // `[${}]`
    return v
        .replace("[","").replace("]","")
        .split(" ")
        .filter(k => !isNaN(Number.parseFloat(k)) )
        .map(k => Number.parseFloat(k));
}

const promiseLoadData = new Promise((resolve, reject) => {
	d3.json("data/data_clean.json").then(dataClean => {
        resolve(dataClean);
    });
	// return d3.json("data/data_clean.json");
})

function loadData() { }


// https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
	var m = array.length, t, i;
  
	// While there remain elements to shuffle…
	while (m) {
  
	  // Pick a remaining element…
	  i = Math.floor(Math.random() * m--);
  
	  // And swap it with the current element.
	  t = array[m];
	  array[m] = array[i];
	  array[i] = t;
	}
  
	return array;
}
