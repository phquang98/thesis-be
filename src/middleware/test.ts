// for auth later, del this when done
import { RequestHandler, Request } from "express";
import { Store, Session, SessionData } from "express-session";

type customRequest = Request & {
  session: Session & Partial<SessionData> & { customDataHere?: string; userId?: string };
  sessionID: string;
};

// TODO: delete this

const db = [
  {
    id: "1",
    username: "John",
    password: "123abc"
  },
  {
    id: "2",
    username: "Jane",
    password: "admin"
  }
];

export const indexMddlwr: RequestHandler = (req: customRequest, res, _next) => {
  return res.status(200).json(`
    Use POSTMAN to send a POST HTTP to /login to test for session.
  `);
};

export const authNZ: RequestHandler = (req: customRequest, res, next) => {
  console.log("session", req.session);
  if (req.session.userId) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export const testHomeGet: RequestHandler = (req: customRequest, res, _next) => {
  const user = db.find((ele) => ele.id === req.session.userId);
  return res.json(`Success ? `);
};

export const testPostLogin: RequestHandler = (req: customRequest, res, _next) => {
  const { userNameHere, passHere } = req.body;
  console.log("from FE", { userNameHere, passHere });
  if (userNameHere && passHere) {
    const findUser = db.find((ele) => ele.username === userNameHere && ele.password === passHere);
    if (findUser) {
      req.session.userId = findUser.id.toString();
      console.log("login ok, redirect to home", req.session);
      // return res.redirect("/home");
      return res.json(`Give me the fucking session ID INSIDE THE FUCKING COOKIE STORAGE. ${req.sessionID}`);
    }
  }
  console.log("req.body missing or cant find cred");
  return res.redirect("/");
};

export const testLogout: RequestHandler = (req: customRequest, res, _next) => {
  console.log("req", req.session.cookie);
  console.log("session ID", req.sessionID);
  console.log("req", req.cookies);
  console.log("cac", req.headers);
  req.session.destroy((err: Error) => {
    console.log("err", err);
  });
  return res.status(200).json({ msg: "OK" });
};
