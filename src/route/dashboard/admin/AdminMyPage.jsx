import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import { Bar } from "react-chartjs-2"
import { Chart, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from "chart.js"

import AccessHTTP from "../../../access/AccessHTTP"

function AdminMyPage()
{
	Chart.register(
		CategoryScale, LinearScale,
		PointElement, BarElement,
		Title, Tooltip, Legend
	)
	// let totalIncomeData = {labels:["Total Income"],datasets:[]}, totalIncomeDataOptions = {responsive:true,plugins:{legend:{position:"top"},title:{display:true,text:"Total Income"}}}
	// let totalOrdersData = {labels:["Total Orders"],datasets:[]}, totalOrdersDataOptions = {responsive:true,plugins:{legend:{position:"top"},title:{display:true,text:""}}}
	// let totalCustomersData = {labels:["Total Customers"],datasets:[]}, totalCustomersDataOptions = {responsive:true,plugins:{legend:{position:"top"},title:{display:true,text:""}}}
    const [totalIncomeData,setTotalIncomeData] = useState({labels:[],datasets:[]})
    const [totalIncomeDataOptions,setTotalIncomeDataOptions] = useState({responsive:true,plugins:{}})
    const [totalOrdersData,setTotalOrdersData] = useState({labels:[],datasets:[]})
    const [totalOrdersDataOptions,setTotalOrdersDataOptions] = useState({responsive:true,plugins:{}})
    const [totalCustomersData,setTotalCustomersData] = useState({labels:[],datasets:[]})
    const [totalCustomersDataOptions,setTotalCustomersDataOptions] = useState({responsive:true,plugins:{}})
    const [orders,setOrders] = useState(0)
    const [income,setIncome] = useState(0)
    const [customers,setCustomers] = useState(0)
	const handleShowMyIncome = () => {
		const t = document.getElementById("myTotalIncome"),
					a = document.getElementById("myTotalOrders"),
					b = document.getElementById("myTotalCustomers")
		t.classList.remove("d-none")
		a.classList.add("d-none")
		b.classList.add("d-none")
	}
	const handleShowMyOrders = () => {
		const t = document.getElementById("myTotalIncome"),
					a = document.getElementById("myTotalOrders"),
					b = document.getElementById("myTotalCustomers")
		t.classList.add("d-none")
		a.classList.remove("d-none")
		b.classList.add("d-none")
	}
	const handleShowMyCustomers = () => {
		const t = document.getElementById("myTotalIncome"),
					a = document.getElementById("myTotalOrders"),
					b = document.getElementById("myTotalCustomers")
		t.classList.add("d-none")
		a.classList.add("d-none")
		b.classList.remove("d-none")
	}
	useEffect(()=>{
        async function fetchData() {
            document.getElementById("myIncomeButton").click()
            try {
                const response = await AccessHTTP("get","/get/orders")
                const response2 = await AccessHTTP("get","/get/users")
                setOrders(response.data.length)
                setIncome(response.data.length * 10)
                let ii = 0
                for (let i = 0; i < response2.data.length; ++i) {
                    if (response2.data[i].role !== "customer") continue
                    ii++
                }
                setCustomers(ii)
                setTotalIncomeDataOptions({
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top"
                        },
                        title: {
                            display: true,
                            text: "Total income graph"
                        }
                    }
                })
                setTotalOrdersDataOptions({
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top"
                        },
                        title: {
                            display: true,
                            text: "Total services orders"
                        }
                    }
                })
                setTotalCustomersDataOptions({
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top"
                        },
                        title: {
                            display: true,
                            text: "Total service customers"
                        }
                    }
                })
                setTotalIncomeData({
                    labels: ["Total Income (Php)"],
                    datasets: [
                        {
                            label: "Total income (Target income: " + (income*2) + " Php)",
                            data: [income,income*2],
                            backgroundColor: "rgb(128,50,128)"
                        }
                    ]
                })
                setTotalOrdersData({
                    labels: ["Total orders"],
                    datasets: [
                        {
                            label: "Total customers orders",
                            data: [orders,orders*10],
                            backgroundColor: "rgb(128,128,0)"
                        }
                    ]
                })
                setTotalCustomersData({
                    labels: ["Total customers"],
                    datasets: [
                        {
                            label: "Total customers",
                            data: [customers,customers*10],
                            backgroundColor: "rgb(0,128,128)"
                        }
                    ]
                })
            } catch (e) {
                alert(e)
            }
        }
        fetchData()
    },[income])
	return (
		<div className="col d-flex flex-column text-white" style={{textShadow:"2px 2px 2px black",height:"100%",overflow:"auto"}}>
  		<div className="row row-cols-md-2 row-cols-1">
  			<div className="col-md-4 d-md-block d-flex gap-3 gap-md-1 w-md-100" style={{overflow:"auto"}}>
  				<button id="myIncomeButton" onClick={handleShowMyIncome} className="rounded-4 border border-white p-3 d-flex flex-column mb-md-5 mb-3 text-white w-100" style={{backgroundColor:"rgba(255,255,255,.35)",textShadow:"2px 2px 2px black"}}>
  					<h2><i className="bi bi-cash-stack"></i></h2>
  					<h4>Total Income: <b id="myIncome">{income}</b>&nbsp;Php</h4>
  				</button>
  				<button onClick={handleShowMyOrders} className="rounded-4 border border-white p-3 d-flex flex-column mb-md-5 mb-3 text-white w-100" style={{backgroundColor:"rgba(255,255,255,.35)",textShadow:"2px 2px 2px black"}}>
  					<h2><i className="bi bi-bag-check-fill"></i></h2>
  					<h4>Total Orders: <b id="myOrders">{orders}</b></h4>
  				</button>
  				<button onClick={handleShowMyCustomers} className="rounded-4 border border-white p-3 d-flex flex-column mb-md-5 mb-3 text-white w-100" style={{backgroundColor:"rgba(255,255,255,.35)",textShadow:"2px 2px 2px black"}}>
  					<h2><i className="bi bi-people"></i></h2>
  					<h4>Total Customers: <b id="myCustomers">{customers}</b></h4>
  				</button>
  			</div>
  			<div className="col-md-8">
  				<div className="rounded-4 border border-white p-3 d-flex flex-column" style={{backgroundColor:"rgba(255,255,255,.35)"}}>
  					<div id="myTotalIncome" className="d-none bg-white p-2 mb-3 rounded-3 d-flex justify-content-center" style={{height:"500px"}}>
  						<Bar options={totalIncomeDataOptions} data={totalIncomeData} />
  					</div>
  					<div id="myTotalOrders" className="d-none bg-white p-2 mb-3 rounded-3 d-flex justify-content-center" style={{height:"500px"}}>
  						<Bar options={totalOrdersDataOptions} data={totalOrdersData} />
  					</div>
  					<div id="myTotalCustomers" className="d-none bg-white p-2 mb-3 rounded-3 d-flex justify-content-center" style={{height:"500px"}}>
  						<Bar options={totalCustomersDataOptions} data={totalCustomersData} />
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
	)
}

export default AdminMyPage;