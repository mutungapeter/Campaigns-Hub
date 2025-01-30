import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Submission, SubmissionDocument } from './schemas/submission.schema';
import { Model, Types } from 'mongoose';
import {
  Campaign,
  CampaignDocument,
} from 'src/campaigns/schemas/campaign.schema';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name)
    private submissionModel: Model<SubmissionDocument>,
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async createSubmission(data: {
    campaignId: string;
    influencerId: string;
    contentUrl: string;
  }) {
    const { campaignId, influencerId, contentUrl } = data;
    // const submission = new this.submissionModel(data);
    // campaignId: new Types.ObjectId(data.campaignId),
    const submission = new this.submissionModel({
      ...data,
      campaignId: new Types.ObjectId(data.campaignId),
    });
    await submission.save();
    await this.campaignModel.updateOne(
      { _id: new Types.ObjectId(campaignId) },
      { $addToSet: { influencers: new Types.ObjectId(influencerId) } },
    );

    return submission;
  }

  async updateSubmissionStatus(
    submissionId: string,
    status: 'approved' | 'rejected',
    rejectionReason?: string,
  ) {
    const submissionObjectId = new Types.ObjectId(submissionId);
    const submission = await this.submissionModel.findById(submissionObjectId);
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    submission.status = status;
    if (rejectionReason) {
      submission.rejectionReason = rejectionReason;
    }

    return submission.save();
  }
  async getSubmissionsForBrand(brandId: string) {
    const brandObjectId = new Types.ObjectId(brandId);
    const campaigns = await this.campaignModel.find({ brandId: brandObjectId });
    const campaignIds = campaigns.map((campaign) => campaign._id);
    console.log('campaign IDs:', campaignIds);

    const submissions = await this.submissionModel.find({
      campaignId: { $in: campaignIds.map((id) => new Types.ObjectId(id)) },
    });

    console.log('submissions:', submissions);

    return submissions;
  }
}
