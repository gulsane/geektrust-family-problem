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
}

module.exports = { Family };
