import { Request, Response } from "express";
import { v4 } from "uuid";
import { FileService } from "../service/file.service";
import { getS3Url } from "../service/s3.service";
import UserController from "./user.controller";

export default class UploadController extends UserController {
  public preSignedUploader = async (req: Request, res: Response) => {
    try {
      const { email, ext } = req.body;
      const findOnebyEmail = (await this.getUsers(email)) as any;
      const { user_id } = findOnebyEmail;
      const getSignedUrl = await getS3Url(ext, user_id);
      res.status(200).send(getSignedUrl);
    } catch (err) {
      res.status(500).send({ success: false, message: err });
    }
  };

  public addFileEntry = async (req: Request, res: Response) => {
    try {
      const { email, file_link, file_type, file_name } = req.body;
      const findOnebyEmail = (await this.getUsers(email)) as any;
      const { user_id } = findOnebyEmail;
      const userFileUpload = {};
      Object.assign(userFileUpload, {
        user_id,
        file_id: v4(),
        created_at: Date.now(),
        file_link,
        file_type,
        file_name
      });
      await FileService.insertOne(userFileUpload);
      res.status(200).send({ success: true, userFileUpload });
    } catch (err) {
      res.status(500).send({ success: false, message: err });
    }
  };
}
