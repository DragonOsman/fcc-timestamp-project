// server.js
"use strict";

// init project
const express = require("express");
const path = require("path");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}`, "/views/index.html"));
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

// if date parameter is empty, return JSON response with both unix and utc keys
app.get("/api/timestamp", (req, res) => {
  const currentDateTime = new Date();
  res.json({
    unix: currentDateTime.valueOf(),
    utc: currentDateTime.toUTCString()
  });
});

/** A request to /api/timestamp/:date? with a
 *   valid date should return a JSON object with
 *   a unix key that is a Unix timestamp of the
 *   input date in milliseconds
 *   A request to /api/timestamp/:date? with
 *   a valid date should return a JSON object
 *   with a utc key that is a string of the
 *   input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
 */
app.get("/api/timestamp/:date", (req, res) => {
  const dateQuery = req.params.date;
  // check if string is a timestamp
  if (/\d{5,}/.test(dateQuery)) {
    res.json({ unix: parseInt(dateQuery), utc: new Date(parseInt(dateQuery)).toUTCString() });
  } else {
    if (new Date(dateQuery).toString() !== "Invalid Date") {
      const dateStr = new Date(dateQuery);
      res.json({ unix: dateStr.valueOf(), utc: dateStr.toUTCString() });
    } else {
      res.json({ error: "Invalid Date" });
    }
  }
});
