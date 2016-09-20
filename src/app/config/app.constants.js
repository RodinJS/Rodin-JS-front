/**
 * Created by kh.levon98 on 13-Sep-16.
 */
const AppConstants = {
	env: "dev",
	prodAPI: 'http://192.168.0.30:3000/api',
	devAPI: 'http://127.0.0.1:3000/api',
	jwtKey: 'jwtToken',
	appName: 'Rodin',
	ERRORCODES: {
		300: {
			message: 'Oops! Something want wrong, please try again later.',
			field: ""
		},
		302: {
			message: 'access-token does not provided',
			field: ['token']
		},
		303: {
			message: 'unknown token',
			field: ['token']
		},
		310: {
			message: 'Wrong username or password',
			field: ""
		},
		311: {
			message: 'user with email already exists',
			field: ['email']
		},
		312: {
			message: 'user not found',
			field: ""
		},
		313: {
			message: `space not found`,
			field: ['space']
		},
		314: {
			message: 'you don\'t have access to this space',
			field: ['space']
		},
		315: {
			message: 'user\'s team not found',
			field: ['team']
		},
		316: {
			message: 'Cant send email. Please try again later.',
			field: ''
		},
		317: {
			message: 'user with email not found',
			field: ['email']
		},
		318: {
			message: 'Unknown reset code, please fill forgot form again.',
			field: ['code']
		},
		319: {
			message: 'user with username ${username} not found',
			field: ['username']
		},
		320: {
			message: 'invalid password',
			field: ['oldPassword']
		},
		321: {
			message: 'permission denied',
			field: ['permission']
		},
		322: {
			message: 'admin permission required for this query',
			field: ['permission']
		},
		323: {
			message: 'User is already in team.',
			field: ''
		},
		324: {
			message: 'You cant add yourself to your team.',
			field: ''
		}
	}
};

export default AppConstants;
