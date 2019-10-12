# Point-of-Sales API NODE.js


---


## Introduction

Point-of-Sales API Express Boilerplate is packed with bunch of feature you can use for developing your app. 

---


## Prerequiste

- Node.js - Download and Install [Node.js](https://nodejs.org/en/) - Simple bash script to manage multiple active node.js versions.

- Nodemon - Download and Install [Nodemon](https://nodemon.io/) - nodemon is a tool that automatically restarting the node application when file changes in the directory are detected.

---


## Installation

### Clone
```bash
$ git clone git@github.com:Muhammadsani/Poin-of-Sales.git
$ cd Poin-of-Sales
$ npm install
```
---

### Create Environment Variable
```bash
$ cp .env.example .env
$ nano .env
```
---
### Start Development Server
```bash
$ npm start
```
---

## Other Dependencies

- [bcryptjs](#)
- [body-parser](#)
- [cors](#)
- [dotenv](#)
- [express](#)
- [jsonwebtoken](#)
- [morgan](#)
- [multer](#)
- [mysql](#)
- etc.

---
## Documentation

### Product Routes

#### GET Request
- **"/products/:id** => get one products from database with specific id
- **"/products"** => get all products data from database. Query params:
  - **"search"** -> search by products name, 
  - **"sort"** -> sorting data based on ascending or descending,
  - **"limit"** -> limitation data per page,
  - **"page"** -> redirect to specific page.

#### POST Request
- **"/products"** => create new data
- **"/products/reduce/:id"** => reduce quantity of the product

#### PATCH Request
- **"/products/:id"** => Update data products


#### DELETE Request
- **"/products/:id"** => Delete a products in database with specific id

### Categories Routes
#### GET Request
- **"/categories/:id"** => get one category from database
- **"/categories"** => get all category data from database.

#### POST Request
- **"/categories"** => create new data to category database

#### PATCH Request
- **"/categories/:id"** => Update data category

#### DELETE Request
- **"/categories/:id"** => Deleting data category in database.




