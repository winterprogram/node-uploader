import { Router } from "express";
import { initiliazeServer } from "./controller/main.controller";
import UploadController from "./controller/upload.controller";
import UserController from "./controller/user.controller";
import { authDecodeToken } from "./middleware/auth.middleware";

export const router: Router = Router();
const { addFileEntry, preSignedUploader } = new UploadController();
const { findAll } = new UserController();

//Health Check
router.get("/start", initiliazeServer);

router.use(authDecodeToken);
router.get("/files/:skip/:limit", findAll);
router.post("/upload-url", preSignedUploader);
router.post("/upload", addFileEntry);
