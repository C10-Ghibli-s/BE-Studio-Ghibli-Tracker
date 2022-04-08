import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Titles')
@Controller('titles')
export class TitlesController {}
