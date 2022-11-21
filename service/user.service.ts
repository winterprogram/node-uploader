import { IUserObj } from "../types/interface";
import { MongoService } from "./mongoPool.service";



export class UserService {
    /**
     * 
     * @param obj 
     * Insert user data to mongodb
     */
    public static insertOne = async (obj: IUserObj): Promise<void> => {
        await (await MongoService.connectToDb()).collection('users').insertOne(obj);
    }

    /**
     * Get user by email
     * @param email 
     * @returns 
     */
    public static findOnebyEmail = async (email: string) => {
        return (await MongoService.connectToDb()).collection('users').findOne({ email });
    }

    /**
     * Get user by user_id
     * @param user_id 
     * @returns 
     */
    public static findOnebyId = async (user_id: string) => {
        return (await MongoService.connectToDb()).collection('users').findOne({ user_id });
    }

    /**
     * Update user by fileName
     * @param user_id 
     * @param fileName 
     */
    public static updateOne = async (user_id: string, fileName: string) => {
        await (await MongoService.connectToDb()).collection('users').updateOne({ user_id }, { $set: { fileName, updatedAt: Date.now() } });
    }

    // public paginationData = async (dbo: Db, userId: string, skip: number, limit: number, type: string) => {
    //     // if (type == 'all') {
    //     return dbo.collection(`vehicle_data`).find({ user_id: userId }).skip(skip).limit(limit).toArray()
    //     // }
    //     // return dbo.collection(`vehicle_data`).find({ user_id: userId, status: type }).skip(skip).limit(limit).toArray()
    // }

}