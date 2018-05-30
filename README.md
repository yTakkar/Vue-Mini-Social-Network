# Peterbook
A social network centered around user privacy and security!

# Quick liks
1. [Screenshots](#screenshots)
2. [Usage](#usage)

# Usage
1. First install all dependencies:
    ```bash
    # with npm
    npm install
    
    # or with yarn
    yarn
    ```
2. For windows, Install PhpMyAdmin, create a database and import db.sql 

3. For MacOS,
   - Install MySql and run the MySql server. Remember your password for 'root' 
   - Install the mysql cli using `brew install mysql`
   - Run the following:
        ```bash
           $ mysql -u root -p
           <enter password>
           create database peterbook
        ```
   -  Import the database from db.sql
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
