import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

import OwnerNavbar from "../../../objects/dashboard/owner/OwnerNavbar"
import OwnerSidebar from "../../../objects/dashboard/owner/OwnerSidebar"
import OwnerFloatMenu from "../../../objects/dashboard/owner/OwnerFloatMenu"

function OwnerPage()
{
	const navigate = useNavigate()
	const handleSubmit = (e) => {
		e.preventDefault()
		document.getElementById("hiddenButton").click()
		navigate("/dashboard/owner/profile")
	}
	useEffect(()=>{
		async function tempFetchData() {
			try {
				const id = window.localStorage.getItem("id")
				const response = await AccessHTTP("get",`/get/user/${id}`)
				const datas = response.data
				if (datas.contact === null || datas.address === null) document.getElementById("welcomeHiddenButton2").click()
			} catch (e) {
				console.error(e)
			}
		}
		tempFetchData()
	},[])
	return (
		<div className="container-fluid">
			<OwnerNavbar/>
			<OwnerFloatMenu/>
		    <div className="row" style={{height:"85vh",overflow:"auto"}}>
		    	<OwnerSidebar/>
		    	<button id="welcomeHiddenButton2" className="d-none" data-bs-toggle="modal" data-bs-target="#welcomeModal2"></button>
		    	<div id="welcomeModal2" className="modal fade" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
					<div className="modal-dialog modal-dialog-centered">
						<form className="modal-content" onSubmit={handleSubmit}>
							<div className="modal-header">
								<h5>Welcome to Laundry Wise Co.</h5>
							</div>
							<div className="modal-header">
								<p>Before you begin, please setup your information first!</p>
							</div>
							<div className="modal-footer">
								<button type="button" id="hiddenButton" className="d-none" data-bs-dismiss="modal"></button>
								<button type="submit" className="btn btn-success w-25">Ok</button>
							</div>
						</form>
					</div>
				</div>
		    	<Outlet/>
		    </div>
		</div>
	)
}

export default OwnerPage;