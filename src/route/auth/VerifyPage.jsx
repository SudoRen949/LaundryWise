import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import axios from "axios"

import Navbar from "../../objects/Navbar"
import Motto from "../../objects/Motto"

function tokenGenerator()
{
	const r = (a,b) => { return Math.floor( Math.random() * (b + a - 1) - a ) }
	const nums = "0123456789"
	let token = ""
	for (let i = 0; i < 6; ++i) token += nums.charAt(r(0,nums.length-1))
	return token
}

function VerifyPage()
{
	const navigate = useNavigate()
	const [timer,setTimer] = useState(null)
	const [countdown,setCountdown] = useState([])
	const handleSubmit = (e) => {
		e.preventDefault()
		clearInterval(timer)
		const t = document.getElementById("myCode").value
		if (t === window.sessionStorage.getItem("otp")) {
			window.sessionStorage.setItem("vt","auth")
			window.sessionStorage.removeItem("otp")
			navigate("/reset")
		}
  	}
	const handleResend = async () => {
		const r = tokenGenerator()
		try {
			const email = window.sessionStorage.getItem("email")
			await axios.post("https://api.emailjs.com/api/v1.0/email/send",{
				service_id: "service_c1dhrn9",
				template_id: "template_q7wvz4x",
				user_id: "sUNzZI9337EDgeLIF",
				template_params: {
					"email_to": email,
					"website": "Laundry Wise Co.",
					"website_title": "Laundry Wise Co.",
					"body": `<p>Hello ${email},<br>Here is your one time OTP for password reset: <b>${r}</b></p>`
				}
			})
			window.sessionStorage.setItem("vt","auth")
			window.sessionStorage.setItem("otp",r)
			clearInterval(timer)
			navigate("/verify")
		} catch (e) {
			console.error(e)
		}
	}
	useEffect(()=>{
		let tt = 30, mt = 1
		const e = setInterval(() => {
			setCountdown([String(mt).padStart(2,'0'),String(tt).padStart(2,'0')])
			if (tt > 0) tt--
			if (mt <= 0 && tt <= 0) {
				clearInterval(e)
				setTimeout(()=>{
					window.sessionStorage.clear()
					navigate("/recover")
				},3000)
			} else if (tt === 0) { mt--; tt = 60 }
		},1000)
		setTimer(e)
	},[navigate])
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
								<h3 className="card-title text-center text-white mt-3" style={{textShadow:"2px 2px 2px black"}}>Verify account recovery</h3>
								<p className="m-0 mt-5 d-flex justify-content-center text-white" style={{textShadow:"2px 2px 2px black"}}><b>Enter the 6 digit code sent to your email.</b></p>
								<div className="input-group mt-3 border border-2 rounded-5 border-dark">
									<input id="myCode" type="number" min="0" className="form-control bg-transparent text-dark fs-5 ps-3" style={{border:"none"}} placeholder="Enter 6 digit code"required></input>
								</div>
								<p id="myCountdown" className="m-0 mt-3 text-center fs-4 fw-bold" style={{color:"rgb(50,100,140",textShadow:"2px 2px 2px black"}}>{countdown[0]}:{countdown[1]}</p>
								<div className="d-flex mt-3 align-items-center justify-content-center gap-2" style={{textShadow:"2px 2px 2px black"}}>
									<p className="m-0 text-white">Didn't get the code?</p>
									<button type="button" id="resendButton" onClick={handleResend} className="nav-link text-underline fw-bold" style={{color:"rgb(50,100,140)"}}>Resend code</button>
								</div>
								<button className="btn bg-white w-100 mt-3 rounded-5 fs-5 shadow" style={{color:"rgb(50,100,140)"}}><b>Continue</b></button>
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

export default VerifyPage;