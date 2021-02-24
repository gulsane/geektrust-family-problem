const assert = require("chai").assert;
const { performOperation, processCommands } = require("../src/processCommands");
const { Family } = require("../src/family");

describe("#processCommands", () => {
	describe("performOperation", () => {
		it("Should perform the 'ADD_CHILD' operation", () => {
			const mockedFunction = function (motherName, childName, gender) {
				return "CHILD_ADDITION_SUCCEEDED";
			};
			const family = new Family({});
			family.addChild = mockedFunction;

			const operation = "ADD_CHILD";
			const args = "Someone AgainSomeone Male";
			const actualOutput = performOperation(family, operation, args);
			const expectedOutput = "CHILD_ADDITION_SUCCEEDED";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should perform the 'GET_RELATIONSHIP' operation", () => {
			const mockedFunction = function (name, args) {
				return "NONE";
			};
			const family = new Family({});
			family.getRelationship = mockedFunction;

			const operation = "GET_RELATIONSHIP";
			const args = "Someone AgainSomeone Male";
			const actualOutput = performOperation(family, operation, args);
			const expectedOutput = "NONE";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should return 'OPERATION_NOT_FOUND' when operation not matched", () => {
			const family = new Family({});
			const operation = "WRONG_OPERATION";
			const args = "Someone AgainSomeone Male";
			const actualOutput = performOperation(family, operation, args);
			const expectedOutput = "OPERATION_NOT_FOUND";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});
	});

	describe("processCommands", () => {
		it("Should return the follwing expexted output for add child command", () => {
			const commands = [
				"ADD_CHILD Unknown Mukund Male",
				"ADD_CHILD Anga Mukund Male",
				"ADD_CHILD Shan Aria Male",
			];
			const actualOutput = processCommands(commands);
			const expectedOutput = [
				"PERSON_NOT_FOUND",
				"CHILD_ADDITION_SUCCEEDED",
				"CHILD_ADDITION_FAILED",
			];

			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should return the follwing expexted output for get relation command", () => {
			const commands = [
				"GET_RELATIONSHIP Satvy Sister-In-Law",
				"GET_RELATIONSHIP Ish Son",
				"GET_RELATIONSHIP Misha Daughter",
			];
			const actualOutput = processCommands(commands);
			const expectedOutput = ["Atya", "NONE", "PERSON_NOT_FOUND"];
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should return the follwing expexted output for combined command", () => {
			const commands = [
				"ADD_CHILD Satya Ketu Male",
				"GET_RELATIONSHIP Kriya Paternal-Uncle",
				"GET_RELATIONSHIP Satvy Brother-In-Law",
			];
			const actualOutput = processCommands(commands);
			const expectedOutput = [
				"CHILD_ADDITION_SUCCEEDED",
				"Asva Ketu",
				"Vyas Ketu",
			];
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});
	});
});
