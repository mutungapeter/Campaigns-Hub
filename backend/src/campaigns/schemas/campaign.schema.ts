import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CampaignDocument = Campaign & Document;

@Schema({ timestamps: true })
export class Campaign {
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  brandId: Types.ObjectId;

  @Prop({ default: 'active', enum: ['active', 'completed', 'cancelled'] })
  status: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  influencers: Types.ObjectId[];

  get id() {
    return this._id.toHexString();
  }
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);