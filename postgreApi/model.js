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
	clearCount: {
		type: DataTypes.INTEGER,
	},
	missCount: {
		type: DataTypes.INTEGER,
	},
	average: {
		type: DataTypes.FLOAT,
	},
	rate: {
		type: DataTypes.FLOAT,
	},
}

export { resultModel }
