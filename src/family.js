const {
	MALE,
	FEMALE,
	NONE,
	PERSON_NOT_FOUND,
	CHILD_ADDITION_FAILED,
	CHILD_ADDITION_SUCCEEDED,
} = require("./constants");

class Family {
	constructor(presetFamily = {}) {
		this.family = presetFamily;
	}

	doesMemberExists(name) {
		return this.family[name] !== undefined;
	}

	getChildrenOf(parentName) {
		const parent = this.family[parentName];
		const motherName = parent.gender === FEMALE ? parentName : parent.wife;
		return motherName ? this.family[motherName].children : [];
	}

	getSonOf(parentName) {
		const children = this.getChildrenOf(parentName);
		return children.filter((child) => this.family[child].gender === MALE);
	}

	getDaughterOf(parentName) {
		const children = this.getChildrenOf(parentName);
		return children.filter((child) => this.family[child].gender === FEMALE);
	}

	getSiblingsOf(name, siblingGender) {
		const motherName = this.family[name].mother;
		const children = motherName ? this.family[motherName].children : [];
		let sibling = children.filter((child) => child !== name);
		if (siblingGender) {
			sibling = sibling.filter(
				(child) => this.family[child].gender === siblingGender
			);
		}
		return sibling;
	}

	getBrothersOf(name) {
		return this.getSiblingsOf(name, MALE);
	}

	getSistersOf(name) {
		return this.getSiblingsOf(name, FEMALE);
	}

	getPaternalUncleOf(name) {
		const mother = this.family[name].mother;
		const father = mother ? this.family[mother].husband : undefined;
		return father ? this.getBrothersOf(father) : [];
	}

	getPaternalAuntOf(name) {
		const mother = this.family[name].mother;
		const father = mother ? this.family[mother].husband : undefined;
		return father ? this.getSistersOf(father) : [];
	}

	getMaternalUncleOf(name) {
		const mother = this.family[name].mother;
		return mother ? this.getBrothersOf(mother) : [];
	}

	getMaternalAuntOf(name) {
		const mother = this.family[name].mother;
		return mother ? this.getSistersOf(mother) : [];
	}

	getSpouseOf(name) {
		const person = this.family[name];
		return person.gender === MALE ? person.wife : person.husband;
	}

	getSiblingsOfSpouse(spouseName, siblingGender) {
		const partner = this.getSpouseOf(spouseName);
		return partner ? this.getSiblingsOf(partner, siblingGender) : [];
	}

	getSpouseOfSiblings(siblingName, spouseGender) {
		const siblingGender = spouseGender === MALE ? FEMALE : MALE;
		const siblings = this.getSiblingsOf(siblingName, siblingGender);
		const spouses = siblings.map((sibling) => this.getSpouseOf(sibling));
		return spouses.filter((spouse) => spouse);
	}

	getBrotherInLawOf(name) {
		const brothersOfSpouse = this.getSiblingsOfSpouse(name, MALE);
		const husbandOfSiblings = this.getSpouseOfSiblings(name, MALE);
		return [...brothersOfSpouse, ...husbandOfSiblings];
	}

	getSisterInLawOf(name) {
		const sistersOfSpouse = this.getSiblingsOfSpouse(name, FEMALE);
		const wifeOfSiblings = this.getSpouseOfSiblings(name, FEMALE);
		return [...sistersOfSpouse, ...wifeOfSiblings];
	}

	addChild(motherName, childName, gender) {
		if (!this.doesMemberExists(motherName)) {
			return PERSON_NOT_FOUND;
		}

		const mother = this.family[motherName];
		if (!(mother.gender === FEMALE) || this.doesMemberExists(childName)) {
			return CHILD_ADDITION_FAILED;
		}

		mother.children.push(childName);
		this.family[childName] = { gender: gender, mother: motherName };
		if (gender === FEMALE) {
			this.family[childName].children = [];
		}
		return CHILD_ADDITION_SUCCEEDED;
	}

	getRelationship(name, relationship) {
		if (!this.doesMemberExists(name)) {
			return PERSON_NOT_FOUND;
		}
		const relation = relationship.replace(/-/g, "");
		const method = `get${relation}Of`;
		let result = this[method](name);
		result = result[0] ? result : [NONE];
		return result.join(" ");
	}
}

module.exports = { Family };
