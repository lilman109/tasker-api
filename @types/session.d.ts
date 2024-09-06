import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: number; // or string, depending on your ID type
  }
}
