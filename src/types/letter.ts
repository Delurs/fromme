export interface Letter {
  id: string;
  message: string;
  locationName?: string;
  detailLocation?: string; // Optional detail/nook location
  timeAgo: string;
  feltCount: number;
  xPercent: number; // Demo SVG map percentage (0-100)
  yPercent: number; // Demo SVG map percentage (0-100)
  coordinates: {
    lat: number;
    lng: number;
  };
}
