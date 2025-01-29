/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post,Body, Patch, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
   
  //using dependency injection here to directly inject the user service into the controller rather than creating a new instance of the service
  
  constructor (private readonly usersService: UsersService){}

    @Get() // For Getting users
      findAll(@Query('role') role?:"ADMIN"|"USER"|"ENGINEER"){
            return this.usersService.findAll(role);
    }

    @Get(':id')
        findOne(@Param('id') id: string) {
            return this.usersService.findOne(+id);
     }
  
    @Post()
    create(@Body() user:{name:string,email:string,role:'ADMIN' | 'USER' | 'ENGINEER'}){
       return this.usersService.create(user);
    }

    @Patch(':id')
     update(@Param('id') id: string,@Body() userUpdate:{name?:string,email?:string,role?:'ADMIN' | 'USER' | 'ENGINEER'}) {
        return this.usersService.update(+id,userUpdate);
    }

    @Delete(':id')
     delete(@Param('id') id: string){
       return this.usersService.delete(+id);
    }
}
