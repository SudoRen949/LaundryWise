import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

function CustomerManagerPage()
{
	const [address,setAddress] = useState([])
	const [errorLoad,setErrorLoad] = useState(false)
	const [loading,setLoading] = useState(false)
	const de = (e) => { return document.getElementById(e) }
	const handleAddAddress = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			await AccessHTTP("post","/add/address",{
				user: window.localStorage.getItem("user"),
				userId: window.localStorage.getItem("id"),
				address: de("myAddress").value,
				type: de("myAddressType").value
			})
			setLoading(false)
			window.location.reload()
		} catch (e) {
			console.error(e)
			setLoading(false)
			alert((window.navigator.onLine)?"Unable to add address. \nReason: Server error.":"Unable to add address. \nReason: No internet connection.")
		}
	}
	const handleEditAddress = async (e,d,i) => {
		e.preventDefault()
		try {
			setLoading(true)
			await AccessHTTP("put","/update/address",{
				id: d.id,
				address: de(`myAddress${i}`).value,
				type: de(`myAddressType${i}`).value
			})
			setLoading(false)
			window.location.reload()
		} catch (e) {
			console.error(e)
			setLoading(false)
			alert((window.navigator.onLine)?"Unable to edit address. \nReason: Server error.":"Unable to edit address. \nReason: No internet connection.")
		}
	}
	const handleDeleteAddress = async (e,d,i) => {
		e.preventDefault()
		try {
			setLoading(true)
			AccessHTTP("delete",`/delete/address/${d.id}`)
			setLoading(false)
			window.location.reload()
		} catch (e) {
			console.error(e)
			setLoading(false)
			alert((window.navigator.onLine)?"Unable to delete address. \nReason: Server error.":"Unable to delete address. \nReason: No internet connection.")
		}
	}
	useEffect(()=>{
		async function fetchData() {
			try {
				const id = window.localStorage.getItem("id")
				const response = await AccessHTTP("get",`/get/address/${id}`)
				if (response.data.length === 0) {
					setErrorLoad(true)
					return
				}
				setAddress(response.data)
				setErrorLoad(false)
			} catch (e) {
				console.error(e)
				setErrorLoad(true)
			}
		}
		fetchData()
	},[])
	return (
		<div className="col ms-4 me-4 rounded-5 p-4" style={{backgroundColor:"rgba(255,255,255,.35)",height:"100%",overflow:"auto"}}>
			<div className="d-flex gap-2 border-bottom border-white">
				<h4 className="text-white d-flex align-items-center" style={{textShadow:"2px 2px 2px black"}}>
					<Link className="btn fs-1 text-white p-0" to="/dashboard/customer/home">
						<i className="bi bi-arrow-left-circle-fill m-0"></i>
					</Link>&nbsp;My addresses
				</h4>
			</div>
			<div className="d-flex flex-column gap-3 pt-3">
				<div className="d-flex justify-content-end w-100">
					<button type="button" id="addAddress" className="btn btn-success"
						data-bs-toggle="modal" data-bs-target="#addAddr">
						<i className="bi bi-plus-circle"></i>&nbsp;Add address
					</button>
				</div>
				<hr className="m-0"/>
				<div className="row row-cols-1 g-2" style={{color:"rgb(0,95,115)"}}>
					<div className={"col "+((errorLoad)?"d-block":"d-none")} style={{textShadow:"2px 2px 2px black",color:"white"}}>
						<h5 className="text-center">No address created</h5>
					</div>
					{
						address.map((d,i)=>(
							<div id={"addr"+i} className="col d-flex flex-column p-3 bg-white border border-1 rounded-3 shadow">
								<div className="d-flex justify-content-between">
									<p className="m-0 lead fw-bold"><i className="bi bi-geo-alt-fill"></i>&nbsp;{d.address}</p>
									<div>
										<button type="button" className="btn p-0" data-bs-toggle="modal" data-bs-target={"#editAddress"+i}>
											<i className="bi bi-pencil-square fs-4 text-success"></i>
										</button>
										<button type="button" className="ms-3 btn p-0" data-bs-toggle="modal" data-bs-target={"#deleteAddress"+i}>
											<i className="bi bi-trash-fill fs-4 text-danger"></i>
										</button>
									</div>
								</div>
								<p className="fst-italic m-0 mb-2">{d.type}</p>
							</div>
						))
					}
				</div>
			</div>
			<div id="myModals">
				<div className="modal fade" id="addAddr" tabIndex="-1">
					<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
						<form className="modal-content" onSubmit={handleAddAddress}>
							<div className="modal-header">
								<h5>Add new address</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
							</div>
							<div className="modal-body d-flex flex-column" style={{color:"rgb(0,95,115)"}}>
								<label className="form-label">Address type</label>
								<select id="myAddressType" className="form-select mb-2" required>
									<option value="" selected disabled>-- SELECT ADDRESS TYPE --</option>
									<option>Home</option>
									<option>Work</option>
									<option>Other</option>
								</select>
								<label className="form-label">Full address</label>
								<input type="text" id="myAddress" className="form-control" maxlength="191" placeholder="House no, Street, Barangay, City" required/>
							</div>
							<div className="modal-footer">
								<button type="submit" className="btn btn-success w-25">Add{(loading)?<>&nbsp;<span className="spinner-grow spinner-grow-sm"></span></>:""}</button>
							</div>
						</form>
					</div>
				</div>
				{
					address.map((d,i)=>(
						<>
							<div id={"editAddress"+i} className="modal fade" tabIndex="-1">
								<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
									<form className="modal-content" onSubmit={(e)=>{handleEditAddress(e,d,i)}}>
										<div className="modal-header">
											<h5>Edit address</h5>
											<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
										</div>
										<div className="modal-body">
											<label className="form-label">Address type</label>
											<select id={"myAddressType"+i} className="form-select mb-2" defaultValue={d.type} required>
												<option>Home</option>
												<option>Work</option>
												<option>Other</option>
											</select>
											<label className="form-label">Full address</label>
											<input type="text" id={"myAddress"+i} className="form-control" maxlength="191" defaultValue={d.address} placeholder="House no, Street, Barangay, City" required/>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-dark" data-bs-dismiss="modal">Cancel</button>
											<button type="submit" className="btn btn-success">Save changes{(loading)?<>&nbsp;<span className="spinner-grow spinner-grow-sm"></span></>:""}</button>
										</div>
									</form>
								</div>
							</div>
							<div id={"deleteAddress"+i} className="modal fade" tabIndex="-1">
								<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
									<form className="modal-content" onSubmit={(e)=>{handleDeleteAddress(e,d,i)}}>
										<div className="modal-header">
											<h5>Delete address?</h5>
											<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
										</div>
										<div className="modal-body">
											<p>Are you sure to delete this {String(d.type).toLowerCase()} address?</p>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-success" data-bs-dismiss="modal">No</button>
											<button type="submit" className="btn btn-danger">Yes{(loading)?<>&nbsp;<span className="spinner-grow spinner-grow-sm"></span></>:""}</button>
										</div>
									</form>
								</div>
							</div>
						</>
					))
				}
			</div>
		</div>
	)
}

export default CustomerManagerPage;