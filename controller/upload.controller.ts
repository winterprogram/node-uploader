import { Request, Response } from "express";
import { getS3Url } from "../service/s3.service";
import { UserService } from "../service/user.service";

export default class UploadController {
  public preSignedUploader = async (req: Request, res: Response) => {
    try {
      const { email, ext } = req.body;
      const findOnebyEmail = (await UserService.findOnebyEmail(email)) as any;
      const { user_id } = findOnebyEmail;
      const getSignedUrl = await getS3Url(ext, user_id);
      res.status(200).send(getSignedUrl);
    } catch (err) {
      res.status(500).send({ success: false, message: err });
    }
  };

  public addFileEntry = async (req: Request, res: Response) => {
    try {
        const 
    } catch (err) {
      res.status(500).send({ success: false, message: err });
    }
  };
}
