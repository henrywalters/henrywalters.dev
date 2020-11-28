import {Express} from "express";
import { uuid } from "uuidv4";
import {Injectable} from "@nestjs/common";
import {UserFile} from "../entities/userFile.entity";
const fsPromise = require("fs").promises;

export interface IStorageLocation {
    id: string;
    path: string;
}

interface IStorage {
    // Returns the path to access stored image
    store(file: Express.Multer.File): Promise<IStorageLocation>;
    replace(id: string, file: Express.Multer.File): Promise<IStorageLocation>;
    retrieve(path: string): Promise<Express.Multer.File>;
    remove(id: string): Promise<void>;
}

class FileSystemStorage implements IStorage {

    private readonly storageDirectory: string;
    private readonly basePath: string;

    constructor() {
        if (!process.env.FILE_DIRECTORY) throw new Error("App env var FILE_DIRECTORY required for image service");

        if (!process.env.CDN_URL) throw new Error("App env var CDN_URL required for image service");

        this.storageDirectory = process.env.FILE_DIRECTORY;
        this.basePath = process.env.CDN_URL;
    }

    public async store(file: Express.Multer.File): Promise<IStorageLocation> {
        const extension = file.originalname.split(".").pop();
        const randomFileName = uuid() + "." + extension;
        const storagePath = this.storageDirectory + "/" + randomFileName;
        const accessPath = this.basePath + "/" + randomFileName;
        await fsPromise.writeFile(storagePath, file.buffer);

        return {
            id: randomFileName,
            path: accessPath,
        };
    }

    public async replace(id: string, file: Express.Multer.File): Promise<IStorageLocation> {
        await this.remove(id);
        const storagePath = this.storageDirectory + "/" + id;
        const accessPath = this.basePath + "/" + id;
        fsPromise.writeFile(storagePath, file.buffer);

        return {
            id: id,
            path: accessPath,
        };
    }

    public async retrieve(path: string): Promise<Express.Multer.File> {
        return await fsPromise.readFile(this.storageDirectory + "/" + path);
    }

    public async remove(id: string): Promise<void> {
        try {
            const storagePath = this.storageDirectory + "/" + id;
            await fsPromise.unlink(storagePath);
        } catch (e) {
            console.warn(e);
        }
    }
}

@Injectable()
export class UserFileService {

    private storage: IStorage;

    constructor() {
        this.storage = new FileSystemStorage();
    }

    public async get(id: string): Promise<UserFile> {
        return await UserFile.findOneOrFail({
            where: {
                id,
            },
            relations: [ "company" ],
        });
    }

    public async getContent(cdn: string): Promise<Express.Multer.File> {
        return this.storage.retrieve(cdn);
    }

    public async store(file: Express.Multer.File, name: string, altTag?: string): Promise<UserFile> {
        const storageItem = await this.storage.store(file);
        const userFile = new UserFile();
        userFile.name = name;
        userFile.alt = altTag;
        userFile.cdn = storageItem.path;
        userFile.cdnId = storageItem.id;
        await userFile.save();
        return userFile;
    }

    public async remove(file: UserFile): Promise<void> {
        await this.storage.remove(file.cdnId);
        await UserFile.remove(file);
    }

    public async update(userFile: UserFile, file: Express.Multer.File | undefined, name: string, altTag?: string): Promise<UserFile> {
        if (file) {
            const storageItem = await this.storage.replace(userFile.cdnId, file);
            userFile.cdn = storageItem.path;
            userFile.cdnId = storageItem.id;
        }
        userFile.name = name;
        userFile.alt = altTag;

        await userFile.save();

        return userFile;
    }
}
