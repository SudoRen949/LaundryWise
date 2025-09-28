import { Link } from "react-router-dom"

function AdminHomePage()
{
	return (
		<div className="col d-flex flex-column justify-content-center align-items-center text-white" style={{textShadow:"2px 2px 2px black"}}>
			<h1 className="mb-3 fst-italic" style={{transform:"scale(1.5)"}}>Welcome {window.localStorage.getItem("user")}</h1>
		</div>
	)
}

export default AdminHomePage;