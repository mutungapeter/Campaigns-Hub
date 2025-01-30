import { Controller, Post, Body, Patch, Param, Request, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SubmissionsService } from './submissions.service';
import { Request as ExpressRequest } from 'express';
// interface RequestWithUser extends Request {
//     user: {
//       sub: string;
//       email: string;
//       role: string;
//     };
//   }
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
@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post("submit-content")
  async submitContent(
    @Body() body: { campaignId: string; contentUrl: string },
    @Request() req: AuthenticatedRequest
  ) {
    return this.submissionsService.createSubmission({
      campaignId: body.campaignId,
      influencerId: req.user.sub,
      contentUrl: body.contentUrl
    });
  }

  @Patch('status/:submissionId')
  async updateSubmissionStatus(
    @Param('submissionId') submissionId: string,
    @Body() body: { status: 'approved' | 'rejected'; rejectionReason?: string }
  ) {
    return this.submissionsService.updateSubmissionStatus(
      submissionId,
      body.status,
      body.rejectionReason
    );
  }
  @Get('brand-submissions')
  async getBrandSubmissions(@Request() req: AuthenticatedRequest) {
    console.log('user in createcampaigns controller:', req.user);
    console.log('Brand ID from token:', req.user.sub);
    return this.submissionsService.getSubmissionsForBrand(req.user.sub);
  }
}