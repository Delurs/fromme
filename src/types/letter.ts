export type LetterCategory =
  | 'A Little Hope'
  | 'A Memory'
  | 'For a Stranger'
  | 'Something Unsaid'
  | 'A Thank You';

export interface Letter {
  id: string;
  category: LetterCategory;
  message: string;
  locationName: string;
  detailLocation: string; // e.g. "Folded into bench #14"
  timeAgo: string;
  feltCount: number;
  xPercent: number; // For demo SVG map positioning
  yPercent: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}
