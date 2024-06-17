import { Controller, Post, Body, Get, UseGuards, Request, Delete } from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "../dtos/CreateUserDto";
import {JwtAuthGuard} from "../auth/auth.jwtauthguard";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto:CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    async  findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Delete(':id')
    async deleteUser(@Request() req) {
        return this.usersService.deleteUser(req.params.id);
    }


}