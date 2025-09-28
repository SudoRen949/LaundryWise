import { Link } from "react-router-dom"
import { Bar } from "react-chartjs-2"
import { Chart, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from "chart.js"
import { useEffect, useState } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

function OwnerReportPage()
{
	Chart.register(
		CategoryScale, LinearScale,
		PointElement, BarElement,
		Title, Tooltip, Legend
	)
	const [mtOptions,setMtOptions] = useState({responsive:true,plugins:{}})
	const [wkOptions,setWkOptions] = useState({responsive:true,plugins:{}})
	const [wkData,setWkData] = useState({labels:[],datasets:[]})
	const [mtData,setMtData] = useState({labels:[],datasets:[]})
	useEffect(()=>{
		const date = new Date()
		const thisWeek = parseInt(date.getDate()+6) + parseInt(date.getMonth()) + parseInt(date.getFullYear())
		const thisMonth = parseInt(date.getMonth()) + parseInt(date.getFullYear())
		console.log(thisWeek)
		function fetchData() {
			let thisWeekRevenue = [], totalThisWeekRevenue = 0
			let lastWeekRevenue = [], totalLastWeekRevenue = 0
			let thisMonthRevenue = [], totalThisMonthRevenue = 0
			let lastMonthRevenue = [], totalLastMonthRevenue = 0
			const id = window.localStorage.getItem("id")
			AccessHTTP("get",`/get/report/${id}`)
			.then(response => {
				response.data.map((d,i)=>{
					const e = parseInt(d.value)
					if (d.week === thisWeek) thisWeekRevenue.push(e)
					else lastWeekRevenue.push(e)
					if (d.month === thisMonth) thisMonthRevenue.push(e)
					else lastMonthRevenue.push(e)
					return null
				})
				// sum all values in the arrays to be displayed on chart
				thisWeekRevenue.forEach((r)=>{totalThisWeekRevenue+=r})
				lastWeekRevenue.forEach((r)=>{totalLastWeekRevenue+=r})
				thisMonthRevenue.forEach((r)=>{totalThisMonthRevenue+=r})
				lastMonthRevenue.forEach((r)=>{totalLastMonthRevenue+=r})
				// setting up the chart
				setWkOptions({responsive:false,plugins:{legend:{position:'top'},title:{display:true,text:'Weekly revenue'}}})
				setMtOptions({responsive:false,plugins:{legend:{position:'top'},title:{display:true,text:'Monthly revenue'}}})
				setWkData({
					labels: ["Weekly comparison"],
					datasets: [
						{
							label: "This week",
							data: [totalThisWeekRevenue],
							backgroundColor: 'rgb(0,200,0)',
							tension: 0.1
						},
						{
							label: 'Last week',
							data: [totalLastWeekRevenue],
							backgroundColor: 'rgb(255,128,0)',
							tension: 0.1
						}
					]
				})
				setMtData({
					labels: ["Monthly comparison"],
					datasets: [
						{
							label: 'This month',
							data: [totalThisMonthRevenue],
							backgroundColor: 'rgb(0,200,0)',
							tension: 0.1
						},
						{
							label: 'Last month',
							data: [totalLastMonthRevenue],
							backgroundColor: 'rgb(255,128,0)',
							tension: 0.1
						}
					]
				})
			})
			.catch(e => {
				console.error(e)
			})
		}
		fetchData()
	},[])
	return (
		<div className="col ms-4 me-4 rounded-5 p-4" style={{backgroundColor:"rgba(255,255,255,.35)",height:"100%",overflow:"auto"}}>
			<div className="d-flex gap-2 border-bottom border-white">
				<h4 className="text-white d-flex align-items-center" style={{textShadow:"2px 2px 2px black"}}>
					<Link className="btn fs-1 text-white p-0" to="/dashboard/owner/home">
						<i className="bi bi-arrow-left-circle-fill m-0"></i>
					</Link>
					&nbsp;Reports
				</h4>
			</div>
			<div className="d-flex flex-column gap-3 pt-3">
				<p className="text-center m-0 fs-4" style={{color:"rgb(0,95,115)"}}>
					<strong>Financial report</strong>
				</p>
				<div className="p-5 rounded-2 bg-white">
					<Bar options={wkOptions} data={wkData} />
				</div>
				<div className="p-5 rounded-2 bg-white">
					<Bar options={mtOptions} data={mtData} />
				</div>
			</div>
		</div>
	)
}

export default OwnerReportPage;