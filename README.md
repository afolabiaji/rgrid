##R-Grid Code

The repository is split into two files: frontend and backend

Backend requires .env file for variables, here is an example:

```
DB_HOST='localhost'
DB_USER='postgres'
DB_PASS=''
DB_NAME='rgrid'
SENDINBLUE_API_KEY='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'
EMAIL_VERIFY_SECRET='supersecretsecret'
USER_LOGIN_SECRET='loginsecret'
EMAIL_USER="email@gmail.com"
EMAIL_PASS="password"
```
This saves credentials for db connecion, email and login.

Begin backend server:
```
cd backend
npm install 
nodemon app
```

Begin frontend server:
```
cd frontend
npm install 
npm start
```