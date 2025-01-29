/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    private users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: "ADMIN" },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: "ENGINEER" },
        { id: 3, name: 'Mike Tyson', email: 'mike@example.com', role: "USER" },
        { id: 4, name: 'Sarah Connor', email: 'sarah@example.com', role: "ADMIN" },
        { id: 5, name: 'Tony Stark', email: 'tony@example.com', role: "USER" },
        { id: 6, name: 'Bruce Wayne', email: 'bruce@example.com', role: "ENGINEER" },
      ];
   
    findAll(role?: 'ADMIN' | 'USER' | 'ENGINEER') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }   


    findOne(id:number){
        const user =  this.users.find(user=> user.id === id);
        return user;
    }

    create(user: {name:string,email:string,role:'ADMIN' | 'USER' | 'ENGINEER'})
    {
        const usersByHighestId = [...this.users].sort((a,b)=>b.id-a.id);

        const newUser={
            id:usersByHighestId[0].id+1,
            ...user
        }

        this.users.push(newUser);
        return newUser;

    }
   
    update(id:number, updateUser:{name?:string,email?:string,role?:'ADMIN' | 'USER' | 'ENGINEER'}){
        const user = this.findOne(id);
        if(!user){
            return null;
        }
        const index = this.users.findIndex(user=>user.id === id);
        this.users = this.users.map(user => {
            if(user.id === id){
                return {...user,...updateUser}
            }
            return user;
        })
        return this.findOne(id);
    }


    delete(id:number){
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user=>user.id !== id);

        return removedUser;
    }
}
