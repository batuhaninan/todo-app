const db = require("../models");
const User = db.user;
const UserController = require("../controllers/user.controller.js");

findUsernameByID = async (id) => {
	const data = await User.findByPk(id)
	const username = await data.username;
	return username;
}

addUsernameToData = async (data) => {
	const responses = await data.map(async (d) => {
		const username = await findUsernameByID(d.dataValues.userId);
		const response = await { ...d.dataValues, username }
		return await response
	})
	return Promise.all(responses)
}

addUsernameToSingleData = async (data) => {
	const username = await findUsernameByID(data.dataValues.userId);
	const response = await { ...data.dataValues, username }
	return await response
}


module.exports = {
	findUsernameByID,
	addUsernameToData,
	addUsernameToSingleData
}