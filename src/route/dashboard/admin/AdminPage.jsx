import { Link, Outlet } from "react-router-dom"

import AdminSidebar from "../../../objects/dashboard/admin/AdminSidebar"
import AdminFloatMenu from "../../../objects/dashboard/admin/AdminFloatMenu"

function AdminPage()
{
	return (
		<div className="container-fluid">
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">
					<Link to="/dashboard/admin/home" className="d-flex align-items-center justify-content-center gap-2 text-white nav-link">
						<img src="https://cdn-icons-png.flaticon.com/512/4666/4666163.png" width="35" />
						<h5 className="m-0" style={{textShadow:"2px 2px 2px black"}}>Laundry Wise Co.</h5>
					</Link>
				</div>
			</nav>
			<AdminFloatMenu></AdminFloatMenu>
			<div className="row" style={{height:"85vh",overflow:"auto"}}>
				<AdminSidebar></AdminSidebar>
				<Outlet/>
			</div>
		</div>
	)
}

export default AdminPage;