import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Header as HeaderRNE, HeaderProps, Icon } from "@rneui/themed";
import { useSelector } from "react-redux";
import { useGetBookStatsQuery } from "../../redux/booksApi";
import { useGetMovieStatsQuery } from "../../redux/moviesApi";
import { useGetTvShowStatsQuery } from "../../redux/tvApi";
import Chart from "./Chart";

const Stats = () => {
  const {
    data: bookStats,
    error: bookStatsError,
    isLoading: isLoadingBooks,
  }: any = useGetBookStatsQuery();
  const {
    data: movieStats,
    error: movieStatsError,
    isLoading: isLoadingMovies,
  }: any = useGetMovieStatsQuery();
  const {
    data: tvStats,
    error: tvStatsError,
    isLoading: isLoadingTvShows,
  }: any = useGetTvShowStatsQuery();

  useEffect(() => {}, [movieStats, bookStats, tvStats]);
  const allListsPopulated = bookStats && movieStats && tvStats;
  return (
    <SafeAreaProvider>
      <ScrollView>
        {allListsPopulated && (
          <>
            <HeaderRNE
              backgroundColor="#00a6a6"
              placement="left"
              leftComponent={{ icon: "leaderboard", color: "#fff" }}
              centerComponent={{ text: "Book Stats", style: { color: "#fff" } }}
            />
            <Chart list={bookStats} />
            <HeaderRNE
              backgroundColor="#00a6a6"
              placement="left"
              leftComponent={{ icon: "leaderboard", color: "#fff" }}
              centerComponent={{
                text: "Movie Stats",
                style: { color: "#fff" },
              }}
            />
            <Chart list={movieStats} />
            <HeaderRNE
              backgroundColor="#00a6a6"
              placement="left"
              leftComponent={{ icon: "leaderboard", color: "#fff" }}
              centerComponent={{ text: "Tv Stats", style: { color: "#fff" } }}
            />
            <Chart list={tvStats} />
          </>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Stats;
