import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Score')
@Controller('scores')
export class ScoresController {}
