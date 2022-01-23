import axios from "./axios";

export const api = {
  getCircuits: () => {
    return axios.get("/circuits");
  },
  getRaces: (competitionId: number, season: number) => {
    return axios.get("/races", {
      params: {
        competition: competitionId,
        season,
      },
    });
  },
  getRankings: (raceId: number) => {
    return axios.get("/rankings/races", {
      params: {
        race: raceId,
      },
    });
  },
  getDriver: (driverId: number) => {
    return axios.get("/drivers", {
      params: {
        id: driverId,
      },
    });
  },
};
