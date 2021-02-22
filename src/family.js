class Family {
	constructor(presetFamily = {}) {
		this.family = presetFamily;
	}

	get getFamily() {
		return { ...this.family };
	}

	doesMemberExists(name) {
		return this.family[name] !== undefined;
	}

	getMother(motherName) {
		const mother = this.family[motherName];
		if (!mother || mother.gender === "Male") {
			return null;
		}
		return { ...mother };
	}

	getChildrenOf(parentName) {
		const parent = this.family[parentName];
		const motherName = parent.gender === "Female" ? parentName : parent.wife;
		return motherName ? this.family[motherName].children : [];
	}

	getSonOf(parentName) {
		const children = this.getChildrenOf(parentName);
		return children.filter((child) => this.family[child].gender === "Male");
	}

	getDaughterOf(parentName) {
		const children = this.getChildrenOf(parentName);
		return children.filter((child) => this.family[child].gender === "Female");
	}

	getSiblingsOf(name, siblingGender) {
		const motherName = this.family[name].mother;
		const children = motherName ? this.family[motherName].children : [];
		return children.filter(
			(child) => child !== name && this.family[child].gender === siblingGender
		);
	}

	getBrothersOf(name) {
		return this.getSiblingsOf(name, "Male");
	}

	getSistersOf(name) {
		return this.getSiblingsOf(name, "Female");
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

	getWifeOf(name) {
		return this.family[name].wife;
	}

	getHusbandOf(name) {
		return this.family[name].husband;
	}

	getSpouseOf(name) {
		const person = this.family[name];
		return person.gender === "Male" ? person.wife : person.husband;
	}

	getSiblingsOfSpouse(spouseName, siblingGender) {
		const partner = this.getSpouseOf(spouseName);
		return partner ? this.getSiblingsOf(partner, siblingGender) : [];
	}

	getSpouseOfSiblings(siblingName, spouseGender) {
		const siblingGender = spouseGender === "Male" ? "Female" : "Male";
		const siblings = this.getSiblingsOf(siblingName, siblingGender);
		const spouses = siblings.map((sibling) => this.getSpouseOf(sibling));
		return spouses.filter((spouse) => spouse);
	}

	getBrotherInLawOf(name) {
		const brothersOfSpouse = this.getSiblingsOfSpouse(name, "Male");
		const husbandOfSiblings = this.getSpouseOfSiblings(name, "Male");
		return [...brothersOfSpouse, ...husbandOfSiblings];
	}

	getSisterInLawOf(name) {
		const sistersOfSpouse = this.getSiblingsOfSpouse(name, "Female");
		const wifeOfSiblings = this.getSpouseOfSiblings(name, "Female");
		return [...sistersOfSpouse, ...wifeOfSiblings];
	}
}

module.exports = { Family };
