const { Family } = require("./family");
const presetFamily = require("../presetFamily.json");
const { ADD_CHILD, GET_RELATIONSHIP } = require("./constants");

const performOperation = function (family, operation, args) {
	switch (operation) {
		case ADD_CHILD:
			return family.addChild(...args);
		case GET_RELATIONSHIP:
			return family.getRelationship(...args);
		default:
			return;
	}
};

const processCommands = function (commands) {
	const family = new Family(presetFamily);
	let result = [];
	for (const command of commands) {
		const [operaion, ...args] = command.split(" ");
		result.push(performOperation(family, operaion, args));
	}
	return result;
};

module.exports = { performOperation, processCommands };
