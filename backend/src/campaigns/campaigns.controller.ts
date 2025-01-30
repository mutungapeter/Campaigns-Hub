import { Controller, Get, Param, UseGuards, Request, Post, Body, ForbiddenException} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CampaignsService } from './campaigns.service';
import { Request as ExpressRequest } from 'express';

  interface JwtPayload {
    email: string;
    sub: string;
    role: string;
    name: string;
    id: string;
    iat?: number;
    exp?: number;
  }
  interface AuthenticatedRequest extends ExpressRequest {
    user: JwtPayload;
  }
@Controller('campaigns')
// @UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}
  @Post('create-campaign')
  @UseGuards(JwtAuthGuard)
  async createCampaign(
    @Body() campaignData: {
      title: string;
      description: string;
      deadline: Date;
    },
    @Request() req: AuthenticatedRequest
  ) {
    // Only brands can create campaigns
    if (req.user.role !== 'brand') {
      throw new ForbiddenException('Only brands can create campaigns');
    }
    console.log('user in createcampaigns controller:', req.user);
    console.log('Brand ID from token:', req.user.sub);

    return this.campaignsService.createCampaign({
      ...campaignData,
      brandId: req.user.sub
    });
  }
  //for both brand and influencer
  @Get('my-campaigns')
  @UseGuards(JwtAuthGuard)
  async getMyCampaigns(@Request() req: AuthenticatedRequest) {
    console.log('User from request:', req.user); // Debug log
    console.log('User role:', req.user.role); // Debug log
    
    if (req.user.role === 'brand') {
      return this.campaignsService.getBrandCampaigns(req.user.sub);
    } else {
      return this.campaignsService.getInfluencerCampaigns(req.user.sub);
    }
  }

  //getting influencers in a campaign
  @Get(':campaignId/influencers')
  @UseGuards(JwtAuthGuard)
  async getCampaignInfluencers(
    @Param('campaignId') campaignId: string,
    @Request() req: AuthenticatedRequest
  ) {
    return this.campaignsService.getCampaignInfluencers(campaignId, req.user.sub);
  }

  //getting campaign details
  @Get('campaign-details/:campaignId')
  @UseGuards(JwtAuthGuard)
async getCampaignDetails(
  @Param('campaignId') campaignId: string,
//   @Request() req: AuthenticatedRequest
) {
  return this.campaignsService.getCampaignDetails(campaignId);
}
@Get('all-campaigns')  
  async getAllCampaigns() {
    return this.campaignsService.getAllCampaigns();
  }
}
