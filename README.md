# SpeakEasy
A social network centered around user privacy and security!

# Quick liks
1. [Usage](#usage)
2. [Common Issues](#common-issues)
3. [Database Structure](#database-structure)
4. [Backend Implementation](#backend-implementation)

# Usage
1. <mark>First install all dependencies:</mark> black pather
    ```bash
    # Install Node.js and npm first. 
    # Node: https://nodejs.org/en/download/current/ 
    # npm: https://www.npmjs.com/get-npm

    # with npm
    npm install
    
    # or with yarnasdfas
    yarn
    ```
2. For windows, Install PhpMyAdmin, import db.sql.

3. For MacOS,
   - [Install MySql](https://dev.mysql.com/downloads/mysql/) and run the MySql server. Remember your password for 'root' 
   - Install the mysql cli using `brew install mysql`
   - Import the database from db.sql. You can run the command whenever you want to reset the database
      ```bash
      $ mysql -u username -p < db.sql
      ```


4. Create a `.env` file and insert the following code. Replace values with yours!!

    ```javascript
    PORT="YOUR_PORT"
    MYSQL_HOST="localhost"
    MYSQL_USER="root"
    MYSQL_PASSWORD="YOUR_PASSWORD"
    MYSQL_DATABASE="peterbook"
    SESSION_SECRET_LETTER="ANYTHING_SECRET"
    ```
    
5. Start the server
    ```javascript
    npm start [OR] yarn start
    ```

6. Now run the app
    ```javacript
    localhost:[PORT] PORT=3917 (By default)
    ```

7. Enjoy!!

# Common Issues
1. ER_MIX_OF_GROUP_FUNC_AND_FIELDS:
    It is related to your SQL_MODE. Run following in your mysql:
    ```bash
      mysql> SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
    ```

# Database Structure
1. Table ***users***  

| id | username | email | password | bio | joined |
| ---------- | ----------- | ---------- | ----------- | ---------- | ----------- |
| Unique | Unique | Unique | Hash value of user's password | Text | The time when user joined |

2. Table ***follow_system***  

|follow_id|follow_by|follow_by_username|follow_to|follow_to_username|follow_time|confirmed|
| --- | --- | --- | --- | --- | --- | --- |
|Unique|Follower's id|Follower's name|Followed's id|Followed's name|When this follow is created|If followed user confirms the follower|

3. Table ***likes***  

|like_id|like_by|like_by_username|post_id|like_time|
| --- | --- | --- | --- | --- |
|Unique|Id of who does the 'like'|Username of who does the 'like'|Id of the post|When the 'like' happened|

4. Table ***posts***  

|post_id|user|username|title|content|post_created|
| ---- | ---- | ---- | ---- | ---- | ---- |
|Unique|Id of who makes the post|Name of who makes the post|Title of the post|Content of the post|When the postis published|

5. Table ***profile_views***  

|view_id|view_by|view_by_username|view_to|view_time|
| ---- | ---- | ---- | ---- | ---- |
|Unique|Id of who view the profile|Name of who view the profile|Id of the owner of the profile|When the view happened|

6. Table ***keys_system***  

| user_id | publickey | privatekey | aeskey |
| ---- | ---- | ---- | ---- |
|Id of the user who owns this set of keys|Public key of the user. It is used to encrypt the user's folloings' AES key.|Private key of the user. It is encrypted by user's password by AES.|AES key to encrypt/decrypt this user's posts. It is encrypted by user's public key|

7. Table ***encrypted_keys_system***  

|follow_by|follow_to|encryptedkey|
| --------- | --------- | ------------ |
|Follower's id|Followed user's id|The AES key to decrypt Followed user's posts. It is encrypted by follower's public key|


# Backend Implementation

## Sign up
User would be asked to provide username, password and email for signing up. The server will verify that there are no replicates of either username or email in the data base and then sign up the user. The server will save username, email and hashed password in the database. Each user will have a set of keys (an random-generated AES key and a pair of RSA keys) and an unique ID. The AES key will be used to encrypt/decrypt the user's posts. And the RSA keys will be used to encrypt/decrypt other users' AES keys. The AES key will be encrypted by the RSA public key and the RSA private key will be encrypted by user's password before they are saved to database. Since only user's password can decrypt the private RSA key and then decrypt the AES keys and then decrypt the posts, there is no way to get user's post even if full access permission to the database is granted because only hash value of user's password is saved in the database and there is no way to convert the hash value to the original password.

## Log in
User would be asked to provide username and password. Server will verify that the hash value of password matches the record in the database. If it is valid, the server will decrypt user's private RSA key and then AES key for encrypting/decrypting the user's post.

## Followers system
Users can only follow others after they get approved by others. After approval, they will get AES keys of others to see others' posts. Users also have permission to drop their followers. After drop, the followers will lose the access to the users' AES keys.  
For example, Amy wants to follow Bob. Before the steps are completed, Amy cannot see the any posts from Bob. Bob can accept Amy's following request. When the server receives the approval from Bob, it will encrypt Bob's AES key by Amy's public RSA key and save the encrypted key to the database. Now, if Amy wants to see posts from Bob, the server will use Amy's private RSA key to decrypt the encrypted AES key from Bob and use the AES key to decrypt Bob's posts. If Bob does not want Amy to follow him, he can send a drop request to server. Server will delete the following record along with the encrypted AES key from Bob to Amy in the database.
## Posts system
When user makes a post, the title and content of the post will be encrypted by user's AES key.