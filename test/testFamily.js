const assert = require("chai").assert;
const { Family } = require("../src/family");
const presetFamily = require("../presetFamily.json");

describe("#Family", () => {
	const family = new Family(new Object({ ...presetFamily }));

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
			const actualChildren = family.getChildrenOf("Anga", "Male");
			const expectedChildren = ["Chit", "Ish", "Vich", "Aras"];
			assert.deepStrictEqual(actualChildren, expectedChildren);
		});

		it("Should return children list when existing father name is provided", () => {
			const actualChildren = family.getChildrenOf("Shan", "Female");
			const expectedChildren = ["Satya"];
			assert.deepStrictEqual(actualChildren, expectedChildren);
		});

		it("Should return empty list when parent has no wife", () => {
			const actualChildren = family.getChildrenOf("Ish", "Male");
			const expectedChildren = [];
			assert.deepStrictEqual(actualChildren, expectedChildren);
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
		it("Should return brothers and sisters if sibling gender is not defined", () => {
			const actualSibling = family.getSiblingsOf("Dritha");
			const expectedSibling = ["Tritha", "Vritha"];
			assert.deepStrictEqual(actualSibling, expectedSibling);
		});

		it("Should return empty list when there is no mother of person", () => {
			const actualSibling = family.getSiblingsOf("Shan", "Male");
			const expectedSibling = [];
			assert.deepStrictEqual(actualSibling, expectedSibling);
		});

		it("Should return empty list when the child is the only child of mother", () => {
			const actualSibling = family.getSiblingsOf("Yodhan", "Male");
			const expectedSibling = [];
			assert.deepStrictEqual(actualSibling, expectedSibling);
		});

		it("Should return list of female siblings if there are female siblings", () => {
			const actualSibling = family.getSiblingsOf("Vritha", "Female");
			const expectedSibling = ["Dritha", "Tritha"];
			assert.deepStrictEqual(actualSibling, expectedSibling);
		});

		it("Should return list of male siblings if there are male siblings", () => {
			const actualSibling = family.getSiblingsOf("Asva", "Male");
			const expectedSibling = ["Vyas"];
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

	describe("getPaternalUncleOf", () => {
		it("Should return empty list when there is no father of person", () => {
			const actualPaternalUncle = family.getPaternalUncleOf("Shan");
			const expectedPaternalUncle = [];
			assert.deepStrictEqual(actualPaternalUncle, expectedPaternalUncle);
		});

		it("Should return empty list when person's father's has no brothers", () => {
			const actualPaternalUncle = family.getPaternalUncleOf("Lavnya");
			const expectedPaternalUncle = [];
			assert.deepStrictEqual(actualPaternalUncle, expectedPaternalUncle);
		});

		it("Should return list when person's father's has brothers", () => {
			const actualPaternalUncle = family.getPaternalUncleOf("Vasa");
			const expectedPaternalUncle = ["Vyas"];
			assert.deepStrictEqual(actualPaternalUncle, expectedPaternalUncle);
		});
	});

	describe("getPaternalAuntOf", () => {
		it("Should return empty list when there is no father of person", () => {
			const actualPaternalAunt = family.getPaternalAuntOf("Shan");
			const expectedPaternalAunt = [];
			assert.deepStrictEqual(actualPaternalAunt, expectedPaternalAunt);
		});

		it("Should return empty list when person's father's has no sister", () => {
			const actualPaternalAunt = family.getPaternalAuntOf("Yodhan");
			const expectedPaternalAunt = [];
			assert.deepStrictEqual(actualPaternalAunt, expectedPaternalAunt);
		});

		it("Should return list when person's father's has sisters", () => {
			const actualPaternalAunt = family.getPaternalAuntOf("Vasa");
			const expectedPaternalAunt = ["Atya"];
			assert.deepStrictEqual(actualPaternalAunt, expectedPaternalAunt);
		});
	});

	describe("getMaternalUncleOf", () => {
		it("Should return empty list when there is no mother of person", () => {
			const actualPaternalAunt = family.getMaternalUncleOf("Shan");
			const expectedPaternalAunt = [];
			assert.deepStrictEqual(actualPaternalAunt, expectedPaternalAunt);
		});

		it("Should return empty list when person's mother's has no brother", () => {
			const actualPaternalAunt = family.getMaternalUncleOf("Vila");
			const expectedPaternalAunt = [];
			assert.deepStrictEqual(actualPaternalAunt, expectedPaternalAunt);
		});

		it("Should return list when person's father's has brothers", () => {
			const actualPaternalAunt = family.getMaternalUncleOf("Asva");
			const expectedPaternalAunt = ["Chit", "Ish", "Vich", "Aras"];
			assert.deepStrictEqual(actualPaternalAunt, expectedPaternalAunt);
		});
	});

	describe("getMaternalAuntOf", () => {
		it("Should return empty list when there is no mother of person", () => {
			const actualPaternalAunt = family.getMaternalAuntOf("Shan");
			const expectedPaternalAunt = [];
			assert.deepStrictEqual(actualPaternalAunt, expectedPaternalAunt);
		});

		it("Should return empty list when person's mother's has no sister", () => {
			const actualPaternalAunt = family.getMaternalAuntOf("Asva");
			const expectedPaternalAunt = [];
			assert.deepStrictEqual(actualPaternalAunt, expectedPaternalAunt);
		});

		it("Should return list when person's father's has brothers", () => {
			const actualPaternalAunt = family.getMaternalAuntOf("Yodhan");
			const expectedPaternalAunt = ["Tritha"];
			assert.deepStrictEqual(actualPaternalAunt, expectedPaternalAunt);
		});
	});

	describe("getSpouseOf", () => {
		it("Should return husband name when partner is female", () => {
			const actualSpouse = family.getSpouseOf("Anga");
			const expectedSpouse = "Shan";
			assert.deepStrictEqual(actualSpouse, expectedSpouse);
		});

		it("Should return undefined when female has no husband", () => {
			const actualSpouse = family.getSpouseOf("Vila");
			assert.isUndefined(actualSpouse);
		});

		it("Should return wife name when partner is male", () => {
			const actualSpouse = family.getSpouseOf("Shan");
			const expectedSpouse = "Anga";
			assert.deepStrictEqual(actualSpouse, expectedSpouse);
		});

		it("Should return undefined when male has no wife", () => {
			const actualSpouse = family.getSpouseOf("Ahit");
			assert.isUndefined(actualSpouse);
		});
	});

	describe("getBrotherInLawOf", () => {
		it("Should return list of spouse's brother for male", () => {
			const actualBrotherInLaw = family.getBrotherInLawOf("Vyan");
			const expectedBrotherInLaw = ["Chit", "Ish", "Vich", "Aras"];
			assert.deepStrictEqual(actualBrotherInLaw, expectedBrotherInLaw);
		});

		it("Should return list of spouse's brother for female", () => {
			const actualBrotherInLaw = family.getBrotherInLawOf("Chitra");
			const expectedBrotherInLaw = ["Chit", "Ish", "Vich"];
			assert.deepStrictEqual(actualBrotherInLaw, expectedBrotherInLaw);
		});

		it("Should return list of siblings' husband for male", () => {
			const actualBrotherInLaw = family.getBrotherInLawOf("Vritha");
			const expectedBrotherInLaw = ["Jaya"];
			assert.deepStrictEqual(actualBrotherInLaw, expectedBrotherInLaw);
		});

		it("Should return list of siblings' husband for female", () => {
			const actualBrotherInLaw = family.getBrotherInLawOf("Tritha");
			const expectedBrotherInLaw = ["Jaya"];
			assert.deepStrictEqual(actualBrotherInLaw, expectedBrotherInLaw);
		});

		it("Should return empty list if female has no spouse and no siblings", () => {
			const actualBrotherInLaw = family.getBrotherInLawOf("Yodhan");
			const expectedBrotherInLaw = [];
			assert.deepStrictEqual(actualBrotherInLaw, expectedBrotherInLaw);
		});
	});

	describe("getSisterInLawOf", () => {
		it("Should return list of spouse's sister for male", () => {
			const actualSisterInLaw = family.getSisterInLawOf("Jaya");
			const expectedSisterInLaw = ["Tritha"];
			assert.deepStrictEqual(actualSisterInLaw, expectedSisterInLaw);
		});

		it("Should return list of spouse's sister for female", () => {
			const actualSisterInLaw = family.getSisterInLawOf("Chitra");
			const expectedSisterInLaw = ["Satya"];
			assert.deepStrictEqual(actualSisterInLaw, expectedSisterInLaw);
		});

		it("Should return list of siblings' wife for male", () => {
			const actualSisterInLaw = family.getSisterInLawOf("Chit");
			const expectedSisterInLaw = ["Lika", "Chitra"];
			assert.deepStrictEqual(actualSisterInLaw, expectedSisterInLaw);
		});

		it("Should return list of siblings' wife for female", () => {
			const actualSisterInLaw = family.getSisterInLawOf("Satya");
			const expectedSisterInLaw = ["Amba", "Lika", "Chitra"];
			assert.deepStrictEqual(actualSisterInLaw, expectedSisterInLaw);
		});

		it("Should return empty list if male has no spouse and no siblings", () => {
			const actualSisterInLaw = family.getSisterInLawOf("Yodhan");
			const expectedSisterInLaw = [];
			assert.deepStrictEqual(actualSisterInLaw, expectedSisterInLaw);
		});

		it("Should return empty list if female has no spouse and no siblings", () => {
			const actualSisterInLaw = family.getSisterInLawOf("Chika");
			const expectedSisterInLaw = [];
			assert.deepStrictEqual(actualSisterInLaw, expectedSisterInLaw);
		});
	});

	describe("getRelationship", () => {
		it("Should give person not found message when person don't exists", () => {
			const actualOutput = family.getRelationship("Someone", "Daughter");
			const expectedOutput = "PERSON_NOT_FOUND";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should give NONE when no person in relation found", () => {
			const actualOutput = family.getRelationship("Lika", "Son");
			const expectedOutput = "NONE";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should give output for relationship 'Daughter'", () => {
			const actualOutput = family.getRelationship("Shan", "Daughter");
			const expectedOutput = "Satya";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should give output for relationship 'Son'", () => {
			const actualOutput = family.getRelationship("Shan", "Son");
			const expectedOutput = "Chit Ish Vich Aras";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should give output for relationship 'Paternal-Uncle'", () => {
			const actualOutput = family.getRelationship("Ahit", "Paternal-Uncle");
			const expectedOutput = "Chit Ish Vich";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should give output for relationship 'Paternal-Aunt'", () => {
			const actualOutput = family.getRelationship("Ahit", "Paternal-Aunt");
			const expectedOutput = "Satya";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should give output for relationship 'Maternal-Uncle'", () => {
			const actualOutput = family.getRelationship("Atya", "Maternal-Uncle");
			const expectedOutput = "Chit Ish Vich Aras";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should give output for relationship 'Maternal-Aunt'", () => {
			const actualOutput = family.getRelationship("Yodhan", "Maternal-Aunt");
			const expectedOutput = "Tritha";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should give output for relationship 'Sister-In-Law'", () => {
			const actualOutput = family.getRelationship("Satvy", "Sister-In-Law");
			const expectedOutput = "Atya";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should give output for relationship 'Brother-In-Law'", () => {
			const actualOutput = family.getRelationship("Satvy", "Brother-In-Law");
			const expectedOutput = "Vyas";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});

		it("Should give output for relationship 'Siblings'", () => {
			const actualOutput = family.getRelationship("Chit", "Siblings");
			const expectedOutput = "Ish Vich Aras Satya";
			assert.deepStrictEqual(actualOutput, expectedOutput);
		});
	});

	describe("addChild", () => {
		it("Should return person not found message if mother not exists in family", () => {
			const actualMessage = family.addChild("NewMom", "NewChild", "Female");
			const expectedMessage = "PERSON_NOT_FOUND";
			assert.deepStrictEqual(actualMessage, expectedMessage);
			assert.isFalse(family.doesMemberExists("NewChild"));
		});
		it("Should return person child addition failure message if father name is given", () => {
			const actualMessage = family.addChild("Shan", "NewChild", "Female");
			const expectedMessage = "CHILD_ADDITION_FAILED";
			assert.deepStrictEqual(actualMessage, expectedMessage);
			assert.isFalse(family.doesMemberExists("NewChild"));
		});

		it("Should return child addition failure message if child already exists in family", () => {
			const actualMessage = family.addChild("Chitra", "Ahit", "Male");
			const expectedMessage = "CHILD_ADDITION_FAILED";
			assert.deepStrictEqual(actualMessage, expectedMessage);
		});

		it("Should return child addition success message when female child is added", () => {
			const actualMessage = family.addChild("Anga", "NewChild", "Female");
			const expectedMessage = "CHILD_ADDITION_SUCCEEDED";
			const actualChildren = family.getChildrenOf("Anga");
			const expectedChildren = [
				"Chit",
				"Ish",
				"Vich",
				"Aras",
				"Satya",
				"NewChild",
			];
			assert.deepStrictEqual(actualChildren, expectedChildren);
			assert.deepStrictEqual(actualMessage, expectedMessage);
			assert.isTrue(family.doesMemberExists("NewChild"));
		});

		it("Should return child addition success message when male child is added", () => {
			const actualMessage = family.addChild("Anga", "SecondChild", "Male");
			const expectedMessage = "CHILD_ADDITION_SUCCEEDED";
			const actualChildren = family.getChildrenOf("Anga");
			const expectedChildren = [
				"Chit",
				"Ish",
				"Vich",
				"Aras",
				"Satya",
				"NewChild",
				"SecondChild",
			];
			assert.deepStrictEqual(actualChildren, expectedChildren);
			assert.deepStrictEqual(actualMessage, expectedMessage);
			assert.isTrue(family.doesMemberExists("SecondChild"));
		});
	});
});
