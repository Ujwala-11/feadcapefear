# Installation Instructions for socialmedia demo for React application

Download the files from git in a folder.
Open your MYsql client or server and create a database with name "mytestdb". Then import data from a self-contained file you can find in the DB\Dumps folder. 

**Frontend Dependencies:** 

"**react**": To define React components in the application , The react package is used. @https://www.npmjs.com/package/react
"**react-router-dom**": React Router Dom is used to build single-page applications. @https://www.npmjs.com/package/react-router-dom
"**axios**": Axios is used to make requests to an API, return data from the API. @https://www.npmjs.com/package/axios
"**react-formidable**": To upload files or for parsing form data , formidable is used. @https://www.npmjs.com/package/react-formidable
"**react-scripts**": The react-scripts sets up the development environment and starts a server. @https://www.npmjs.com/package/react-scripts
"**fs**: : File System makes file opertaion of api's simple. @https://www.npmjs.com/package/fs-react

**Backend Dependencies :** 

"**express**": It provides features for building web applications. It is used to build a single page, multipage, and hybrid application. @https://www.npmjs.com/package/express
"**express-metadata**": It helps to understand the data behind it and reflects how data is used. @https://www.npmjs.com/package/express-metadata
"**formidable**": Formidable is used for parsing form data, including multipart/form-data file upload.@https://www.npmjs.com/package/express-formidable
"**fs**" : The Node.js file system module allows you to work with the file system ,we can Read files,Create files,Update files,Delete files,Rename files. @https://www.npmjs.com/package/fs-express
"**cookie-parser**": It is a middleware which parses cookies attached to the client request object. @https://www.npmjs.com/package/cookie-parser
"**cors**": It allows AJAX requests to skip the Same-origin policy and access resources from remote hosts. @https://www.npmjs.com/package/cors
"**date-and-time**": It allows to access current date and time. @https://www.npmjs.com/package/date-and-time
"**debug**": debug is used to log information about route matches, middleware functions that are in use, application mode, and the flow of the request-response cycle. @https://www.npmjs.com/package/debug
"**http-errors**": HTTP-errors is used for generating errors for Node.js applications. @https://www.npmjs.com/package/http-errors
"**mysql**": It connects database with server @https://www.npmjs.com/package/mysql
"**path**": The Path module provides a way of working with directories and file paths. @https://www.npmjs.com/package/path
"**sharp**": sharp compresses images faster than most other Node. @https://www.npmjs.com/package/sharp

These are the Plugins used in the frontend and backend of this application. To run these plugins, Open terminal in VScode and change directory to the folder which you created. use "**npm install**"

**Configurations :**
Frontend : By default frontend is configure to run on PORT:4000 and you can change port in the file package.json in frontend/fearcapefeed
Backend : By default backend is configure to run on PORT:2000 and you can change port in the file ./bin/www in backend/server.
Database : For connecting your database to backed, go to dbconfig file in server and change your password.

**Forntend :**
**Signup panel  :** This app Start from signingup user. The user needs to enter his details like Image, Name , Name of Organization and password to singup, then user can see a alert box which has userid. The user needs to copy that userid for logingin.

**Admin Panel :** After the user signup.the user needs to wait for admin approval, In Admin Panel, the user image and name with his organization is displayed to the admin to approve or Decline the user. If user is approved then , he can login with his userid and password and if user is declined then the user will get alert saying invalid credentials.

**Login panel:** The approved user can login with his userid and password then the user can see a dashboard.

**Dashboard panel:** In dashboard, the user can see three panels(left panel ,right panel and main panel)
**Left panel:** 
The left panel consists of Userimage, Userid, User Organization at the top of left panel.
Then we have Groups , one user can access only one group.
Then the user Profile content like User name , Organization id and organization Name.
At the bottom of left panel, User can see a Logout Button which redirects User to Login Page.


