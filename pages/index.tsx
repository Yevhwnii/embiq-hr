import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useRequest } from "ahooks";
import { HiOutlineChevronDoubleRight as DoubleArrowIcon } from "react-icons/hi";

import Paper from "@components/Paper";
import Slider from "@components/Slider";
import { usePersistentStore, useStore } from "store";
import Heading from "@components/Heading";
import { Curcuit, Driver, Ranking } from "@api/types";
import Select, { Option } from "@components/Select";
import {
  defaultSeasonSelectOption,
  seasonSelectOptions,
} from "@components/page-related/Home/constants";
import RankingTable from "@components/page-related/Home/RankingTable";
import { api } from "api";
import DriverCard from "@components/page-related/Home/DriverCard";

const Home: NextPage = () => {
  const curcuits = usePersistentStore((state) => state.cachedCurcuits);
  const races = usePersistentStore((state) => state.cachedRaces);
  const rankings = usePersistentStore((state) => state.cachedRankings);
  const drivers = usePersistentStore((state) => state.cachedDrivers);
  const updateRaces = usePersistentStore((state) => state.updateCachedRaces);
  const updateRankings = usePersistentStore(
    (state) => state.updateCachedRankings
  );
  const updateDrivers = usePersistentStore(
    (state) => state.updateCachedDrivers
  );
  const currentCurcuit = useStore((state) => state.currentCurcuit);
  const updateCurrentCurcuit = useStore((state) => state.updateCurrentCurcuit);

  const getRacesRequest = useRequest(api.getRaces, {
    manual: true,
    onSuccess: ({ data }) => {
      updateRaces(data.response);
      getRankings(data.response[0].id);
    },
    onError: (e) => console.log(e),
  });

  const getRankingsRequest = useRequest(api.getRankings, {
    manual: true,
    onSuccess: ({ data }) => {
      updateRankings(data.response);
      setCurrentRanking(data.response);
    },
    onError: (e) => console.log(e),
  });

  const getDriverRequest = useRequest(api.getDriver, {
    manual: true,
    onSuccess: ({ data }) => {
      const driver = data.response[0];
      updateDrivers(driver);
      setCurrentDriver(driver);
    },
    onError: (e) => console.log(e),
  });

  const [currentRanking, setCurrentRanking] = useState<Ranking[]>([]);
  const [currentDriver, setCurrentDriver] = useState<Driver | null>(null);
  const [currentCurcuitIndex, setCurrentCurcuitIndex] = useState(0);
  const [season, setSeason] = useState<Option>(defaultSeasonSelectOption);

  const onSlideChange = (
    currentSlideIndex: number,
    previousSlideIndex: number
  ) => {
    if (currentSlideIndex === previousSlideIndex) return;
    const curcuitCopy = curcuits && { ...curcuits[currentSlideIndex] };

    if (curcuitCopy) {
      updateCurrentCurcuit(curcuitCopy);
      setCurrentCurcuitIndex(currentSlideIndex);
    }
  };

  const getRankings = (raceId: number) => {
    const hasCachedRankingsForRace = !!rankings.find(
      (r) => r.race.id === raceId
    );
    if (hasCachedRankingsForRace) {
      const rankingsForRace = rankings.filter((r) => r.race.id === raceId);
      setCurrentRanking(rankingsForRace);
    } else {
      getRankingsRequest.run(raceId);
    }
  };

  useEffect(() => {
    if (!races || !currentCurcuit) return;

    setCurrentDriver(null);
    const race = races.find(
      (r) =>
        r.competition.id === currentCurcuit.competition.id &&
        r.season === Number(season.value)
    );
    if (race) {
      getRankings(race.id);
    } else {
      getRacesRequest.run(currentCurcuit.competition.id, Number(season.value));
    }
  }, [currentCurcuit, season, curcuits]);

  const handleDriverSelect = (driverId: number) => {
    const driver = drivers.find((d) => d.id === driverId);
    if (driver) {
      setCurrentDriver(driver);
    } else {
      getDriverRequest.run(driverId);
    }
  };

  return (
    <>
      <Head>
        <title>Formula F1</title>
      </Head>
      <Paper className="h-full flex flex-col">
        <div style={{ minHeight: 450 }} className="p-1 md:p-5">
          <Heading className="text-md md:text-lg">Curcuits</Heading>
          <div className="flex items-center justify-center my-2 mt-4 tracking-wider text-center text-sm md:text-md">
            {currentCurcuit && (
              <span>
                "{currentCurcuit.name}" -{" "}
                {currentCurcuit.competition.location.city}
                {", "}
                {currentCurcuit.competition.location.country}
              </span>
            )}
          </div>
          <Slider
            currentDisplayedItemIndex={currentCurcuitIndex}
            onSlideChange={onSlideChange}
          >
            {curcuits
              ? curcuits.map((curcuit) => (
                  <div
                    key={curcuit.id}
                    className="flex justify-center items-center p-5"
                  >
                    <Image
                      src={curcuit.image}
                      width={420}
                      height={220}
                      quality={100}
                      unoptimized
                      className="object-contain object-center"
                    />
                  </div>
                ))
              : undefined}
          </Slider>
        </div>
        <div>
          <Heading className="text-md md:text-lg">Rankings</Heading>
          <div className="my-3">
            <Select
              value={season.value}
              onChange={(v) => setSeason(v)}
              label="Season"
              options={seasonSelectOptions}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-2">
            <RankingTable
              onSelectDriver={handleDriverSelect}
              data={currentRanking}
              loading={getRacesRequest.loading || getRankingsRequest.loading}
            />
            <div className="flex items-center justify-center rotate-90 md:rotate-0">
              <DoubleArrowIcon className="w-8 h-8 text-gray-300" />
            </div>
            <DriverCard
              loading={getDriverRequest.loading}
              driver={currentDriver}
            />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default Home;
