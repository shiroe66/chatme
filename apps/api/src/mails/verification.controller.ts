import { Public } from '@/common/decorators/metadata';
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { TokenDto } from './dto/token.dto';
import { VerificationService } from './verification.service';

@Controller()
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @Get('/verify')
  @Public()
  async verify(@Query(ValidationPipe) { token }: TokenDto) {
    return this.verificationService.verify(token);
  }
}
