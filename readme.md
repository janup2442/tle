# Codeforces Student Progress Dashboard #

## Website Architecture ##
- This Website is divided into 2 major portions , Client and Server
- Server is developed on top of Node.js , Express , and MongoDb .
- Client is developed on top of React.js
- Codeforces Public APIs were utilised to fetch general data of intended users . Which is of the form : https://codeforces.com/api/{methodName}
- Objective is to keeping track record progress in codeforces of enrolled users.

## Codeforces Public APIs ##
- before going into the details , Public APIs have to be defined properly
- Public APIs do not required API Key or any specific permission to access them . They usually restricted to limited features and API call limits .
- Incase of Codeforces Public APIs , 1 call per 2 seconds , is the API limit (as mentioned on official Codeforeces Website)
- {methodName} defines the API endpoints for several specific informations , In our case
  1. /user.info
  2. /user.status
  3. /user.rating
  4. /contest.standings


![image](https://github.com/user-attachments/assets/4b00cbe0-e4c6-4131-a569-567883bf6298)
`homepage of codeforces students progress website (old UI)`
![cf_1new](https://github.com/user-attachments/assets/0accab26-81b2-437c-8e1a-91a73c9ec191)
![cf_2new](https://github.com/user-attachments/assets/9ab6528c-da2e-4e3c-8a23-3968bced5f69)


## Server Side Endpoints ## 
- Implemented on Express.js for server side logic and MongoDb as Database
- our server listens to PORT = 8500 , and serves to endpoints as /edituser , /students and /studentprofile
- /edituser , endpoint is responsible for adding a user , editing a user , and deleting a user. Used on HomePage of Client side.
- /students , endpoint is responsible for fetching all the users who are enrolled in this system. Used on HomePage of Client side.
- /studentprofile , endpoint is responsible for fetching complete details about a specific user , indetified by handle (a query parameter)

## Client Side Endpoints ## 
- 
![cf_3new](https://github.com/user-attachments/assets/e0377c41-aa43-4e26-bba5-bf41ffb07a57)
![cf_4new](https://github.com/user-attachments/assets/ba369b5d-1760-42d6-be39-697a21310f87)

