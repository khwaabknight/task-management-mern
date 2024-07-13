# Task Management application - MERN

## Getting Started

1. First clone the respository in your local machine using:
``` bash
git clone https://github.com/khwaabknight/task-management-mern.git
```
  - If you don't have git installed, you can also use the zip folder that can be downloaded from the repository

2. Change the directory:
```bash
cd task-management-mern
```

3. Then Install the node_modules folder using :
```bash
npm install
```

4. Create ```.env``` files in both ```/frontend``` and ```/backend``` directory(folder)
   - In /frontend folder, create the key-value pairs as follows :
     ```dotenv
     #Example .env file
     
     VITE_API_BASE_URL = 'http://localhost:4000'
     ```
   - In /backend folder, create the key-value pairs as follows :
     ```dotenv
     #Example .env file
     
     PORT = 4000
     MONGODB_URI = mongodb://localhost:27017/taskManagementApp
     ACCESS_TOKEN_SECRET = 'access-token-secret'
     ACCESS_TOKEN_EXPIRY = 1d
     ```

5. Now run the development server in the root-folder, using:
```bash
npm run dev
```

6. Open ```http://localhost:5173``` in browser to view the result.


## Folder structure

- project-root/
    - backend
      - src
        - config
        - controllers
        - middlewares
        - models
        - routes    
    - frontend
      - public
        - images
      - src
        - components
        - lib
        - pages
        - store

## Demo

1. Auth:

https://github.com/user-attachments/assets/9fd7301e-7159-4ce1-8b53-ebc35a5478f5

2. Task management:

https://github.com/user-attachments/assets/5c1ed77b-d2b8-49c0-bf16-83909c8890e9
