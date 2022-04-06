export class Movie {
  id: number;
  seenMark: string;
  linkWiki: string;
  duration: number;
  releaseDate: string;
  title: { id: number; originalTitle: string; romajiTitle: string };
  writers: { id: number; name: string };
  directors: { id: number; name: string };
  mucisians: { id: number; name: string };
  score: {
    id: number;
    scoreByEmoji: string;
    scoreByStars: number;
    audienceScore: number;
  };
}
