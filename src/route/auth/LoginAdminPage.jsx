import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import AccessHTTP from "../../access/AccessHTTP"

function LoginAdminPage()
{
	const navigate = useNavigate()
	const [error,setError] = useState(null)
	const de = (e) => { return document.getElementById(e) }
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await AccessHTTP("post","/login/admin",{
				email: de("d0").value || de("d2").value,
				password: de("d1").value || de("d3").value 
			})
			setError(null)
			window.localStorage.setItem("id",response.data.id)
			window.localStorage.setItem("user",response.data.name)
			window.localStorage.setItem("email",response.data.email)
			navigate("/dashboard/admin")
		} catch (e) {
			console.error(e)
			setError((window.navigator.onLine)?"Unable to login, please check email and password.":"Unable to login, no internet connection")
		}
	}
	return (
		<div className="container text-white pt-5">
			<h4 className="text-center mt-5 mb-4" style={{textShadow:"2px 2px 2px black"}}>Administrator</h4>
			<div className="d-flex justify-content-center align-items-center" style={{textShadow:"2px 2px 2px black"}}>
				<form className="d-md-block d-none rounded-3 w-50 p-2 ps-3 pe-3 pb-4" style={{background:"rgba(255,255,255,.35)",backdropFilter:"blur(2px)"}} onSubmit={handleSubmit}>
					<h5 className="text-center mt-3 mb-4">Login</h5>
					<input id="d0" type="email" className="rounded-0 form-control mb-2" placeholder="Email" required/>
					<input id="d1" type="password" className="rounded-0 form-control mb-2" placeholder="Password" required/>
					<h5 className={"mt-3 mb-3 text-danger text-center "+((error!=null)?"d-block":"d-none")} style={{textShadow:"none"}}>{error}</h5>
					<button className="btn btn-success w-100">Log in</button>
				</form>
				<form className="d-md-none d-block rounded-3 w-100 p-2 ps-3 pe-3 pb-4" style={{background:"rgba(255,255,255,.35)",backdropFilter:"blur(2px)"}} onSubmit={handleSubmit}>
					<h5 className="text-center mt-3 mb-4">Login</h5>
					<input id="d2" type="email" className="rounded-0 form-control mb-2" placeholder="Email" required/>
					<input id="d3" type="password" className="rounded-0 form-control mb-2" placeholder="Password" required/>
					<h5 className={"mt-3 mb-3 text-danger text-center "+((error!=null)?"d-block":"d-none")} style={{textShadow:"none"}}>{error}</h5>
					<button className="btn btn-success w-100">Log in</button>
				</form>
			</div>
			<h5 className="text-center mt-4 fst-italic">Laundry Wise Co.</h5>
		</div>
	)
}

export default LoginAdminPage;









