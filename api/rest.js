// const express = require("express");
// require("./database/connection.js");
// const OurRouter = require("./router/ourRoutes.js");
// const app = express();

// const port = process.env.PORT || 7000;

// app.use(express.json());    // { express.json } ka use krke undefined ht jaygea , bcoz json object ko read krne m help krega

// app.use(OurRouter);

// app.listen(port, () => {
//     console.log(`Yo bro , Server l ive at port : ${port}`);
// });


//--------------------------below is working good, if run locally , and gives cors header error frmo deplaoyer--------------------------------

// const express = require("express");
// const cors = require("cors");
// const serverless = require('serverless-http')
// const path = require("path");
// const OurRouter = require("../router/ourRoutes.js");
// require("../lib/connection.js");

// const app = express();

// // const Front_URL = 'http://localhost:5173';
// const Front_URL = 'https://health-for-you.vercel.app';

// const port = process.env.PORT || 7000;

// app.use(cors()); // will allow every origin

// // app.use(cors({
// //   origin: Front_URL,
// //   methods: ['GET', 'POST'],
// //   allowedHeaders: ['Content-Type', 'Authorization']
// // }));



// app.use(express.json());

// // API routes
// app.use(OurRouter);


// // app.listen(port, () => {
// //     console.log(`Yo bro, Server live at port: ${port}`);
// // });


// module.exports.handler = serverless(app);



// ----------- below is test to handle to cors hearder issue onn deplaoyd ----------

const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const path = require("path");
const OurRouter = require("../router/ourRoutes.js");
require("../lib/connection.js");

const app = express();

const Front_URL = "https://health-for-you.vercel.app";
// const Front_URL = "http://localhost:5173"; // use this locally if needed

const port = process.env.PORT || 7000;

// ✅ Correct CORS setup
app.use(cors({
  origin: Front_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ This ensures Express responds to preflight (OPTIONS) requests
app.options('*', cors({
  origin: Front_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());

// ✅ Your API routes
app.use(OurRouter);

// For local testing (uncomment if testing locally)
// app.listen(port, () => {
//   console.log(`Server live at port: ${port}`);
// });

// ✅ Export for serverless deployment (Vercel)
module.exports.handler = serverless(app);
