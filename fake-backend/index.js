// server.js
const jsonServer = require("json-server");
const customRoute = require("./routes.json");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Add this before server.use(router)
server.use(jsonServer.rewriter(customRoute));
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/v1/user", (req, res, next) => {
    const payload = req.body;
    console.log({requestBody : payload, fullRequest: req });
    if (payload.generalInfo.nickname === "exception@devmail.com") {
      setTimeout(() => {
        res.status(500).send({
            message: "Unexpected error/exception at backend",
        });
      }, 3000);
      return;
    }

    const {
        generalInfo: {
          nickname,
          fullName,
        },
        details: {
          department,
          language
        }
    } = payload;
    setTimeout(() => {
      res.status(200).send({
        success: true,
        createdRecord: {
          nickname,
          fullName,
          department,
          language
        }
      });
    }, 3000);
});

server.use(function(req, res, next){
  setTimeout(next, 2000);
});

server.use(router);

server.listen(3000, () => {
    console.log("JSON Server is running");
});
