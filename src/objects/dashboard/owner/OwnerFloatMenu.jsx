import { Link } from "react-router-dom"

function OwnerFloatMenu()
{
	const de = (e) => { return document.getElementById(e) }
	return (
		<>
			<button className="d-md-none d-block position-absolute bottom-0 mb-4 ms-2 rounded-5 bg-white shadow btn fs-3" data-bs-toggle="offcanvas" data-bs-target="#customerSidebar">
				<i className="bi bi-list"></i>
			</button>
			<div className="offcanvas offcanvas-lg offcanvas-start bg-white" tabindex="-1" id="customerSidebar" style={{backdropFilter:"blur(10px)"}}>
				<div className="offcanvas-header">
					<h5 className="offcanvas-title">More</h5>
					<button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#customerSidebar"></button>
				</div>
				<div className="offcanvas-body">
					<div className="d-flex flex-column gap-4 justify-content-between" style={{height:"100%"}}>
						<div className="d-flex flex-column gap-4" style={{color:"rgb(0,95,115)"}}>
							<button id="hidden308" type="button" className="d-none" data-bs-dismiss="offcanvas"></button>
							<Link to="/dashboard/owner/manage" className="fs-5 nav-link" onClick={()=>{de("hidden308").click()}}>
								<i className="bi bi-card-checklist"></i>
								&nbsp;Manage orders
							</Link>
							<Link to="/dashboard/owner/reports" className="fs-5 nav-link" onClick={()=>{de("hidden308").click()}}>
								<i className="bi bi-menu-up"></i>
								&nbsp;Reports
							</Link>
							<Link to="/dashboard/owner/services" className="fs-5 nav-link" onClick={()=>{de("hidden308").click()}}>
								<i className="bi bi-star"></i>
								&nbsp;Your services
							</Link>
						</div>
						<button type="button" className="nav-link text-danger fs-5 d-flex justify-content-start" data-bs-toggle="modal" data-bs-target="#confirmLogout1">
							<i className="bi bi-box-arrow-right"></i>
							&nbsp;Log out
						</button>
					</div>
				</div>
			</div>
			<div className="modal fade" id="confirmLogout1">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Laundry Wise Co. says</h5>
							<button className="btn-close" data-bs-dismiss="modal"></button>
						</div>
						<div className="modal-body">
							<h5>Are you sure you to log out?</h5>
						</div>
						<div className="modal-footer">
							<button id="hidden3082" type="button" className="d-none" data-bs-dismiss="modal"></button>
							<button type="button" className="btn btn-success" data-bs-dismiss="modal">No</button>
							<Link to="/logout" className="btn btn-danger" onClick={()=>{de("hidden3082").click()}}>Yes</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default OwnerFloatMenu;