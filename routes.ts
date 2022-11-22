import cors from "cors";
import { Router } from "express";
import { initiliazeServer } from "./controller/main.controller";
import UploadController from "./controller/upload.controller";
import UserController from "./controller/user.controller";
import { authDecodeToken } from "./middleware/auth.middleware";
import { presSignedValidation } from "./middleware/pre-signed.validation";
import { uploadValidation } from "./middleware/upload.validation";

export const router: Router = Router();
const { addFileEntry, preSignedUploader } = new UploadController();
const { findAll } = new UserController();
router.use(cors());
//Health Check
router.get("/start", initiliazeServer);

router.use(authDecodeToken);
router.get("/files/:skip/:limit", findAll);
router.post("/upload-url", preSignedUploader);
router.post("/upload", addFileEntry);
