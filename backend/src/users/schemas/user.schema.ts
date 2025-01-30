import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['influencer', 'brand'] })
  role: 'influencer' | 'brand';



  get id() {
    return this._id.toHexString();
  }
  
}

export const UserSchema = SchemaFactory.createForClass(User);
