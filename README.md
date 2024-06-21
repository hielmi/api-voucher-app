# Voucher Api APP

## Prerequisites

You will need install Node JS.

## Setup

Get the code by clone this repo

```
git clone https://github.com/hielmi/api-voucher-app.git
```

Get in into directory api-voucher-app, and do:

```
npm install
```

By default it uses the localhost mysql database on xampp with no password and uses the username root. 
To costumize the db check in folder config and file db.js. Then migrate the table with command below:

```
npm run migrate
```

After that you must create a file .env and fill with whatever you want for JWT token.

```
ACCESS_TOKEN_SECRET = 
REFRESH_TOKEN_SECRET = 
```

Then to start the the project app with:

```
npm run dev
```

The app should now be up and running at http://localhost:4000 🚀

## Documentation API


| Endpoint                   | Description                                             | Method | Need Auth | Example Body Request                               |
|----------------------------|---------------------------------------------------------|--------|-----------|----------------------------------------------------|
| /api/auth/register         | To Register User                                        | POST   | No        | `{ "username": "user", "password": "pass", "email": "email@example.com", "nama": "Nama User" }` |
| /api/auth/login            | To Login User                                           | POST   | No        | `{ "username": "user", "password": "pass" }`       |
| /api/auth/refresh-token    | To Refresh Access Token. Body request is refreshToken.  | POST   | Yes       | `{ "refreshToken": "your-refresh-token" }`         |
| /api/profile               | To Get the profile                                      | GET    | Yes       | -                                                  |
| /api/voucher               | To add voucher, role as admin. Body request is nama, kategori, and foto as file. | POST   | Yes       | `form-data: { "nama": "Voucher Name", "kategori": "Category", "foto": "file" }` |
| /api/vouchers              | To get all vouchers available                           | GET    | No        | -                                                  |
| /api/voucher/:id           | To get voucher by id                                    | GET    | Yes       | -                                                  |
| /api/voucher/:id           | To update voucher by id, fill field nama, kategori, and foto as file using form-data | PUT    | Yes       | `form-data: { "nama": "Voucher Name", "kategori": "Category", "foto": "file" }` |
| /api/voucher/:id           | To delete voucher by id                                 | DELETE | Yes       | -                                                  |
| /api/claim-voucher         | To claim voucher. Body request is id voucher            | POST   | Yes       | `{ "id": "voucher-id" }`                           |
| /api/unclaim-voucher/:id   | To unclaim voucher. Params is id that claimed voucher   | DELETE | Yes       | -                                                  |

For more detail check Documentation in postman https://shorturl.at/zlJCL

