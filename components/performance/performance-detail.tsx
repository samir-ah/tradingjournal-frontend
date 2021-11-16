import {
	CurrencyDollarIcon,
	PaperClipIcon,
	PencilIcon,
	PresentationChartLineIcon,
	XIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { PopupContext } from "../../context/popup-context";
import { useHttpClient } from "../../hooks/use-http";
import { Bar, Line } from "react-chartjs-2";
import { range } from "../../utils/utils";

const PerformanceDetail: React.FC<{
	totalTrades: number;
	totalRatio: number;
	performanceByMonth: any[];
	cumulativePerformance: any[];
	performanceByInstrument: any[];
}> = (props) => {
	const authCtx = useContext(AuthContext);
	const router = useRouter();
	const { isLoading, axiosRequest } = useHttpClient();
	const popupCtx = useContext(PopupContext);

	const lineChartdata = {
		labels: range(1, props.cumulativePerformance.length),
		datasets: [
			{
				label: "Profit en %",
				data: props.cumulativePerformance.map((item) => {
					return item.cumulative_sum;
				}),
				fill: false,
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgba(255, 99, 132)",
			},
		],
	};

	const lineChartOptions = {
		responsive: true,
		elements: {
			point: {
				radius: 3,
			},
		},
		scales: {
			x: {
				display: false, //this will remove all the x-axis grid lines
			},

			y: {
				beginAtZero: true,
				grace: "5%",
			},
		},
		plugins: {
			legend: { display: false },
			title: {
				display: true,
				text: "Performances des 12 derniers mois",
			},
		},
	};
	const barChartLabels = [];
	const barChartValues = [];
	for (let i = 0; i < props.performanceByMonth.length; i++) {
		const monthData = props.performanceByMonth[i];
		barChartLabels.push(monthData.month + "/" + monthData.year);
		barChartValues.push(parseFloat(monthData.ratio));
	}
	const barChartInstrumentLabels = [];
	const barChartInstrumentValues = [];
	for (let i = 0; i < props.performanceByInstrument.length; i++) {
		const instrumentData = props.performanceByInstrument[i];
		barChartInstrumentLabels.push(
			instrumentData.name
		);
		barChartInstrumentValues.push(parseFloat(instrumentData.ratio));
	}

	const barChartData = {
		labels: barChartLabels,
		datasets: [
			{
				label: "Profit en %",
				data: barChartValues,
				backgroundColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const barChartOptions = {
		elements: {
			bar: {
				borderWidth: 2,
			},
		},
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				grace: "5%",
			},
		},
		plugins: {
			legend: { display: false },
			title: {
				display: true,
				text: "Performance mensuelle",
			},
		},
	};
	const barChartInstrumentData = {
		labels: barChartInstrumentLabels,
		datasets: [
			{
				label: "Profit en %",
				data: barChartInstrumentValues,
				backgroundColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const barChartInstrumentOptions = {
		elements: {
			bar: {
				borderWidth: 2,
			},
		},
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				grace: "5%",
			},
		},
		plugins: {
			legend: { display: false },
			title: {
				display: true,
				text: "Performance mensuelle",
			},
		},
	};

	return (
		<div className="w-full">
			<div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 w-full px-4 justify-center">
				<div className="font-bold md:col-span-2 flex justify-around  bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-100 shadow rounded-lg w-full md:max-w-lg mx-auto p-4">
					<div className="text-center">
						<div className="text-2xl ">{props.totalRatio}%</div>
						<div>
							<span>Profit total</span>
						</div>
					</div>
					<div className="text-center">
						<div className="text-2xl ">{props.totalTrades}</div>
						<div>
							<span>Trades au total</span>
						</div>
					</div>
				</div>
				<div className="bg-white dark:bg-gray-800 shadow rounded-lg w-full md:max-w-lg mx-auto p-4">
					<Line data={lineChartdata} options={lineChartOptions} />
				</div>
				<div className="bg-white dark:bg-gray-800 shadow rounded-lg w-full md:max-w-lg mx-auto p-4">
					<Bar data={barChartData} options={barChartOptions} />
				</div>
				<div className="bg-white dark:bg-gray-800 shadow rounded-lg w-full md:max-w-lg mx-auto p-4">
					<Bar data={barChartInstrumentData} options={barChartInstrumentOptions} />
				</div>
			</div>
		</div>
	);
};
export default PerformanceDetail;
