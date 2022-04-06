// <https://stackoverflow.com/a/65805410/8834000>
declare module "express-session" {
  interface SessionData {
    user_id: string;
  }
}

export {};
