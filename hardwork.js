const fs = require("fs");
let count = 0;

for (let j = 0; j < 600000000; j++) {
	count += 5;
}

fs.readFile(
	`${__dirname}/simplePage.html`,
	{ encoding: "utf-8" },
	(error, data) => {
		if (error) {
			process.send({ type: "hardwork-error", error });
		} else if (data) {
			const dataHTMLTemplate = data.replace(/{{count}}/, `${count}`);
			process.send({ type: "hardwork-done", result: dataHTMLTemplate });
		}
	},
);
