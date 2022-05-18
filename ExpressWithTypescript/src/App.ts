import express, { Request, Response, NextFunction } from "express";
const app = express();
app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//   //   return res.json({
//   //       sucess:true,
//   //       name:"xyz"
//   //   })
//   return res.redirect("http://google.com");
// });
// app.post("/api/data", (req: Request, res: Response) => {
//   console.log(req.body);
//   return res.sendStatus(200);
// });
// app.all("/api/all", (req: Request, res: Response) => {
//   return res.sendStatus(200);
// });

// app
//   .route("/")
//   .get((req: Request, res: Response) => {
//     return res.send("GetRequest");
//   })
//   .post((req: Request, res: Response) => {
//     return res.send("PostRequest");
//   })
//   .put((req: Request, res: Response) => {
//     return res.send("PutRequest");
//   });

// app.listen(4000, () => {
//   console.log("App listening at port 4000");
// });

// app.get("/ok", (req: Request, res: Response) => res.sendStatus(200));
// app.get("/ab*cd", (req: Request, res: Response) => res.send("/ab*cd"));

// app.get("/asd/", (req: Request, res: Response) => res.send("asd"));
// app.get("/data/:dataid", (req: Request, res: Response) => {
//   console.log(req.params);
//   return res.send(req.params);
// });

// function handleGetbook(req: Request, res: Response, next: NextFunction) {
//   console.log(req.params);
//   next();
// }
// function handleGetbook1(req: Request, res: Response, next: NextFunction) {
//   console.log("sec");
//   return res.send(req.params);
// }
// app.get("/book/:bookid", handleGetbook, handleGetbook1);

function middleware(req: Request, res: Response, next: NextFunction) {
  req.name = "math";
  next();
}
app.get(
  "/book/:bookid",
  middleware,
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.name);
    res.send(req.name);
  }
);

async function throwsError() {
  throw new Error("");
}

app.get("/error", async (req: Request, res: Response) => {
  try {
    await throwsError();
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send("Error");
  }
});

app.listen(4000, () => {
  console.log("App listening at port 4000");
});
