import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import Chart from "chart.js/auto";
import { CasesType } from "../models/constants";
import { GraphData } from "../models/Maps";
import { useGetHistoricalData } from "../hooks/useGetHistoricalData";
import { startCase } from "lodash";
import Error from "../../../components/Error";
import { alertMessages } from "../../../utils/constants";

interface Props {
    casesType: CasesType;
}

const LineChart: React.FC<Props> = ({ casesType }) => {
    const { data: graphData, isLoading, isSuccess, isError } = useGetHistoricalData();

    const graphCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    const buildChartData = (data: GraphData, casesType: CasesType) => {
        let chartData = [];
        let lastDataPoint;
        for (let date in data[casesType]) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    };

    useEffect(() => {
        if (graphCanvasRef.current && isSuccess && graphData) {
            let chartData: {
                x: string;
                y: number;
            }[] = buildChartData(graphData, casesType)

            const graphLabels = chartData.map(dataPoint => dataPoint.x);
            const graphValues = chartData.map(dataPoint => dataPoint.y);

            const graphConfig = {
                type: "line" as const,
                data: {
                    labels: graphLabels,
                    datasets: [
                        {
                            label: startCase(casesType),
                            data: graphValues,
                            borderColor: "rgb(204, 16, 52)",
                            backgroundColor: "rgba(204, 16, 52, 0.5)",
                            // fill: true,
                            borderWidth: 1.5,
                            pointRadius: 0,
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                },
            };

            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            chartInstanceRef.current = new Chart(graphCanvasRef.current, graphConfig);
        }
    }, [graphData]);

    return (
        <>
            <div>
                <h2 className="text-2xl font-semibold mb-4 mt-2">Cases Fluctuations</h2>
                {isLoading ? (
                    <>
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    </>
                ) : isError ? <>
                    <Error text={alertMessages.apiError} />
                </> : (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <canvas ref={graphCanvasRef} width="800" height="400"></canvas>
                    </div>
                )}
            </div>
        </>
    )
}

export default LineChart