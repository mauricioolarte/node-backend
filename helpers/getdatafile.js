const fs = require('fs');


const getDataFile = () => {
	let data = fs.readFileSync('values.json');
	let values = JSON.parse(data);
	// console.log(values);

	return values
}

module.exports = getDataFile