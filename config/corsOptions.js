// whitelist
// ::1
const whitelist = [
  "https://thisSiteIsAllowed.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "http://127.0.0.1:3500", //different hostname
  "null",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS!"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
