import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

import AccessHTTP from "../../../access/AccessHTTP"

function AdminShopsPage()
{
    const [shops,setShops] = useState([])
    const [totalOrders,setTotalOrders] = useState([])
    const [totalIncome,setTotalIncome] = useState([])
	useEffect(()=>{
        async function fetchData() {
            try {
            	let temp1 = [], temp2 = [], temp3 = [], temp4 = []
            	let numOfOrders = 0, incomeSum = 0
                const r1 = await AccessHTTP("get","/get/services")
                const r2 = await AccessHTTP("get","/get/orders")
                for (let i = 0; i < r1.data.length; ++i) {
                	for (let j = 0; j < r2.data.length; ++j) {
                		if (r2.data[j].shop_name !== r1.data[i].name) continue
                		numOfOrders += 1
                		temp2.push(r2.data[j].total_payment - 10)
                	}
                	temp1.push(numOfOrders)
                	temp3.push(temp2)
                	numOfOrders = 0
                	temp2 = []
                }
                for (let i = 0; i < temp3.length; ++i) {
                	for (let j = 0; j < temp3[i].length; ++j) {
                		incomeSum += temp3[i][j]
                	}
                	temp4.push(incomeSum.toLocaleString())
                	incomeSum = 0
                }
                console.log(temp4)
                setShops(r1.data)
                setTotalOrders(temp1)
                setTotalIncome(temp4)
            } catch (e) {
                alert(e)
            }
        }
        fetchData()
    },[])
	return (
		<div className="col ms-4 me-4 rounded-5 p-4" style={{backgroundColor:"rgba(255,255,255,.35)",height:"100%",overflow:"auto"}}>
			<div className="d-flex gap-2 border-bottom border-white">
				<h4 className="text-white d-flex align-items-center" style={{textShadow:"2px 2px 2px black"}}>
					<Link to="/dashboard/admin/home" className="btn fs-1 text-white p-0"><i className="bi bi-arrow-left-circle-fill m-0"></i></Link>&nbsp;Shops list</h4>
			</div>
			<div className="d-flex flex-column gap-3 pt-3">
				<table className="table table-striped-columns">
					<thead>
						<tr>
							<th scope="col">Shop name</th>
							<th scope="col">Total orders</th>
							<th scope="col">Services</th>
							<th scope="col">Total income</th>
						</tr>
					</thead>
					<tbody>
						{
                            shops.map((d,i)=>(
                                <tr>
                                    <td>{d.name}</td>
                                    <td>{totalOrders[i]} customers</td>
                                    <td>
                                        {
                                            JSON.parse(d.prices).map(dd=>(
                                                <p className="m-0">{dd.name} - {dd.price} Php, </p>
                                            ))
                                        }
                                    </td>
                                    <td>{totalIncome[i]} Php</td>
                                </tr>
                            ))
                        }
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default AdminShopsPage;