/*

Converts the community list to a JSON object for use
in the app.

From root of app,

node utils/communitiesToJson.js > tmp

...then copy/paste as needed into src/communities.js

*/

const csvFilePath = "./communities.csv";
const csv = require("csvtojson");
const _ = require("lodash");

csv({
	noheader: false,
	headers: ["region", "place", "", "", "", "lat", "lon"]
})
	.fromFile(csvFilePath)
	.then(jsonObj => {
		let communities = {};
		jsonObj.forEach(row => {
			if (_.isUndefined(communities[row.region])) {
				communities[row.region] = {
					name: row.region,
					places: []
				};
			}
			communities[row.region].places.push({
				place: row.lat + "," + row.lon,
				name: row.place
			});
		});
		console.log(JSON.stringify(communities, null, 2));
	});
