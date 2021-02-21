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

	getChildren(motherName) {
		const mother = this.family[motherName];
		if (!mother || mother.gender === "male") {
			return "PERSON_NOT_FOUND";
		}
		return [...mother.children];
	}
}

module.exports = { Family };
