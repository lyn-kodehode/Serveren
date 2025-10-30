// const os = require("os");
// const path = require("path");

// console.log(__dirname);
// console.log(__filename);

// console.log(os.version());
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename));

// const https = require("http");
// https
//   .createServer(function (req, res) {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.end("Hello");
//   })
//   .listen(8080);

// OUTPUT:
// <Buffer 54 68 69 73 20 69 73 20 73 6f 6d 65 20 72 61 6e 64 6f 6d 20 64 61 74 61>
// hexcodes
// utf-8 - converts to human readable
/* const fs = require("fs");


fs.readFile("./starter.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

process.on("uncaughtException", (err, origin) => {
  // writeSync async of write
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
}); */

// const fs = require("fs");
// const fsPromises = require("fs").promises; //old way syntax
// const path = require("path");

// const fileOps = async () => {
//   try {
//     // reads file
//     const data = await fsPromises.readFile(
//       path.join(__dirname, "starter.txt"),
//       "utf-8"
//     );
//     console.log(data);

//     // deletes
//     await fsPromises.unlink(path.join(__dirname, "starter.txt"));

//     // creates a new file
//     await fsPromises.writeFile(path.join(__dirname, "promiseWrite.txt"), data);

//     // appends to the created file
//     await fsPromises.appendFile(
//       path.join(__dirname, "promiseWrite.txt"),
//       ". This data has been added"
//     );

//     // renames file
//     await fsPromises.rename(
//       path.join(__dirname, "promiseWrite.txt"),
//       path.join(__dirname, "newName.txt")
//     );

//     const newData = await fsPromises.readFile(
//       path.join(__dirname, "newName.txt"),
//       "utf-8"
//     );
//     console.log(newData);
//   } catch (err) {
//     console.log(err);
//   }
// };

// fileOps();

// fs.readFile(path.join(__dirname, "starter.txt"), "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.writeFile(
//   path.join(__dirname, "Greeting.txt"),
//   "Hi there, hello!",
//   (err) => {
//     if (err) throw err;
//     console.log("Done writing the file");
//   }
// );

// fs.writeFile(
//   path.join(__dirname, "Appended.txt"),
//   "This is not a complete file.",
//   (err) => {
//     if (err) throw err;
//     console.log("Appending done");
//   }
// );

// process.on("uncaughtException", (err, origin) => {
//   // writeSync async of write
//   fs.writeSync(
//     process.stderr.fd,
//     `Caught exception: ${err}\n` + `Exception origin: ${origin}`
//   );
// });

// imports (server creation)
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "ddMMyyyy\tHH:mm:ss")}`;
  const theLog = `${dateTime}\t${uuid()}\t${message}\n`;
  // console.log(theLog);

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      theLog
    );
  } catch (err) {
    console.error(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.header.origin}\t${req.url}`, "reqLog.txt");

  if (process.env.NODE_ENV === "development") {
    console.log(`${req.method} ${req.path}`);
  }

  next();
};

module.exports = { logEvents, logger };

// console.log(uuid());

// console.log(format(new Date(), "ddMMyyyy\tHH:mm:ss"));
