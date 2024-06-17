import {Injectable} from "@nestjs/common";
import {User} from "./user.entity";
import { Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "../dtos/CreateUserDto";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async deleteUser (id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}