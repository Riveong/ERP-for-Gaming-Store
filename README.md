# overview  

this is an ERP e-commerce website for managing your gaming store. You can modify this website including the theme however you like. This e-commerce consist of several features:  
- Admin panel
- Login and Register
- Cart System
- Receipt System  
# Prerequisite
- MySQL (MariaDB / etc)
- NodeJS
# Installation
Make a db in MySQL with the name `gamerground`  
after that you may make the tables inside of the db:  
### barang  
| id  | category | addedDate | thumbnail | price | description |
|-----|----------|-----------|-----------|-------|-------------|
| int | varchar  | date      | longblob  | int   | text        |  
### receipt  
| id  | name | userId | category | date | item | price |
|-----|----------|-----------|-----------|-------|-------------|-------------|
| int | varchar  | int      | int  |  date   | text|   int    | 
### user  
| id  | name    | email   | password |
|-----|---------|---------|----------|
| int | varchar | varchar | varchar  |
# How to Run  
### go to the dir
```bash
cd '.\Gamer Ground\'
```
### run your db then install the node dependancies :
```bash
npm install
```
to start your Front End Server:
```bash
npm run dev
```
to start your backend Server:
```bash
cd api
node db.js
```  
you can access your webapp on http://localhost:5173  
your admin panel will be on http://localhost:5173/dashboard