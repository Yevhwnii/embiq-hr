import { Curcuit, Driver, Race, Ranking } from "@api/types";

export interface State {
  currentCurcuit: Curcuit | null;
  updateCurrentCurcuit: (curcuit: Curcuit) => void;
}

export interface PersistentState {
  cachedCurcuits: Curcuit[] | null;
  cachedRaces: Race[];
  cachedRankings: Ranking[];
  cachedDrivers: Driver[];
  updateCachedCurcuits: (curcuits: Curcuit[]) => void;
  updateCachedRaces: (races: Race[]) => void;
  updateCachedRankings: (rankings: Ranking[]) => void;
  updateCachedDrivers: (driver: Driver) => void;
}
