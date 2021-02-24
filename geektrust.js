const readFileSync = require("fs").readFileSync;
const { processCommands } = require("./src/processCommands");

const main = function () {
	const path = process.argv[2];
	const input = readFileSync(path, "utf-8").trim();
	const commands = input.split("\r\n");
	const result = processCommands(commands);
	console.log(result.join("\n"));
};
main();
