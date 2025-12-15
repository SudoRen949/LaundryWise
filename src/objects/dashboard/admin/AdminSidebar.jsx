import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

function AdminSidebar()
{
    const [pfp,setPfp] = useState(null)
	const navigate = useNavigate()
	const handleLogout = async () => {
		try {
			const response = await AccessHTTP("post","/logout/admin",{id:window.localStorage.getItem("id")})
			window.localStorage.removeItem("id")
			window.localStorage.removeItem("user")
			window.localStorage.removeItem("email")
			navigate("/")
		} catch (e) {
			console.error(e)
		}
	}
    useEffect(()=>{
        async function fd() {
            try {
                const response = await AccessHTTP("get",`/get/admin/${window.localStorage.getItem("id")}`)
                setPfp(response.data.profile)
            } catch (e) {
                console.error(e)
            }
        }
        fd()
    },[])
	return (
		<>
			<div className="d-none d-md-block col col-sm-3 rounded-end-5 shadow ps-3 pt-3 pb-5" style={{backgroundColor:"rgba(255,255,255,.35)",backdropFilter:"blur(10px)",height:"100%",overflow:"auto"}}>
		  		<div className="d-flex flex-column gap-4 justify-content-between" style={{height:"100%"}}>
		  			<div className="d-flex flex-column gap-3">
		  				<div className="d-flex flex-column justify-content-center align-items-center text-white fs-5 border-bottom border-2" style={{textShadow:"2px 2px 2px black"}}>
		  					<Link to="/dashboard/admin/settings">
		  						<img className="img-thumbnail img-fluid mb-2 rounded-3" alt="my_profile" src={(pfp)?pfp:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} width="125" />
		  					</Link>
		  					<p>Admin</p>
		  				</div>
		  				<Link to="/dashboard/admin/my" className="text-white fs-5 nav-link" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-journal"></i>&nbsp;Dashboard</Link>
		  				<Link to="/dashboard/admin/shops" className="text-white fs-5 nav-link" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-menu-up"></i>&nbsp;List of shops</Link>
						<Link to="/dashboard/admin/customers" className="text-white fs-5 nav-link" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-person"></i>&nbsp;Customers</Link>
						<Link to="/dashboard/admin/logins" className="text-white fs-5 nav-link" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-people"></i>&nbsp;Log in record</Link>
						<Link to="/dashboard/admin/settings" className="text-white fs-5 nav-link" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-gear"></i>&nbsp;Settings</Link>
		  			</div>
		  			<button type="button" className="nav-link text-danger fs-5 d-flex justify-content-start" data-bs-toggle="modal" data-bs-target="#confirmLogout" style={{textShadow:"2px 2px 2px black"}}>
		  				<i className="bi bi-box-arrow-right"></i>
		  				&nbsp;Log out
		  			</button>
		  		</div>
		  	</div>
		  	<div className="modal fade" id="confirmLogout">
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
							<button type="button" className="btn btn-success" data-bs-dismiss="modal">No</button>
							<button type="button" onClick={handleLogout} className="btn btn-danger" data-bs-dismiss="modal">Yes</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AdminSidebar;
