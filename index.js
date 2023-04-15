const http = require("node:http");
const child_process = require("node:child_process");
const PORT = process.env.PORT || 3000;

http
	.createServer((req, res) => {
		const url = req.url;

		if (url == "/") {
			res
				.writeHead(200, { "Content-Type": "text/plain" })
				.end("Welcome On Board!");
		} else if (url == "/slow-work") {
			res.writeHead(200, { "Content-Type": "text/html" });
			const slowWorkHandler = child_process.fork(`${__dirname}/hardwork.js`);
			slowWorkHandler.on("message", (m) => {
				if (m.type == "hardwork-done") {
					res.end(m.result);
				} else if (m.type == "hardwork-error") {
					console.log("an error occured while reading html file");
					console.error(m.error);
				}
			});
		}
	})
	.listen(PORT, () => {
		console.log(`server running on port ${PORT}`);
	});
