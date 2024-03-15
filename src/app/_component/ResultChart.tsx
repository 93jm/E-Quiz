"use client";

import ECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { quizItemList, quizWrongList } from "@/store";

const COLOR_PALETTE = ["#00c896", "tomato"];

const CHART_OPTION = {
  tooltip: {
    trigger: "item",
  },
  series: {
    type: "pie",
    radius: "100%",
    data: [],
    color: COLOR_PALETTE,
    label: {
      color: "gray",
    },
    itemStyle: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: "rgba(0, 0, 0, 0.5)",
    },
  },
};

export default function ResultChart() {
  const wrongList = useRecoilValue(quizWrongList);
  const defaultList = useRecoilValue(quizItemList);
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({
      ...CHART_OPTION,
      series: {
        ...CHART_OPTION.series,
        data: [
          { name: "CORRECT 🥳", value: defaultList.length - wrongList.length },
          {
            name: "INCORRECT 🥲",
            value: wrongList.length,
          },
        ],
      },
    });
  }, [wrongList, defaultList]);

  return <ECharts option={options} />;
}
