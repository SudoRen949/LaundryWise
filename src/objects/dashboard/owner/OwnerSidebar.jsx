import { Link } from "react-router-dom"

function OwnerSidebar()
{
	const de = (e) => { return document.getElementById(e) }
	return (
		<>
			<div className="d-none d-md-block col col-sm-3 rounded-end-5 shadow ps-4 pt-3 pb-5" style={{backgroundColor:"rgba(255,255,255,.35)",backdropFilter:"blur(10px)",height:"100%",overflow:"auto"}}>
				<div className="d-flex flex-column gap-4 justify-content-between" style={{height:"100%"}}>
					<div className="d-flex flex-column gap-4">
						<Link to="/dashboard/owner/manage" className="text-white fs-5 nav-link" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-card-checklist"></i>&nbsp;Manage orders</Link>
						<Link to="/dashboard/owner/reports" className="text-white fs-5 nav-link" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-menu-up"></i>&nbsp;Reports</Link>
						<Link to="/dashboard/owner/services" className="text-white fs-5 nav-link" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-star"></i>&nbsp;Your services</Link>
					</div>
					<button type="button" className="nav-link text-danger fs-5 d-flex justify-content-start" data-bs-toggle="modal" data-bs-target="#confirmLogout0" style={{textShadow:"2px 2px 2px black"}}>
						<i className="bi bi-box-arrow-right"></i>
						&nbsp;Log out
					</button>
				</div>
			</div>
			<div className="modal fade" id="confirmLogout0">
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
							<button type="button" id="button308" className="d-none" data-bs-dismiss="modal"></button>
							<button type="button" className="btn btn-success" data-bs-dismiss="modal">No</button>
							<Link to="/logout" className="btn btn-danger" onClick={()=>{de("button308").click()}}>Yes</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default OwnerSidebar;