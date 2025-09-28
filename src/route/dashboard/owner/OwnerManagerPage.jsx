import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

function OwnerManagerPage()
{
	const [data,setData] = useState([])
	const handleStatusChange = async (d,i) => {
		const dc = new Date()
		const thisDate = `${dc.getMonth()}/${dc.getDate()}/${dc.getFullYear()} ${dc.getHours()}:${dc.getMinutes()} ${(dc.getHours()>12)?"PM":"AM"}`
		const ownerName = window.localStorage.getItem("user")
		const status_new = document.getElementById(`statSelect${i}`).value
		try {
			await AccessHTTP("put","/update/order/status",{
				customer_id: d.customer_id,
				new_status: status_new
			})
			await AccessHTTP("post","/add/notif",{ // send customer a notification when changing its order status
				date: `${thisDate} - Order status`,
				from: btoa(ownerName),
				to: btoa(d.customer),
				details: `${ownerName} from ${d.shop_name} just changed the status of your order to "${status_new}". Go to Order history to see more."`
			})
		} catch (e) {
			console.error(e)
		}
	}
	const handleOrderDeletion = async (e,d,i) => {
		e.preventDefault()
		try {
			await AccessHTTP("delete",`/delete/order/${d.customer_id}`)
			window.location.reload()
		} catch (e) {
			console.error(e)
		}
	}
	useEffect(()=>{
		async function fetchDatas() {
			try {
				const id = window.localStorage.getItem("id")
				const response = await AccessHTTP("get",`/get/order/owner/${id}`)
				setData(response.data)
			} catch (e) {
				console.error(e)
			}
		}
		fetchDatas()
	},[])
	return (
		<div className="col ms-4 me-4 rounded-5 p-4" style={{backgroundColor:"rgba(255,255,255,.35)",height:"100%",overflow:"auto"}}>
			<div className="d-flex gap-2 border-bottom border-white">
				<h4 className="text-white d-flex align-items-center" style={{textShadow:"2px 2px 2px black"}}>
					<Link to="/dashboard/owner/home" className="btn fs-1 text-white p-0">
						<i className="bi bi-arrow-left-circle-fill m-0"></i>
					</Link>&nbsp;Manage Orders
				</h4>
			</div>
			<div className="d-flex flex-column gap-3 pt-3 table-responsive">
				<table className="table table-striped-columns">
					<thead>
						<tr>
							<th scope="col">Order ID</th>
							<th scope="col">Customer name</th>
							<th scope="col">Customer Address</th>
							<th scope="col">Shop name</th>
							<th scope="col">Service</th>
							<th scope="col">Reference code</th>
							<th scope="col">Status</th>
						</tr>
					</thead>
					<tbody id="orderTable">
						{/*{(error!=="")?<tr><td colspan="6" className="text-center">{error}</td></tr>:""}*/}
						{
							(!data.length)?<tr>
								<td colspan="7" className="text-center">No orders yet</td>
							</tr>:""
						}
						{
							data.map((d,i)=>(
								<>
									<tr>
										<td>{i}</td>
										<td>{d.customer}</td>
										<td>{d.address}</td>
										<td>{d.shop_name}</td>
										<td>{d.service}</td>
										<td>{d.reference_code}</td>
										<td>
											<select id={"statSelect"+i} defaultValue={d.status} className="form-select" onChange={()=>{handleStatusChange(d,i)}}>
												<option>Pending for pickup</option>
												<option>In queue</option>
												<option>On going</option>
												<option>Out for delivery</option>
												<option>Completed</option>
											</select>
										</td>
										<td>
											<button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteConfirm"+i}>Delete</button>
										</td>
									</tr>
								</>
							))
						}
					</tbody>
				</table>
			</div>
			{
				data.map((d,i)=>(
					<div id={"deleteConfirm"+i} className="modal fade" tabIndex="-1">
						<div className="modal-dialog modal-dialog-centered">
							<form className="modal-content" onSubmit={(e)=>{handleOrderDeletion(e,d,i)}}>
								<div className="modal-header">
									<h5>Delete {d.customer}'s order?</h5>
								</div>
								<div className="modal-body">
									<p>Are you sure to delete this order?</p>
									<p className="fw-bold">This action cannot be undone</p>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-dark" data-bs-dismiss="modal">No</button>
									<button type="submit" className="btn btn-danger">Yes</button>
								</div>
							</form>
						</div>
					</div>
				))
			}
		</div>
	)
}

export default OwnerManagerPage;