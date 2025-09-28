import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

function CustomerHistoryPage()
{
	const [data,setData] = useState([])
	const handleOrderDelete = async (e,d,i) => {
		e.preventDefault()
		try {
			const id = window.localStorage.getItem("id")
			await AccessHTTP("delete",`/delete/order/${id}`)
			window.location.reload()
		} catch (e) {
			console.error(e)
		}
	}
	useEffect(()=>{
		async function fetchDatas() {
			try {
				const id = window.localStorage.getItem("id")
				const response = await AccessHTTP("get",`/get/order/customer/${id}`)
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
					<Link className="btn fs-1 text-white p-0" to="/dashboard/customer/home">
						<i className="bi bi-arrow-left-circle-fill m-0"></i>
					</Link>&nbsp;Order history
				</h4>
			</div>
			<div className="d-flex flex-column gap-3 pt-3 table-responsive">
				<table className="table table-striped-columns">
					<thead>
						<tr>
							<th scope="col">Order no.</th>
							<th scope="col">Order date</th>
							<th scope="col">Bill-to name</th>
							<th scope="col">Shop name</th>
							<th scope="col">Service name</th>
							<th scope="col">Total</th>
							<th scope="col">Reference #</th>
							<th scope="col">Status</th>
						</tr>
					</thead>
					<tbody id="orderTable">
						{
							(!data.length)?<tr>
								<td colspan="8" className="text-center">No orders pending</td>
							</tr>:""
						}
						{
							data.map((d,i)=>(
								<tr>
									<td>{i}</td>
									<td>{d.date_ordered}</td>
									<td>{d.service_owner}</td>
									<td>{d.shop_name}</td>
									<td>{d.service}</td>
									<td>{d.total_payment} Php</td>
									<td>{d.reference_code}</td>
									<td>{d.status}</td>
									<td>
										<button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteOrder"+i}>Delete</button>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
			{
				data.map((d,i)=>(
					<div id={"deleteOrder"+i} className="modal fade" tabIndex="-1">
						<div className="modal-dialog modal-dialog-centered">
							<form className="modal-content" onSubmit={(e)=>{handleOrderDelete(e,d,i)}}>
								<div className="modal-header">
									<h5>Delete this pending order?</h5>
								</div>
								<div className="modal-body">
									<p>Are you to delete this pending order?<br/>deleting this will cancel your transaction.</p>
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

export default CustomerHistoryPage;