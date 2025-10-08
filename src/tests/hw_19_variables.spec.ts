interface ICredentials {
  username: string;
  password: string;
}

const validCredentials: ICredentials[] = [
    { username: 'user1', password: 'Password1' },
    { username: 'user2', password: 'Password2' },
    { username: 'user3', password: 'Password3' },
];

const invalidCredentials: ICredentials[] = [
    { username: 'us', password: 'Password1' }, // too short username
    { username: 'user4', password: 'pass' }, // too short password
    { username: ' user5 ', password: 'Password1' }, // username with spaces
    { username: 'user6', password: 'password' }, // password without uppercase
    { username: 'user7', password: 'PASSWORD' }, // password without lowercase
    { username: 'user8', password: '        ' }, // password with only spaces
];


const selectors = {
    loginForm: {
        usernameInput: 'page.locator("#username") input[name="username"]',
        passwordInput: 'input[name="password"]',
        registerButton: 'button[type="submit"]',
        notification: '#notification',
    },
    registerForm: {
        usernameInput: 'input[name="username"]',
        passwordInput: 'input[name="password"]',
        registerButton: 'button[type="submit"]',
        notification: '#notification',
    }
};

enum NOTIFICATIONS {
  REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  SHORT_PASS = "Password should contain at least 8 characters",
  SHORT_USERNAME = "Username should contain at least 3 characters",
  SPACES_PREFIX_OR_POSTFIX_USERNAME = "Prefix and postfix spaces are not allowed is username",
  ONLY_SPACES_PASS = "Password is required",
  ONLY_SPACES_USERNAME = "Prefix and postfix spaces are not allowed is username",
  WITHOUT_UPPER_PASS = "Password should contain at least one character in upper case",
  WITHOUT_LOWER_PASS = "Password should contain at least one character in lower case",
  EMPTY_PASS = "Password is required",
  EMPTY_USERNAME = "Username is required",
}

export { ICredentials, selectors, NOTIFICATIONS };

