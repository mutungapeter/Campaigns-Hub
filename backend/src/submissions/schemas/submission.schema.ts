import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubmissionDocument = Submission & Document;

@Schema({ timestamps: true })
export class Submission {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Campaign', required: true })
  campaignId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  influencerId: Types.ObjectId;

  @Prop({ required: true })
  contentUrl: string;

  @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
  status: string;

  @Prop()
  rejectionReason?: string;

  @Prop({ default: 0 })
  estimatedLikes: number;

  @Prop({ default: 0 })
  estimatedShares: number;

  @Prop({ type: Date, default: Date.now })
  submissionDate: Date;

  get id() {
    return this._id.toHexString();
  }
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);