import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

function CustomerNavbar()
{
	const [haveData,setHaveData] = useState(false)
	useEffect(()=>{
		async function fetchData() {
			try {
				const name = window.localStorage.getItem("user")
				const response = await AccessHTTP("get",`/get/notif/${btoa(name)}`)
				setHaveData((response.data.length)?true:false)
			} catch (e) {
				console.error(e)
			}
		}
		fetchData()
	},[])
	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container-fluid">
				<Link to="/dashboard/customer/home" className="d-flex align-items-center justify-content-center gap-2 text-white nav-link">
					<img src="https://cdn-icons-png.flaticon.com/512/4666/4666163.png" width="35" />
					<h5 className="m-0" style={{textShadow:"2px 2px 2px black"}}>Laundry Wise Co.</h5>
				</Link>
				<button className="navbar-toggler rounded-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarButtons">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarButtons">
					<ul className="navbar-nav ms-auto gap-2">
						<li className="nav-item">
							<Link to="/dashboard/customer/support" className="nav-link text-white d-flex gap-2" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-chat-left-text fs-5"></i><span className="d-block d-lg-none">&nbsp;Contact us</span></Link>
						</li>
						<li className="nav-item">
							<Link to="/dashboard/customer/notifs" className={"nav-link d-flex gap-2 "+((!haveData)?"text-white":"text-danger")} style={{textShadow:"2px 2px 2px black"}}>
								<i className={"bi fs-5 "+((!haveData)?"bi-bell":"bi-bell-fill")}></i>
								<span className="d-block d-lg-none">&nbsp;Notifications</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/dashboard/customer/profile" className="nav-link text-white d-flex gap-2" style={{textShadow:"2px 2px 2px black"}}><i className="bi bi-person-square fs-5"></i><span className="d-block d-lg-none">&nbsp;Profile</span></Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default CustomerNavbar