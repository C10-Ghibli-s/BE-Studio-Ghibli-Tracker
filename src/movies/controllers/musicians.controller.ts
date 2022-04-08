import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Musicians')
@Controller('musicians')
export class MusiciansController {}
