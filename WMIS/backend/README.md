# WMIS Backend (MERN Inventory System)

## Setup
1. `cd backend`
2. Create a `.env` file in this folder using `env.example` as a template.
3. Ensure MongoDB is running.
4. Start the server:
   - `npm run dev`

## Routes
### Auth
- `POST /register`
- `POST /login`

### Products
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

### Warehouses
- `GET /warehouses`
- `GET /warehouses/:id`
- `POST /warehouses`
- `PUT /warehouses/:id`
- `DELETE /warehouses/:id`

### Orders (JWT required)
- `GET /orders`
- `POST /orders`

## JWT
- Send token as: `Authorization: Bearer <token>`

