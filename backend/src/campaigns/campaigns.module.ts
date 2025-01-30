import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from './schemas/campaign.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema }
    ])
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService],
  // exports: [CampaignsService],
  exports: [MongooseModule],
})
export class CampaignsModule {}
