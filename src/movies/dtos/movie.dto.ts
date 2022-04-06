import { IsString, IsNumber, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMovieDto {
  @IsString()
  readonly seenMark: string;

  @IsString()
  @IsUrl()
  readonly linkWiki: string;

  @IsNumber()
  readonly duration: number;

  @IsString()
  readonly releaseDate: string;

  readonly title: { id: number; originalTitle: string; romajiTitle: string };
  readonly writers: { id: number; name: string };
  readonly directors: { id: number; name: string };
  readonly mucisians: { id: number; name: string };
  readonly score: {
    id: number;
    scoreByEmoji: string;
    scoreByStars: number;
    audienceScore: number;
  };
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
