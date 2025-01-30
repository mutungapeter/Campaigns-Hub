import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CampaignsService {
    constructor(
      @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>
    ) {}
  
    async createCampaign(campaignData: {
        title: string;
        description: string;
        deadline: Date;
        brandId: string;
      }) {
        const brandObjectId = new Types.ObjectId(campaignData.brandId);
        
        const campaign = new this.campaignModel({
            title: campaignData.title,
            description: campaignData.description,
            deadline: campaignData.deadline,
            brandId: brandObjectId,
            status: 'active',
            influencers: []
          });
        return campaign.save();
      }
    async getInfluencerCampaigns(influencerId: string) {
      console.log('influencerId:', influencerId);
      return this.campaignModel
        .find({ influencers: new Types.ObjectId(influencerId) }) 
        .select('title description deadline status')
        .exec();
    }
    async getBrandCampaigns(brandId: string) {
        return this.campaignModel
          .find({ brandId: new Types.ObjectId(brandId) })
          .select('title description deadline status')
          .exec();
      }
    async getCampaignDetails(campaignId: string, ) {
        return this.campaignModel
          .find({ _id: new Types.ObjectId(campaignId) })
          .select('title description deadline status influencers')
          .exec();
      }
      async getAllCampaigns() {
        return this.campaignModel
          .find({ status: 'active' }) 
          .select('title description deadline status')
          .exec();
      }
    async getCampaignInfluencers(campaignId: string, brandId: string) {
      const campaign = await this.campaignModel.findById(campaignId)
        .populate('influencers', 'name email')
        .exec();
  
      if (!campaign) {
        throw new NotFoundException('Campaign not found');
      }
  
      return campaign;
    }
  }
