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
}

module.exports = { Family };
