import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

function OwnerNotifPage()
{
	const [data,setData] = useState([])
	const handleNotifDelete = async (e,d,i) => {
		e.preventDefault()
		try {
			await AccessHTTP("delete",`/delete/notif/${d.id}`)
			window.location.reload()
		} catch (e) {
			console.error(e)
		}
	}
	useEffect(()=>{
		async function fetchData() {
			try {
				const name = window.localStorage.getItem("user")
				const response = await AccessHTTP("get",`/get/notif/${btoa(name)}`)
				setData(response.data)
			} catch (e) {
				console.error(e)
			}
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
					&nbsp;Notifications
				</h4>
			</div>
			<div className="d-flex flex-column gap-3 pt-3">
				<div className="row row-cols-1 g-3 pb-3">
					<h5 className={"text-center text-white "+((!data.length)?"d-block":"d-none")} style={{textShadow:"2px 2px 2px black"}}>Empty notifications</h5>
					{
						data.map((d,i)=>(
							<div className="col d-flex">
								<div className="d-flex justify-content-center align-items-center rounded-start-2 p-3 bg-white">
									<i className="bi bi-bell fs-3" style={{color:"rgb(0,95,115)"}}></i>
								</div>
								<div className="d-flex flex-column w-100 p-3 fs-5 bg-white" style={{backgroundColor:"rgba(128,128,128,.15)",color:"rgb(0,95,115)"}}>
									<strong>{d.date}</strong>
									{d.details}
								</div>
								<button type="button" className="btn btn-danger rounded-0 rounded-end-2 p-4" data-bs-toggle="modal" data-bs-target={"#deleteNotif"+i}>
									<h4><i className="bi bi-trash"></i></h4>
								</button>
							</div>
						))
					}
				</div>
				{
					data.map((d,i)=>(
						<div className="modal fade" tabIndex="-1" id={"deleteNotif"+i}>
							<div className="modal-dialog modal-dialog-centered">
								<form className="modal-content" onSubmit={(e)=>{handleNotifDelete(e,d,i)}}>
									<div className="modal-header">
										<h5>Delete confirmation</h5>
									</div>
									<div className="modal-body">
										<p>Are you sure to delete this notification?</p>
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
		</div>
	)
}

export default OwnerNotifPage;