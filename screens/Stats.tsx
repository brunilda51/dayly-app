import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import booksService from "../services/books.service";
import { Header } from "react-native-elements";
import moviesService from "../services/movies.service";
import tvService from "../services/tv.service";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromBooksset: false, // optional
};
const Stats = () => {
  const [books, setBooks] = useState<any>([]);
  const [tvShows, setTvShows] = useState<any>([]);
  const [movies, setMovies] = useState<any>([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const result = await booksService.getBookStats();
        const users = result.map((a: any) => {
          return {
            name: a.reader.username,
            count: a.count,
            color: a.reader.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          };
        });
        setBooks(users);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    async function fetchMovies() {
      try {
        const result = await moviesService.getMovieStats();
        const users = result.map((a: any) => {
          return {
            name: a.viewer.username,
            count: a.count,
            color: a.viewer.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          };
        });
        setMovies(users);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    async function fetchTvShows() {
      try {
        const result = await tvService.getTvShowStats();
        const users = result.map((a: any) => {
          return {
            name: a.viewer.username,
            count: a.count,
            color: a.viewer.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          };
        });
        setTvShows(users);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchTvShows();
    fetchBooks();
    fetchMovies();
  }, []);

  return (
    <ScrollView>
      <Header
        backgroundColor="#5f9ea0"
        placement="left"
        leftComponent={{ icon: "leaderboard", color: "#fff" }}
        centerComponent={{ text: "Book Stats", style: { color: "#fff" } }}
      />
      <PieChart
        data={books}
        width={350}
        height={250}
        chartConfig={chartConfig}
        accessor={"count"}
        backgroundColor={"transparent"}
        paddingLeft={"30"}
      />
      <Header
        backgroundColor="#5f9ea0"
        placement="left"
        leftComponent={{ icon: "leaderboard", color: "#fff" }}
        centerComponent={{ text: "Movie Stats", style: { color: "#fff" } }}
      />
      <PieChart
        data={movies}
        width={350}
        height={250}
        chartConfig={chartConfig}
        accessor={"count"}
        backgroundColor={"transparent"}
        paddingLeft={"30"}
      />
      <Header
        backgroundColor="#5f9ea0"
        placement="left"
        leftComponent={{ icon: "leaderboard", color: "#fff" }}
        centerComponent={{ text: "Tv Stats", style: { color: "#fff" } }}
      />
      <PieChart
        data={tvShows}
        width={350}
        height={250}
        chartConfig={chartConfig}
        accessor={"count"}
        backgroundColor={"transparent"}
        paddingLeft={"30"}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Stats;
