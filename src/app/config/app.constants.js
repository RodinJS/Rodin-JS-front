/**
 * Created by kh.levon98 on 13-Sep-16.
 */
import '../helpers';

const AppConstants = {
    env: 'local',
    jwtKey: 'token',
    appName: 'Rodin',


    local: {
        COOKIEDOMAIN: ['localhost', '.rodin.space'],
        SOCKET: 'http://localhost:4000/api',
        API: 'http://localhost:3000/api',
        RECORDIP: '178.62.229.191',
        // API: 'http://192.168.0.33:3000/api', // Xcho
        SITE: 'http://localhost:8585/',
        PREVIEW: 'https://rodin.space/projects/',
        PUBLIC: 'https://rodin.space/public/',
        PUBLISH: 'https://rodin.space',
        EDITOR: 'http://localhost:8000/#/',
        FB: '216861662081500', //'' '216982868736046'
        GITHUB: '2350afe57c144672285b',
        GOOGLE: '442135244308-of5f6micijmgcf5196f1g3di39ivq8cp.apps.googleusercontent.com',
        SAMPLES: 'https://examples.rodin.space/list.json',
    },
    dev: {
        COOKIEDOMAIN: ['.rodin.space'],
        SOCKET: 'https://ss.rodin.space/api',
        API: 'https://api.rodin.space/api',
        RECORDIP: '178.62.229.191',
        SITE: 'https://rodin.space/',
        PREVIEW: 'https://rodin.space/projects/',
        PUBLIC: 'https://rodin.space/public/',
        PUBLISH: 'https://rodin.space',
        EDITOR: 'https://editor.rodin.space/',
        FB: '216982868736046', //'216861662081500' '216982868736046'
        GITHUB: 'fa69c03ad5758fce1f10',
        GOOGLE: '442135244308-of5f6micijmgcf5196f1g3di39ivq8cp.apps.googleusercontent.com',
        SAMPLES: 'https://examples.rodin.space/list.json',
    },
    prod: {
        COOKIEDOMAIN: ['.rodinapp.com', '.rodin.io', '.rodin.space'],
        API: `${window.location.protocol}//api.${window.extractDomain()}/api`,
        SOCKET: `${window.location.protocol}//ss.rodin.space/api`,
        SITE: `${window.location.protocol}//${window.extractDomain()}/`,
        PREVIEW: `${window.location.protocol}//${window.extractDomain()}/projects/`,
        PUBLIC: `${window.location.protocol}//${window.extractDomain()}/public/`,
        PUBLISH: `${window.location.protocol}//${window.extractDomain()}`,
        EDITOR: `${window.location.protocol}//editor.${window.extractDomain()}/`,
        RECORDIP: '138.197.41.119',
        FB: '214577345643265',
        GITHUB: 'd2030c37902fa3d4d0c7',
        GOOGLE: '442135244308-of5f6micijmgcf5196f1g3di39ivq8cp.apps.googleusercontent.com',
        SAMPLES: 'https://examples.rodin.io/list.json',
    },

    stage: {
        COOKIEDOMAIN: ['rodin.design'],
        API: `${window.location.protocol}//api.${window.extractDomain()}/api`,
        SOCKET: `${window.location.protocol}//ss.rodin.space/api`,
        SITE: `${window.location.protocol}//${window.extractDomain()}/`,
        PREVIEW: `${window.location.protocol}//${window.extractDomain()}/projects/`,
        PUBLIC: `${window.location.protocol}//${window.extractDomain()}/public/`,
        PUBLISH: `${window.location.protocol}//${window.extractDomain()}`,
        EDITOR: `${window.location.protocol}//editor.${window.extractDomain()}/`,
        RECORDIP: '178.62.211.113',
        FB: '263064010794598',
        GITHUB: '5377f212205e0aa4b4cf',
        GOOGLE: '442135244308-of5f6micijmgcf5196f1g3di39ivq8cp.apps.googleusercontent.com',
        SAMPLES: 'https://examples.rodin.design/list.json',
    },

    get FB() {
        return this[this.env].FB;
    },

    get RECORDIP() {
        return this[this.env].RECORDIP;
    },

    get GITHUB() {
        return this[this.env].GITHUB;
    },

    get GOOGLE() {
        return this[this.env].GOOGLE;
    },

    get API() {
        return this[this.env].API;
    },

    get SOCKET() {
        return this[this.env].SOCKET;
    },

    get SITE() {
        return this[this.env].SITE;
    },

    get PREVIEW() {
        return this[this.env].PREVIEW;
    },

    get PUBLIC() {
        return this[this.env].PUBLIC;
    },

    get PUBLISH() {
        return this[this.env].PUBLISH;
    },

    get EDITOR() {
        return this[this.env].EDITOR;
    },

    get COOKIEDOMAIN() {
        return this[this.env].COOKIEDOMAIN;
    },

    get SAMPLES() {
        return this[this.env].SAMPLES;
    },
    ERRORCODES: {
        500: {
            message: 'INTERNAL_SERVER_ERROR',
            field: '',
        },
        400: {
            message: 'BAD_REQUEST',
            field: '',
        },
        404: {
            message: 'NOT_FOUND',
            field: '',
        },
        309: {
            message: 'PROJECT_EXIST',
            field: '',
        },
        //////
        310: {
            message: 'WRONG_USERNAME_OR_PASSWORD',
            field: '',//["username", "email"]
        },
        311: {
            message: 'EMAIL_EXISTS',
            field: 'Username or Email already exists',
        },
        312: {
            message: 'USER_WITH_ID_NOT_FOUND',
            field: 'id',
        },
        313: {
            message: 'PROJECT_WITH_ID_NOT_FOUND',
            field: 'id',
        },
        314: {
            message: 'ACCESS_TO_PROJECT_DENIED',
            field: '',
        },
        315: {
            message: 'TOKEN_DOES_NOT_PROVIDED',
            field: 'token',
        },
        316: {
            message: 'UNKNOWN_TOKEN',
            field: 'token',
        },
        317: {
            message: 'ORGANIZATION_NOT_FOUND',
            field: 'organization',
        },
        318: {
            message: 'EMAIL_SEND_ERROR',
            field: '',
        },
        319: {
            message: 'USER_WITH_EMAIL_NOT_FOUND',
            field: 'email',
        },
        320: {
            message: 'UNKNOWN_RESET_PASSWORD_CODE',
            field: 'reset_code',
        },
        321: {
            message: 'USER_WITH_USERNAME_NOT_FOUND',
            field: 'username',
        },
        322: {
            message: 'INVALID_PASSWORD',
            field: '',
        },
        323: {
            message: 'ORGANIZATION_PERMISSION_DENIED',
            field: '',
        },
        324: {
            message: 'ADMIN_PERMISSION_REQUIRED',
            field: '',
        },
        325: {
            message: 'USER_ALREADY_IN_ORGANIZATION',
            field: '',
        },
        326: {
            message: 'ADD_YOURSELF_TO_YOUR_ORGANIZATION',
            field: '',
        },
        327: {
            message: 'SOMETHING_WENT_WRONG',
            field: '',
        },
        350: {
            message: 'NO_GITHUB_ACCOUNT',
            field: '',
        },
        352: {
            message: 'REPO_NAME_EXISTS',
            field: '',
        },
        353: {
            message: 'REPO_DOES_NOT_EXIST',
            field: '',
        },
        601: {
            message: 'UNKNOWN_SOCKET_CHANNEL',
            field: '',
        },
        602: {
            message: 'UNKNOWN_SOCKET_ROOM',
            field: '',
        },
        603: {
            message: 'PERMISSION_SOCKET_DENIED',
            field: '',
        },
        604: {
            message: 'UNKNOWN_SOCKET_ACTION',
            field: '',
        },   // FILEREADERR: {
        //     message: `Build failed. Please drop an email to support including your build ID`,
        // },
        // FILEWRITEERR: {
        //     message: `Build failed. Please drop an email to support including your build ID`,
        // },
        // MKDIRERR: {
        //     message: `Build failed. Please drop an email to support including your build ID`,
        // },
        // RMDIRERR: {
        //     message: `Build failed. Please drop an email to support including your build ID`,
        // },
        // RMERROR: {
        //     message: `Build failed. Please drop an email to support including your build ID`,
        // },
        // CPERR: {
        //     message: `Build failed. Please drop an email to support including your build ID`,
        // },
        // BUILDERROR: {
        //     message: `Build failed. Please drop an email to support including your build ID`,
        // },
        // CLEANERROR: {
        //     message: `Build failed. Please drop an email to support including your build ID`,
        // },
        CERTIMPORTERROR: {
            message: `Build failed. Invalid certificate`,
        },
        OTHERBUILDERROR: {
            message: `Build failed. Please drop an email to support including your build ID`,
        }
    },
    FORMERRORS: {
        register: {
            username: 'Username must contain at least 3 characters',
            email: 'Invalid email',
            password: 'Passwords must be at least 8 characters long, containing a number and letter',
            confirmPassword: 'Password does not match',
            invitationCode: 'Invalid invitation code'
        },
        reset: {
            usernameEmail: 'Please enter username or email',
            password: 'Passwords must be at least 8 characters long, containing a number and letter',
            confirmPassword: 'Password does not match',
        },
        project: {
            github: 'URL is invalid',
            name: 'Project name must contain at least 3 characters',
            url: 'Project URL must be alphanumeric with no spaces',
            description: 'Description is required'
        }
    }
};

export default AppConstants;
