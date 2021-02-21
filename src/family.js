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

	getChildren(motherName) {
		const mother = this.getMother(motherName);
		if (!mother) {
			return "PERSON_NOT_FOUND";
		}
		return [...mother.children];
	}
}

module.exports = { Family };
