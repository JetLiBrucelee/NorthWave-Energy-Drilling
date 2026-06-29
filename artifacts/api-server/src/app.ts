import express, { type Express, type Request, type Response, type NextFunction } from "express";
import pinoHttp from "pino-http";
import session from "express-session";
import crypto from "crypto";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// CORS: allow same-origin only in production; allow the Replit dev proxy in development.
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [];

app.use((req: Request, res: Response, next: NextFunction): void => {
  const origin = req.headers.origin;
  // Same-origin requests have no Origin header — always allow them.
  if (!origin) {
    res.setHeader("Vary", "Origin");
    next();
    return;
  }
  // In development accept any origin (Replit preview proxy varies).
  // In production only allow explicitly allowlisted origins.
  if (process.env.NODE_ENV !== "production" || ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,X-CSRF-Token");
    res.setHeader("Vary", "Origin");
  }
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV === "production") {
  throw new Error("SESSION_SECRET environment variable is required in production");
}

app.use(session({
  secret: sessionSecret ?? "northwave-dev-session-secret-not-for-production",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // In development keep secure:false so cookies work over HTTP in the Replit preview.
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
  },
}));

// CSRF protection: issue a CSRF token on GET requests and validate it on
// state-changing admin routes (POST/PUT/DELETE under /api/auth, /api/settings,
// /api/workers, /api/storage/uploads).
app.use((req: Request, res: Response, next: NextFunction): void => {
  const sess = req.session as any;

  // Issue a CSRF token if not already present.
  if (!sess.csrfToken) {
    sess.csrfToken = crypto.randomBytes(32).toString("hex");
  }

  // Expose the token in a readable (non-httpOnly) cookie so the frontend JS can read it.
  res.cookie("csrf-token", sess.csrfToken, {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  // Validate on mutating requests to admin-guarded paths.
  const mutating = ["POST", "PUT", "PATCH", "DELETE"];
  const adminPaths = ["/api/auth/login", "/api/auth/logout", "/api/settings", "/api/workers", "/api/storage/uploads", "/api/admin/contacts"];
  const requiresCsrf = mutating.includes(req.method) &&
    adminPaths.some((p) => req.path.startsWith(p));

  if (requiresCsrf) {
    const incoming =
      (req.headers["x-csrf-token"] as string | undefined) ??
      (req.body as any)?.csrfToken;
    if (!incoming || incoming !== sess.csrfToken) {
      res.status(403).json({ error: "Invalid or missing CSRF token" });
      return;
    }
  }

  next();
});

app.use("/api", router);

export default app;
