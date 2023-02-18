import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ReportChart = ({ chartRowData }) => {
  const [chartType, setChartType] = useState("line");
  const [currentState, setcurrentState] = useState("Tamil Nadu");
  const [chartData, setChartData] = useState([]);

  const handleStateChange = (e) => {
    const { value } = e.target;
    setcurrentState(value);
  };

  const getDataAsPerState = () => {
    const stateData = chartRowData[currentState];
    const stateChartData = [];
    for (const district in stateData) {
      const districtData = {
        name: district,
        ...stateData[district],
      };
      stateChartData.push(districtData);
    }
    setChartData(stateChartData);
  };

  const handleChangeChart = (e) => {
    const { value } = e.target;
    setChartType(value);
  };

  useEffect(() => {
    getDataAsPerState();
  }, [currentState]);

  return (
    <section>
      <div className="flex">
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={currentState}
              label="State"
              onChange={handleStateChange}
            >
              {chartRowData &&
                Object.keys(chartRowData).map((state, stateIndex) => {
                  return (
                    <MenuItem key={stateIndex} value={state}>
                      {state.toUpperCase()}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-2">Chart Type</InputLabel>
            <Select
              labelId="demo-simple-select-label-2"
              value={chartType}
              label="Chart Type"
              onChange={handleChangeChart}
            >
              <MenuItem value={"line"}>Line Chart</MenuItem>
              <MenuItem value={"bar"}>Bar Chart</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <ResponsiveContainer width={"100%"} height={400}>
        {/* {chartData && chartData.length > 0 && renderChart(chartType, chartData)} */}
        {chartType === "line" ? (
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="active" stroke="#ff4d4d" />
            <Line type="monotone" dataKey="confirmed" stroke="#6666ff" />
            <Line type="monotone" dataKey="deceased" stroke="#ff884d" />
            <Line type="monotone" dataKey="recovered" stroke="#33ff99" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="active" fill="#ff4d4d" />
            <Bar dataKey="confirmed" fill="#6666ff" />
            <Bar dataKey="deceased" fill="#ff884d" />
            <Bar dataKey="recovered" fill="#33ff99" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </section>
  );
};

export default ReportChart;
