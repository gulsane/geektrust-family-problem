const assert = require("chai").assert;
const { Family } = require("../src/family");
const presetFamily = require("../presetFamily.json");

describe("#Family", () => {
	const family = new Family(presetFamily);

	it("Should set family as empty if family is not provided", () => {
		const family = new Family();
		assert.deepStrictEqual(family.getFamily, {});
	});

	it("Should set family when family is provided", () => {
		const presetFamily = { Shan: { gender: "Male", wife: "Agna" } };
		const family = new Family(presetFamily);
		assert.deepStrictEqual(family.getFamily, presetFamily);
	});

	describe("doesMemberExists", () => {
		it("Should return true when family member exists", () => {
			assert.isTrue(family.doesMemberExists("Shan"));
		});

		it("Should return false when family member exists", () => {
			assert.isTrue(family.doesMemberExists("Shan"));
		});
	});
});
