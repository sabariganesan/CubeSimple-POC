import { useEffect, useState } from "react";
import Report from "./data/covidReport.json";
import "./App.css";
import { Grid } from "@mui/material";
import ReportTable from "./components/ReportTable";
import ReportChart from "./components/ReportChart";
import Summary from "./components/Summary";

function App() {
  const [covidReport, setCovidReport] = useState([]);
  const [summaryReport, setSummary] = useState({});

  const getCovidIndiaReport = () => {
    const covidReportData = JSON.parse(JSON.stringify(Report));
    const report = [];
    const summaryReport = {};
    for (const state in covidReportData) {
      const summary = {
        active: [],
        confirmed: [],
        deceased: [],
        recovered: [],
      };
      const stateReport = covidReportData[state];
      for (const district in stateReport) {
        const districtReport = stateReport[district];
        districtReport.district = district;
        districtReport.state = state;
        report.push(districtReport);
        summary.active.push(districtReport.active);
        summary.confirmed.push(districtReport.confirmed);
        summary.deceased.push(districtReport.deceased);
        summary.recovered.push(districtReport.recovered);
      }
      summaryReport[state] = summary;
    }
    for (const summaryState in summaryReport) {
      const status = {};
      const summaryValue = summaryReport[summaryState];
      for (const summarykey in summaryValue) {
        const count = summaryValue[summarykey].reduce((a, b) => {
          return a + b;
        }, 0);
        status[summarykey] = count;
      }
      summaryReport[summaryState] = status;
    }
    setSummary(summaryReport);
    setCovidReport(report.map((doc, index) => ({ ...doc, id: index + 1 })));
  };

  useEffect(() => {
    getCovidIndiaReport();
  }, []);
  console.log(summaryReport, "summaryReport");
  return (
    <main>
      <Grid container className="pt-2 px-2" spacing={2}>
        <Grid item xs={12}>
          <Summary summary={summaryReport} />
        </Grid>
        <Grid item xs={12}>
          <h2 className="text-align-center">Covid Report</h2>
        </Grid>
        <Grid item md={8} xs={12}>
          <ReportTable rowData={covidReport} />
        </Grid>
        <Grid item md={4} xs={12}>
          <ReportChart chartRowData={Report} />
        </Grid>
      </Grid>
    </main>
  );
}

export default App;
