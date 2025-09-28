import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import axios from "axios"

import AccessHTTP from "../access/AccessHTTP"
import Navbar from "../objects/Navbar"
import Motto from "../objects/Motto"

function tokenGenerator()
{
	const r = (a,b) => { return Math.floor( Math.random() * (b + a - 1) - a ) }
	const nums = "0123456789"
	let token = ""
	for (let i = 0; i < 6; ++i) token += nums.charAt(r(0,nums.length-1))
	return token
}

function ForgotPage()
{
	const navigate = useNavigate()
	const [emailError,setEmailError] = useState("")
	const handleSubmit = async (e) => {
		e.preventDefault()
		const t = document.getElementById("myEmail").value
		const r = tokenGenerator()
		try {
			const r1 = await AccessHTTP("post","/search/email",{
				email: t
			})
			if (typeof r1.data.error !== "undefined") {
				setEmailError(r1.data.error)
				return
			}
			const r2 = await axios.post("https://api.emailjs.com/api/v1.0/email/send",{
				service_id: "service_c1dhrn9",
				template_id: "template_q7wvz4x",
				user_id: "sUNzZI9337EDgeLIF",
				template_params: {
					"email_to": t,
					"website": "Laundry Wise Co.",
					"website_title": "Laundry Wise Co.",
					"body": `<p>Hi Laundry Wise Co. user,<br>Here is your one time OTP for password reset: <b>${r}</b></p>`
				}
			})
			if (typeof r2.data.error !== "undefined") {
				setEmailError(r2.data.error)
				return
			}
			window.sessionStorage.setItem("vt","auth")
			window.sessionStorage.setItem("otp",r)
			window.sessionStorage.setItem("email",t)
			navigate("/verify")
		} catch (e) {
			console.error(e)
			setEmailError((window.navigator.onLine)?"Unable to process email verification. Reason: Server error":"Unable to process email verification. Reason: No internet connection.")
		}
	}
	return (
		<div className="container-fluid">
			<Navbar/>
			<div className="container mt-5">
				<div className="row row-cols-1 row-cols-lg-2">
					<div className="col d-none d-lg-block">
						<Motto/>
					</div>
					<div className="col p-2">
						<div className="shadow card rounded-5" style={{backgroundColor:"rgba(255,255,255,.35)",backdropFilter:"blur(10px)",border:0}}>
							<form className="card-body" onSubmit={handleSubmit}>
								<h3 className="card-title text-center text-white mt-3" style={{textShadow:"2px 2px 2px black"}}>Account recovery</h3>
								<p className="m-0 d-flex justify-content-center text-white" style={{textShadow:"2px 2px 2px black"}}>Forgot your password? Let's get you back in</p>
								<div className="input-group mt-5 border border-2 rounded-5 border-dark">
									<input id="myEmail" type="email" className="form-control bg-transparent text-dark fs-5 ps-3" style={{border:"none"}} placeholder="Enter email"required></input>
									<span className="input-group-text bg-transparent" style={{border:"none"}}><i className="bi bi-envelope fs-4"></i></span>
								</div>
								<p id="emailError" className={"fs-5 container text-danger text-center "+((!emailError.length)?"d-none":"d-block")}>{emailError}</p>
								<button type="submit" className="btn bg-white w-100 mt-3 rounded-5 fs-5 shadow fw-bold" style={{color:"rgb(50,100,140)"}}>Continue</button>
								<div className="d-flex align-items-center justify-content-center text-white pt-3 mb-5 fs-5" style={{textShadow:"2px 2px 2px black"}}>
									Already have an account?&nbsp;<Link to="/login" className="nav-link" style={{color:"rgb(50,100,140)",textShadow:"none"}}><b>Log in</b></Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ForgotPage;

