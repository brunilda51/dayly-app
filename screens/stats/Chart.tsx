import { useEffect, useState } from "react";
import { PieChart } from "react-native-chart-kit";

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

const Chart = (props: { list: any }) => {
  const [chartList, setChartList] = useState([]);
  useEffect(() => {
    const chartL = props.list?.map((a: any) => {
      return {
        name: a.viewer ? a.viewer.username : a.reader?.username,
        count: a.count,
        color: a.viewer ? a.viewer.color : a.reader?.color,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      };
    });
    setChartList(chartL);
  }, []);
  return (
    <PieChart
      data={chartList}
      width={350}
      height={250}
      chartConfig={chartConfig}
      accessor={"count"}
      backgroundColor={"transparent"}
      paddingLeft={"30"}
    />
  );
};

export default Chart;
