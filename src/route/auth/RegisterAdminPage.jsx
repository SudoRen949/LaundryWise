import { useNavigate } from "react-router-dom"
import { useState } from "react"

import AccessHTTP from "../../access/AccessHTTP"

function RegisterAdminPage()
{
	const [error,setError] = useState(null);
	const [success,setSuccess] = useState(null);
	const de = (e) => { return document.getElementById(e) }
    const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()
        let exists = false
		try {
            const response = await AccessHTTP("post","/register/admin",{
                name: de("d0").value || de("d4").value,
                email: de("d1").value || de("d5").value,
                password: de("d2").value || de("d6").value,
                password_confirmation: de("d3").value || de("d7").value,
                profile: "null"
            })
            setError(null)
            setSuccess("Account successfuly registered!")
            navigate("/login/admin")
        } catch (e) {
            console.error(e)
            setSuccess(null)
            setError((window.navigator.onLine)?"Unable to register, server error":"Unable to register account, no internet connection.")
        }
	}
	return (
		<div className="container text-white pt-5">
			<h4 className="text-center mt-5 mb-4" style={{textShadow:"2px 2px 2px black"}}>Administrator</h4>
			<div className="d-flex justify-content-center align-items-center" style={{textShadow:"2px 2px 2px black"}}>
				<form className="d-md-block d-none rounded-3 w-50 p-2 ps-3 pe-3 pb-4" style={{background:"rgba(255,255,255,.35)",backdropFilter:"blur(2px)"}} onSubmit={handleSubmit}>
					<h5 className="text-center mt-3 mb-4">Registration</h5>
					<input id="d0" type="text" className="form-control mb-2" placeholder="Name" required/>
					<input id="d1" type="email" className="form-control mb-2" placeholder="Email" required/>
					<input id="d2" type="password" className="form-control mb-2" placeholder="Password" required/>
					<input id="d3" type="password" className="form-control mb-2" placeholder="Confirm password" required/>
					<h5 className={"mt-3 mb-3 text-danger text-center "+((error!=null)?"d-block":"d-none")} style={{textShadow:"none"}}>{error}</h5>
					<h5 className={"mt-3 mb-3 text-success text-center "+((success!=null)?"d-block":"d-none")} style={{textShadow:"none"}}>{success}</h5>
					<button type="submit" className="btn btn-success w-100">Register</button>
				</form>
				<form className="d-md-none d-block rounded-3 w-100 p-2 ps-3 pe-3 pb-4" style={{background:"rgba(255,255,255,.35)",backdropFilter:"blur(2px)"}} onSubmit={handleSubmit}>
					<h5 className="text-center mt-3 mb-4">Registration</h5>
					<input id="d4" type="text" className="form-control mb-2" placeholder="Name" required/>
					<input id="d5" type="email" className="form-control mb-2" placeholder="Email" required/>
					<input id="d6" type="password" className="form-control mb-2" placeholder="Password" required/>
					<input id="d7" type="password" className="form-control mb-2" placeholder="Confirm password" required/>
					<h5 className={"mt-3 mb-3 text-danger text-center "+((error!=null)?"d-block":"d-none")} style={{textShadow:"none"}}>{error}</h5>
					<h5 className={"mt-3 mb-3 text-success text-center "+((success!=null)?"d-block":"d-none")} style={{textShadow:"none"}}>{success}</h5>
					<button type="submit" className="btn btn-success w-100">Register</button>
				</form>
			</div>
			<h5 className="text-center mt-4 fst-italic">Laundry Wise Co.</h5>
		</div>
	)
}

export default RegisterAdminPage;