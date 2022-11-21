import { MongoService } from "./mongoPool.service";

export class FileService {
  /**
   * Get Users list by pagination
   * @param skip
   * @param limit
   * @returns
   */
  public static paginationData = async (
    skip: number,
    limit: number,
    user_id: string
  ) => {
    return (await MongoService.connectToDb())
      .collection("files")
      .find({ user_id })
      .skip(skip)
      .limit(limit)
      .toArray();
  };

  /**
   * Filter query
   * @param email
   * @param name
   * @param mobile
   * @returns
   */

  public static filterUserData = async (
    email?: string,
    name?: string,
  ) => {
    return (await MongoService.connectToDb())
      .collection("users")
      .find({ $or: [{ email }, { name }] })
      .toArray();
  };
}
