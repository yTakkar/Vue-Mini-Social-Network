# Peterbook
A social network centered around user privacy and security!

# Quick liks
1. [Screenshots](#screenshots)
2. [Usage](#usage)

# Screenshots
![alt text](https://raw.githubusercontent.com/yTakkar/Vue-Mini-Social-Network/master/screenshots/Snap%202017-10-05%20at%2020.16.51.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Vue-Mini-Social-Network/master/screenshots/Snap%202017-10-05%20at%2020.18.27.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Vue-Mini-Social-Network/master/screenshots/Snap%202017-10-06%20at%2001.16.37.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Vue-Mini-Social-Network/master/screenshots/Snap%202017-10-05%20at%2020.17.04.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Vue-Mini-Social-Network/master/screenshots/Snap%202017-10-05%20at%2020.17.21.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Vue-Mini-Social-Network/master/screenshots/Snap%202017-10-05%20at%2020.17.39.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Vue-Mini-Social-Network/master/screenshots/Snap%202017-10-05%20at%2020.17.48.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Vue-Mini-Social-Network/master/screenshots/Snap%202017-10-05%20at%2020.17.58.png)
![alt text](https://raw.githubusercontent.com/yTakkar/Vue-Mini-Social-Network/master/screenshots/Snap%202017-10-05%20at%2020.18.39.png)

# Usage
1. First install all dependencies:
    ```bash
    # with npm
    npm install
    
    # or with yarn
    yarn
    ```
For Windows:
2. Install PhpMyAdmin, create a database and import db.sql 

For MACOS: 
2. a. Install MySql and run the MySql server. Remember your password for 'root' 
   b. Install the mysql cli using `brew install mysql`
   c. Run the following:
        ```bash
           $ mysql -u root -p
           <enter password>
           create database peterbook
        ```
   d. Import the database from db.sql
      ```bash
      $ mysql -u username -p peterbook < db.sql


3. Create a `.env` file and insert the following code. Replace values with yours!!

    ```javascript
    PORT=YOUR_PORT
    MYSQL_HOST="localhost"
    MYSQL_USER="root"
    MYSQL_PASSWORD="your password"
    MYSQL_DATABASE="peterbook"
    SESSION_SECRET_LETTER="anything-secret"
    ```
    
4. Start the server
    ```javascript
    npm start [OR] yarn start
    ```

5. Now run the app
    ```javacript
    localhost:[PORT] PORT=3917 (By default)
    ```

6. Enjoy!!
