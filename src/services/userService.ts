import { AppDataSource } from '../Db/DBConnection';
import { UserEntity } from '../Entity/UserEntity';
import { injectable } from 'inversify';
import { IUserService } from './interface/IUserService';

@injectable()
export class UserService implements IUserService {
    getAll(): Promise<UserEntity[]> {
        const myRepository = AppDataSource.getRepository(UserEntity);
        return myRepository.find();
    }

    getById(id: number): Promise<UserEntity | undefined> {
        const myRepository = AppDataSource.getRepository(UserEntity);
        return myRepository.findOneBy({ id: id });
    }

    create(entity: UserEntity): Promise<UserEntity> {
        const myRepository = AppDataSource.getRepository(UserEntity);
        return myRepository.save(entity);
    }

    update(entity: UserEntity): Promise<UserEntity> {
        const myRepository = AppDataSource.getRepository(UserEntity);
        const updatedEntity = myRepository.merge(entity, entity);
        return myRepository.save(updatedEntity);
    }

    delete(id: number): Promise<any> {
        let result;

        const myRepository = AppDataSource.getRepository(UserEntity);
        myRepository.delete(id)
            .then((response) => {
                result = response.affected;
            })
            .catch((error) => {
                result = error;
            });

        return result;
    }
}