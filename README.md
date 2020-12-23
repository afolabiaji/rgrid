# R-Grid Code

The repository is split into two files: frontend and backend

## .env file
Backend requires .env file for variables, here is an example:

```
DB_HOST='localhost'
DB_USER='postgres'
DB_PASS=''
DB_NAME='rgrid'
SENDINBLUE_API_KEY='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'
EMAIL_VERIFY_SECRET='supersecretsecret'
USER_LOGIN_SECRET='loginsecret'
EMAIL_USER="af.ajibade@gmail.com"
EMAIL_PASS="heNry014"
```
This saves credentials for db connecion, email and login. Save as `.env` in backend folder. 

## Begin servers

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
## Access frontend

Frontend server runs on port 4200. So in browser type:

```
localhost:4200
```

to access frontend.