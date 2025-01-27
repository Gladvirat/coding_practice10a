const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const path = require('path')
const bcrypt = require('bcrypt')

const databasePtah = path.join(__dirname, 'userData.db');

const app = express();

app.use(express.json())

let datbase = null;

const initializeDbAndServer = async () => {
    try {
        database = await open({
            filename: databasePtah,
            driver: sqlite3.Database,
        });

        app.listen(3000, () => 
        console.log("Server Running at http://localhost:3000/")
        
        );
        
        } catch (error) {

            console.log(`DB Error: ${error.message}`;);
            process.exit(1);
        }
};

initializeDbAndServer();

const validatePassword = (password) => {
    return password.length > 4;

};

app.post("/register", async (request, response) => {
const { username, name, password, location } = request.body;

const hashedPassword = await bcrypt.hash(password, 10);
const selectUserQuery = `
SELECT
*
FROM 
user
WHERE
username = '${username}';`;

const databaseUser = await database.get(selectUserQuery);

if (databaseUser === undefined){
const createUserQuery = `

INSERT INTO
user (username, name, password, gender, location)
VALUES
(
'${username}',
'${name}',
'${hashedPassword}',
'${gender}',
'${location}'

);`;

if (validatePassword(password)) {
    await database.run(createUserQuery);
}


}
})
