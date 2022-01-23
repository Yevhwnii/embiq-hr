export interface Curcuit {
  id: number;
  name: string;
  length: string;
  opened: number;
  image: string;
  capacity: number;
  competition: Competition;
}

export interface Competition {
  id: number;
  name: string;
  location: Location;
}

export interface Location {
  city: string;
  country: string;
}

export interface Race {
  id: number;
  competition: Competition;
  circuit: {
    id: number;
    name: string;
    location: Location;
  };
  season: number;
  type: string;
  laps: {
    current: string;
    total: number;
  };
  distance: string;
  timezone: string;
  date: string;
  weather: string;
  status: string;
}

export interface Ranking {
  race: {
    id: number;
  };
  driver: {
    id: number;
    name: string;
    image: string;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  position: number;
  time: string;
  laps: number;
  grid: string;
  pits: number;
}

export interface Driver {
  id: number;
  name: string;
  image: string;
  nationality: string;
  birthdate: string;
}
