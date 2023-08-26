# workout-app-be

Small express app for tracking progress in gym

---

**Used technology**

1. [Node.js/Express.js](https://expressjs.com/)
2. [Mongoose](https://mongoosejs.com/)
3. [Mongo DB](https://www.mongodb.com/)
4. [Connect - mongo](https://www.npmjs.com/package/connect-mongo)
5. [Passport](https://www.passportjs.org/)

**How to install**

Just run simple command
`npm i workout-app-be`

Don't forget to set your .env file

```env
#SERVER
NODE_ENV=developement
PORT=TYPE_SOMETHING
#DB
DB_LINK=TYPE_SOMETHING
#SENDGRID
API_KEY=TYPE_SOMETHING
GOOGLE_CLIENT_ID=TYPE_SOMETHING
GOOGLE_CLIENT_SECRET=TYPE_SOMETHING
GOOGLE_CALLBACK_URL=TYPE_SOMETHING
#SESSION
SESSION_SECRET=TYPE_SOMETHING
SESSION_COOKIE_MAXAGE=TYPE_SOMETHING
```

**Run scripts**

To run in developement mode type
`npm run start:dev`

To run in production mode type
`npm run start:prod`

