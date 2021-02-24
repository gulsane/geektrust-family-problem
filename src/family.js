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

	filterChildren(children, gender) {
		return children.filter((child) => this.family[child].gender === gender);
	}

	getChildrenOf(name, gender) {
		const parent = this.family[name];
		const mother = parent && parent.gender === MALE ? parent.wife : name;
		let children = mother ? this.family[mother].children : [];
		if (gender) {
			children = this.filterChildren(children, gender);
		}
		return children;
	}

	getSonOf(parentName) {
		return this.getChildrenOf(parentName, MALE);
	}

	getDaughterOf(parentName) {
		return this.getChildrenOf(parentName, FEMALE);
	}

	getSiblingsOf(name) {
		const motherName = this.family[name].mother;
		const children = this.getChildrenOf(motherName);
		return children.filter((child) => child !== name);
	}

	getPaternalRelation(name, gender) {
		const mother = this.family[name].mother;
		const father = mother ? this.family[mother].husband : undefined;
		const siblings = father ? this.getSiblingsOf(father) : [];
		return this.filterChildren(siblings, gender);
	}

	getPaternalUncleOf(name) {
		return this.getPaternalRelation(name, MALE);
	}

	getPaternalAuntOf(name) {
		return this.getPaternalRelation(name, FEMALE);
	}

	getMaternalRelation(name, gender) {
		const mother = this.family[name].mother;
		const siblings = mother ? this.getSiblingsOf(mother) : [];
		return this.filterChildren(siblings, gender);
	}

	getMaternalUncleOf(name) {
		return this.getMaternalRelation(name, MALE);
	}

	getMaternalAuntOf(name) {
		return this.getMaternalRelation(name, FEMALE);
	}

	getSpouseOf(name) {
		const person = this.family[name];
		return person.gender === MALE ? person.wife : person.husband;
	}

	getSiblingsOfSpouse(spouseName, siblingGender) {
		const partner = this.getSpouseOf(spouseName);
		const siblings = partner ? this.getSiblingsOf(partner) : [];
		return this.filterChildren(siblings, siblingGender);
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
