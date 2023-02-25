import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { TokenDto } from './dto/token.dto';
import { VerificationService } from './verification.service';

@Controller()
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @Get('/verify')
  async verify(@Query(ValidationPipe) { token }: TokenDto) {
    return this.verificationService.verify(token);
  }
}
