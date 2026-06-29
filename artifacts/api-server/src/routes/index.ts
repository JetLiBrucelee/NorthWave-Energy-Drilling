import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storageRouter from "./storage";
import authRouter from "./auth";
import settingsRouter from "./settings";
import workersRouter from "./workers";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storageRouter);
router.use(authRouter);
router.use(settingsRouter);
router.use(workersRouter);
router.use(contactRouter);

export default router;
