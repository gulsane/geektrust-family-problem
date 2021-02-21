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
			assert.isFalse(family.doesMemberExists("NotMember"));
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

	describe("getSonOf", () => {
		it("Should return list if father and children are present in family", () => {
			const actualSon = family.getSonOf("Shan");
			const expectedSon = ["Chit", "Ish", "Vich", "Aras"];
			assert.deepStrictEqual(actualSon, expectedSon);
		});

		it("Should return list if mother and children are present in family", () => {
			const actualSon = family.getSonOf("Shan");
			const expectedSon = ["Chit", "Ish", "Vich", "Aras"];
			assert.deepStrictEqual(actualSon, expectedSon);
		});

		it("Should return empty list if parent has no son", () => {
			const actualSon = family.getSonOf("Ish");
			const expectedSon = [];
			assert.deepStrictEqual(actualSon, expectedSon);
		});
	});

	describe("getDaughterOf", () => {
		it("Should return list if father and children are present in family", () => {
			const actualDaughter = family.getDaughterOf("Shan");
			const expectedDaughter = ["Satya"];
			assert.deepStrictEqual(actualDaughter, expectedDaughter);
		});

		it("Should return list if mother and children are present in family", () => {
			const actualDaughter = family.getDaughterOf("Shan");
			const expectedDaughter = ["Satya"];
			assert.deepStrictEqual(actualDaughter, expectedDaughter);
		});

		it("Should return empty list if parent has no Daughter", () => {
			const actualDaughter = family.getDaughterOf("Ish");
			const expectedDaughter = [];
			assert.deepStrictEqual(actualDaughter, expectedDaughter);
		});
	});

	describe("getSiblingsOf", () => {
		it("Should return empty list when there is no mother of person", () => {
			const actualSibling = family.getSiblingsOf("Shan");
			const expectedSibling = [];
			assert.deepStrictEqual(actualSibling, expectedSibling);
		});

		it("Should return empty list when the child is the only child of mother", () => {
			const actualSibling = family.getSiblingsOf("Yodhan");
			const expectedSibling = [];
			assert.deepStrictEqual(actualSibling, expectedSibling);
		});

		it("Should return list of siblings if there are siblings", () => {
			const actualSibling = family.getSiblingsOf("Vritha");
			const expectedSibling = ["Dritha", "Tritha"];
			assert.deepStrictEqual(actualSibling, expectedSibling);
		});
	});

	describe("getBrothersOf", () => {
		it("Should return empty list when there is no mother of person", () => {
			const actualBrothers = family.getBrothersOf("Shan");
			const expectedBrothers = [];
			assert.deepStrictEqual(actualBrothers, expectedBrothers);
		});

		it("Should return empty list when the child is the only child of mother", () => {
			const actualBrothers = family.getBrothersOf("Yodhan");
			const expectedBrothers = [];
			assert.deepStrictEqual(actualBrothers, expectedBrothers);
		});

		it("Should return list of brothers if there are brothers", () => {
			const actualBrothers = family.getBrothersOf("Vyas");
			const expectedBrothers = ["Asva"];
			assert.deepStrictEqual(actualBrothers, expectedBrothers);
		});
	});

	describe("getSistersOf", () => {
		it("Should return empty list when there is no mother of person", () => {
			const actualSisters = family.getSistersOf("Shan");
			const expectedSisters = [];
			assert.deepStrictEqual(actualSisters, expectedSisters);
		});

		it("Should return empty list when the child is the only child of mother", () => {
			const actualSisters = family.getSistersOf("Yodhan");
			const expectedSisters = [];
			assert.deepStrictEqual(actualSisters, expectedSisters);
		});

		it("Should return list of Sisterss if there are sisters", () => {
			const actualSisters = family.getSistersOf("Ahit");
			const expectedSisters = ["Jnki"];
			assert.deepStrictEqual(actualSisters, expectedSisters);
		});
	});
});
