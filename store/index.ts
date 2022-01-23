import create from "zustand";
import { persist } from "zustand/middleware";

import { PersistentState, State } from "./types";
import { Curcuit, Driver, Race, Ranking } from "@api/types";

export const useStore = create<State>((set, get) => ({
  currentCurcuit: null,
  updateCurrentCurcuit: (curcuit: Curcuit) => {
    set({
      currentCurcuit: curcuit,
    });
  },
}));

export const usePersistentStore = create<PersistentState>(
  persist(
    (set, get) => ({
      cachedCurcuits: null,
      cachedRaces: [],
      cachedRankings: [],
      cachedDrivers: [],
      updateCachedCurcuits: (curcuits: Curcuit[]) => {
        set({
          cachedCurcuits: curcuits,
        });
      },
      updateCachedRaces: (races: Race[]) => {
        const oldRaces = get().cachedRaces;
        const newRaces = [...oldRaces];
        newRaces.push(...races);
        set({
          cachedRaces: newRaces,
        });
      },
      updateCachedRankings: (rankings: Ranking[]) => {
        const oldRankings = get().cachedRankings;
        const newRankings = [...oldRankings];
        newRankings.push(...rankings);
        set({
          cachedRankings: newRankings,
        });
      },
      updateCachedDrivers: (driver: Driver) => {
        const drivers = get().cachedDrivers;
        const newDrivers = [...drivers];
        newDrivers.push(driver);
        set({
          cachedDrivers: newDrivers,
        });
      },
    }),
    {
      name: "cached-storage",
    }
  )
);
