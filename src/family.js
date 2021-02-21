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
		if (!children) return "PERSON_NOT_FOUND";

		const son = children.filter(
			(child) => this.family[child].gender === "Male"
		);

		return son[0] ? son : ["NONE"];
	}

	getDaughterOf(parentName) {
		const children = this.getChildrenOf(parentName);
		if (!children) return "PERSON_NOT_FOUND";

		const daughter = children.filter(
			(child) => this.family[child].gender === "Female"
		);

		return daughter[0] ? daughter : ["NONE"];
	}

	getSiblingOf(name) {
		const motherName = this.family[name].mother;
		const children = motherName ? this.family[motherName].children : [];
		return children.filter((child) => child !== name);
	}
}

module.exports = { Family };
