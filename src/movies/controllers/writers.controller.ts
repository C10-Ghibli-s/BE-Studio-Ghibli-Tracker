import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Writers')
@Controller('writers')
export class WritersController {}
