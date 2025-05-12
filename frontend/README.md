# MEAN_CC — Invoice Management App

This project is a **full-stack Invoice Management application** built with the **MEAN stack** (MongoDB, Express.js, Angular, Node.js).

The application allows users to:
- Select a client
- Create and manage invoices (factures)
- Add product lines and calculate totals

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas) i used Compass
- Angular CLI 

---

### 🧩 Backend Setup

```bash
cd backend
npm install
Create a .env file in /backend/:

env
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/mean_factures
Start MongoDB (if installed locally):

```bash

mongod or mongosh 
```
Run the backend server:

```bash

npm start
```
The API will be available at http://localhost:3000/api/

💻 Frontend Setup
```bash

cd frontend
npm install
Start the Angular app:
```
```bash

npm start
```
App will run at http://localhost:4200/

🎨 UI & Styling
The frontend UI is styled using Bootstrap to ensure a responsive and clean interface.

📡 API Endpoints (examples)
GET /api/clients - List all clients

POST /api/clients - Create a new client

GET /api/produits - List products

POST /api/factures - Submit an invoice (to be implemented)

✅ Features (in progress)
 Select a client from the list

 Display a dynamic invoice form

 Modular structure with Angular standalone components

 Save invoices with multiple product lines

 Edit / view past invoices

🛠️ Technologies
Frontend: Angular 20 (Standalone Components) + Bootstrap

Backend: Node.js, Express

Database: MongoDB + Mongoose

Communication: REST API with HttpClient

🧑‍💻 Authors
Mohamed iliass kaddar  – Developer, Designer, Architect

For academic use, include institution name and project number.

📄 License
This project is for educational purposes only.