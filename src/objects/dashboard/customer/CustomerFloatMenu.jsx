import { Link } from "react-router-dom"

function CustomerFloatMenu()
{
	const de = (e) => { return document.getElementById(e) }
	return (
		<>
			<button className="d-md-none d-block position-absolute bottom-0 mb-4 ms-2 rounded-5 bg-white shadow btn fs-3" data-bs-toggle="offcanvas" data-bs-target="#customerSidebar">
				<i className="bi bi-list"></i>
			</button>
			<div className="offcanvas offcanvas-lg offcanvas-start bg-white" tabIndex="-1" id="customerSidebar" style={{backdropFilter:"blur(10px)"}}>
				<div className="offcanvas-header">
					<h5 className="offcanvas-title">More</h5>
					<button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#customerSidebar"></button>
				</div>
				<div className="offcanvas-body">
					<div className="d-flex flex-column gap-4 justify-content-between" style={{height:"100%"}}>
						<div className="d-flex flex-column gap-4" style={{color:"rgb(0,95,115)"}}>
							<button id="hidden308" type="button" className="d-none" data-bs-dismiss="offcanvas"></button>
							<Link to="/dashboard/customer/service" className="fs-5 nav-link" onClick={()=>{de("hidden308").click()}}>
								<i className="bi bi-journal-check"></i>&nbsp;Book a service
							</Link>
							<Link to="/dashboard/customer/manage" className="fs-5 nav-link" onClick={()=>{de("hidden308").click()}}>
								<i className="bi bi-geo-alt"></i>&nbsp;Address management
							</Link>
							<Link to="/dashboard/customer/history" className="fs-5 nav-link" onClick={()=>{de("hidden308").click()}}>
								<i className="bi bi-box2"></i>&nbsp;Order history
							</Link>
							<Link to="/dashboard/customer/rate" className="fs-5 nav-link">
								<i className="bi bi-envelope-heart"></i>&nbsp;Feedback and ratings
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
							<button type="button" id="button308" className="d-none" data-bs-dismiss="modal">No</button>
							<button type="button" className="btn btn-success" data-bs-dismiss="modal">No</button>
							<Link to="/logout" className="btn btn-danger" onClick={()=>{de("button308").click()}}>Yes</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CustomerFloatMenu;