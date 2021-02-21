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
		if (!parent) return null;

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

	getSiblingsOf(name) {
		const motherName = this.family[name].mother;
		const children = motherName ? this.family[motherName].children : [];
		return children.filter((child) => child !== name);
	}
}

module.exports = { Family };
