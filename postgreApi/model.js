import { Sequelize, DataTypes } from "sequelize"

const resultModel = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	clearTime: {
		type: DataTypes.STRING,
	},
	missCount: {
		type: DataTypes.INTEGER,
	},
	average: {
		type: DataTypes.STRING,
	},
	rate: {
		type: DataTypes.STRING,
	},
}

export { resultModel }
