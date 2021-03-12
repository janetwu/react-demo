import * as types from "../action-types";

export const setUserToken = (token) => {
	return {
		type: types.USER_SET_USER_TOKEN,
		token,
	};
};