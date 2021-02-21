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

		it("Should return false when family member doesn't exists", () => {
			assert.isTrue(family.doesMemberExists("Shan"));
		});
	});

	describe("getChildren", () => {
		it("Should return children list when mother exists in family", () => {
			const actualChildren = family.getChildren("Anga");
			const expectedChildren = ["Chit", "Ish", "Vich", "Aras", "Satya"];
			assert.deepStrictEqual(actualChildren, expectedChildren);
		});

		it("Should return failure message when mother doesn't exists in family", () => {
			const actualChildren = family.getChildren("NotMother");
			const expectedChildren = "PERSON_NOT_FOUND";
			assert.deepStrictEqual(actualChildren, expectedChildren);
		});
	});
	describe("getMother", () => {
		it("Should return mother when mother exists in family", () => {
			const actualMother = family.getMother("Anga");
			const expectedMother = {
				gender: "Female",
				husband: "Shan",
				children: ["Chit", "Ish", "Vich", "Aras", "Satya"],
			};
			assert.deepStrictEqual(actualMother, expectedMother);
		});

		it("Should return null when mother doesn't exists in family", () => {
			const actualMother = family.getMother("NotMother");
			const expectedMother = null;
			assert.deepStrictEqual(actualMother, expectedMother);
		});

		it("Should return null when member exists but not a female", () => {
			const actualMother = family.getMother("Shan");
			const expectedMother = null;
			assert.deepStrictEqual(actualMother, expectedMother);
		});
	});
});
