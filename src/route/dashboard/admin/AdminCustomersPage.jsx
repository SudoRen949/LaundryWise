import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

import AccessHTTP from "../../../access/AccessHTTP"

function AdminCustomersPage()
{
    const [customers,setCustomers] = useState([])
    const [orders,setOrders] = useState({})
	useEffect(()=>{
        async function fetchData() {
            try {
            	let temp1 = []
            	let numOfOrders = 0
                const r1 = await AccessHTTP("get","/get/users")
                const r2 = await AccessHTTP("get","/get/orders")
                for (let i = 0; i < r1.data.length; ++i) {
                	for (let j = 0; j < r2.data.length; ++j) {
                		if (r2.data[j].customer !== r1.data[i].name) continue
                		numOfOrders += 1
                	}
                	temp1.push(numOfOrders)
                	numOfOrders = 0
                }
                setCustomers(r1.data)
                setOrders(temp1)
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
					<Link to="/dashboard/admin/home" className="btn fs-1 text-white p-0"><i className="bi bi-arrow-left-circle-fill m-0"></i></Link>&nbsp;Customers</h4>
			</div>
			<div className="d-flex flex-column gap-3 pt-3">
				<table className="table table-striped-columns">
					<thead>
						<tr>
							<th scope="col">Cutomer name</th>
							<th scope="col">Total orders</th>
						</tr>
					</thead>
					<tbody>
						{
                            customers.map((d,i)=>(
                                <tr>
                                    <td>{d.name}</td>
                                    <td>{orders[i]}</td>
                                </tr>
                            ))
                        }
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default AdminCustomersPage;