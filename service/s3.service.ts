import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid";
import { lookup } from "mime-types";
import { UserService } from "./user.service";

const s3Config: S3.ClientConfiguration = {
  region: process.env.REGION!,
};
const s3Bucket = new S3(s3Config);
export const getS3Url = async (ext: string, user_id: string, name?: string) => {
  try {
    const fileName = `${uuid()}.${ext}`;

    const ContentType = lookup(ext as string);
    if (!!ContentType) {
      console.log(ContentType, fileName);

      const bucketOptions = {
        Bucket: `userfileassetshow`!,
        Key: `${fileName}`,
        Expires: 60 * 5,
        ContentType,
      };
      const url = s3Bucket.getSignedUrl("putObject", bucketOptions);
      await UserService.updateOne(user_id, fileName);
      return { url, fileName };
    }
    return '';
  } catch (e) {
    console.log(e);
  }
}