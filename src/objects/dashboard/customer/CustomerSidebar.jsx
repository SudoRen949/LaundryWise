import { Link } from "react-router-dom"

function CustomerSidebar()
{
	const de = (e) => { return document.getElementById(e) }
	return (
		<>
			<div className="d-none d-md-block col col-sm-3 rounded-end-5 shadow ps-4 pt-3 pb-5" style={{backgroundColor:"rgba(255,255,255,.35)",backdropFilter:"blur(10px)",height:"100%",overflow:"auto"}}>
				<div className="d-flex flex-column gap-4 justify-content-between" style={{height:"100%"}}>
					<div className="d-flex flex-column gap-4">
						<Link to="/dashboard/customer/service" className="text-white fs-5 nav-link" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-journal-check"></i>&nbsp;Book a service</Link>
						<Link to="/dashboard/customer/manage" className="text-white fs-5 nav-link" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-geo-alt"></i>&nbsp;Address management</Link>
						<Link to="/dashboard/customer/history" className="text-white fs-5 nav-link" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-box2"></i>&nbsp;Order history</Link>
						<Link to="/dashboard/customer/rate" className="text-white fs-5 nav-link" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-envelope-heart"></i>&nbsp;Feedback and ratings</Link>
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
							<button type="button" id="button3082" className="d-none" data-bs-dismiss="modal"></button>
							<button type="button" className="btn btn-success" data-bs-dismiss="modal">No</button>
							<Link to="/logout" className="btn btn-danger" onClick={()=>{de("button3082").click()}}>Yes</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CustomerSidebar