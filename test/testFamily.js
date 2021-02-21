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

	describe("getChildrenOf", () => {
		it("Should return children list when existing mother name is provided", () => {
			const actualChildren = family.getChildrenOf("Anga");
			const expectedChildren = ["Chit", "Ish", "Vich", "Aras", "Satya"];
			assert.deepStrictEqual(actualChildren, expectedChildren);
		});

		it("Should return children list when existing father name is provided", () => {
			const actualChildren = family.getChildrenOf("Shan");
			const expectedChildren = ["Chit", "Ish", "Vich", "Aras", "Satya"];
			assert.deepStrictEqual(actualChildren, expectedChildren);
		});

		it("Should return null when parent name doesn't exists in family", () => {
			const actualChildren = family.getChildrenOf("NotParent");
			const expectedChildren = null;
			assert.deepStrictEqual(actualChildren, expectedChildren);
		});

		it("Should return empty list when parent has no wife", () => {
			const actualChildren = family.getChildrenOf("Ish");
			const expectedChildren = [];
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
