import { Request, Response } from "express";
import { v4 } from "uuid";
import { FileService } from "../service/file.service";
import { UserService } from "../service/user.service";
import { IUserObj } from "../types/interface";

export default class UserController {
  public findAll = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const { skip, limit } = req.params;
      const findOnebyEmail = (await UserService.findOnebyEmail(email)) as any;
      if (findOnebyEmail?.user_id) {
        const paginatedData = await this.paginatedList(
          +skip,
          +limit,
          findOnebyEmail?.user_id
        );
        res.status(200).send({ success: true, paginatedData });
      } else {
        const userData: IUserObj = {
          user_id: v4(),
          createdAt: Date.now(),
          email,
          isActive: false,
        };
        await UserService.insertOne(userData);
        const paginatedData = await this.paginatedList(
          +skip,
          +limit,
          findOnebyEmail?.user_id
        );
        res.status(200).send({ success: true, paginatedData });
      }
    } catch (err) {
      res.status(500).send({ success: false, message: err });
    }
  };

  private paginatedList = async (
    skip: number,
    limit: number,
    user_id: string
  ) => {
    return FileService.paginationData(+skip, +limit, user_id);
  };
}
