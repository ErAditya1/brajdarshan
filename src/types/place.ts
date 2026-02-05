export interface SeasonTiming {
  season: string;        // Summer / Winter
  validFrom: string;     // Post-Holi / Post-Diwali
  rows: string[];        // Free text rows
}

export type PlaceTimings = SeasonTiming[];

export interface HowToReach {
  byRoad?: string;
  byRail?: string;
  byAir?: string;
  localTransport?: string;
}

export interface PlaceContent {
  history: string;
  howToReach: HowToReach;
}
