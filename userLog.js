const userData = require('./userData');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
// creating the main menu fuction
function mainMenu() {
    console.log('\nMain Menu:');
    console.log('1. Register');
    console.log('2. Login');
    console.log('3. Exit');

    readline.question('Enter your choice: ', async (choice) => {
        switch (choice) {
            case '1':
                readline.question('Enter your name: ', (name) => {
                    readline.question('Enter your email: ', (email) => {
                        readline.question('Enter your password: ', async (password) => {
                            await userData.registerUser(name, email, password);
                            mainMenu();
                        });
                    });
                });
                break;

            case '2':  // Login Implementation
                readline.question('Enter your email: ', async (email) => {
                    readline.question('Enter your password: ', async (password) => {
                        const user = await userData.loginUser(email, password);
                        if (user) {
                            console.log('Login successful!');
                            userMenu(user); // Call userMenu after successful login
                        } else {
                            console.log('Invalid email or password.');
                            mainMenu(); // Show main menu again
                        }
                    });
                });
                break;

            case '3':
                console.log('Exiting...');
                readline.close();
                break;

            default:
                console.log('Invalid choice.');
                mainMenu();
        }
    });
}

function userMenu(user) { // it adds userMenu function
    console.log('\nUser Menu:');
    console.log('1. View Profile');
    console.log('2. Logout');
    console.log('3. Exit');

    readline.question('Enter your choice: ', (choice) => {
        switch (choice) {
            case '1':
                console.log(`\nUser Profile:\nName: ${user.name}\nEmail: ${user.email}`);
                userMenu(user); // it displays the user menu again
                break;
            case '2':
                console.log('Logged out successfully!');
                mainMenu(); // it returns to the main menu
                break;
            case '3':
                console.log('Exiting...');
                readline.close(); // it closes the readline interface
                break;
            default:
                console.log('Invalid choice.');
                userMenu(user); // it displays the user menu again
        }
    });
}

mainMenu();
