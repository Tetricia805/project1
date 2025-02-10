const fs = require('fs');
const bcrypt = require('bcrypt');
const usersFilePath = 'users.json';

function loadUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}

async function registerUser(name, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const users = loadUsers();
        const newUser = { name, email, password: hashedPassword };
        users.push(newUser);
        saveUsers(users);
        console.log('User registered successfully!');
        return;
    } catch (error) {
        console.error('Error registering user:', error);
        return;
    }
}

function getUserByEmail(email) {
    const users = loadUsers();
    return users.find((u) => u.email === email);
}

async function loginUser(email, password) {
    const user = getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
        return user; // Return the user object on successful login
    }
    return null; // Return null if login fails
}


module.exports = {
    registerUser,
    getUserByEmail,
    loginUser, // Export loginUser
};
