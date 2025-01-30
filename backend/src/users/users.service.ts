import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  
    async createUser(
      email: string,
      hashedPassword: string,
      name: string,
      role: 'influencer' | 'brand',
    ): Promise<User> {
      const newUser = new this.userModel({
        email,
        password: hashedPassword,
        role,
        name,
      });
      return newUser.save();
    }
  
    async findUserByEmail(email: string): Promise<User | null> {
      return this.userModel.findOne({ email }).exec();
    }
  
    async findUserById(id: string): Promise<User | null> {
      return this.userModel.findOne({ _id: id }).exec();
    }
  
    async updateRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
      await this.userModel.findByIdAndUpdate(userId, { refreshToken });
    }
  
 
  }