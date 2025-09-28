import { Link } from "react-router-dom"
import { useState } from "react"

import AccessHTTP from "../../access/AccessHTTP"
import Navbar from "../../objects/Navbar"
import Motto from "../../objects/Motto"

function ResetPasswordPage()
{
	const [passwordType1,setPasswordType1] = useState(false)
	const [passwordType2,setPasswordType2] = useState(false)
	const [resetError,setResetError] = useState("")
	const [finished,setFinished] = useState(false)
	const de = (e) => { return document.getElementById(e) }
	const handleSubmit = async (e) => {
		e.preventDefault()
		const a0 = de("myPassword")
		const a1 = de("myConfirmPassword")
		try {
			const response = await AccessHTTP("put","/update/password",{
				email: window.sessionStorage.getItem("email"),
				password: a0.value,
				password_confirmation: a1.value,
			})
			if (response.data.errors === undefined) {
				const errors = response.data.errors
				setResetError((typeof errors === "object")?Object.values(errors):errors)
				return
			}
			setResetError("")
			setFinished(true)
			window.sessionStorage.removeItem("email")			
		} catch (e) {
			console.error(e)
			setResetError((!window.navigator.onLine)?"Unable to reset your password, please try again. Reason: Internal server error":"Unable to reset your password, please try again. Reason: No internet connection.")
		}
	}
	return (
		<div className="container-fluid">
			<Navbar></Navbar>
			<div className="container mt-5">
				<div className="row row-cols-1 row-cols-lg-2">
					<div className="col d-none d-lg-block">
						<Motto/>
					</div>
					<div className="col p-2">
						<div id="resetFormContainer" className={"shadow card rounded-5 "+((finished)?"d-none":"d-block")} style={{backgroundColor:"rgba(255,255,255,.35)",backdropFilter:"blur(10px)",border:0}}>
							<form className="card-body" onSubmit={handleSubmit}>
								<h3 className="card-title text-center text-white mt-3 mb-5" style={{textShadow:"2px 2px 2px black"}}>Reset password</h3>
								<div className="input-group mt-3 border border-2 rounded-5 border-dark">
									<input id="myPassword" type={(!passwordType1)?"password":"text"} className="form-control bg-transparent text-dark fs-5 ps-3" style={{border:"none"}} placeholder="New password" required></input>
									<button id="passwordEyeButton1" type="button" className="input-group-text bg-transparent" style={{border:"none"}} onClick={()=>{setPasswordType1(!passwordType1)}}>
										<i className={"bi fs-4 "+((!passwordType1)?"bi-eye":"bi-eye-slash")}></i>
									</button>
								</div>
								<div className="input-group mt-3 border border-2 rounded-5 border-dark">
									<input id="myConfirmPassword" type={(!passwordType2)?"password":"text"} className="form-control bg-transparent text-dark fs-5 ps-3" style={{border:"none"}} placeholder="Confirm new password" required></input>
									<button id="passwordEyeButton2" type="button" className="input-group-text bg-transparent" style={{border:"none"}} onClick={()=>{setPasswordType2(!passwordType2)}}>
										<i className={"bi fs-4 "+((!passwordType2)?"bi-eye":"bi-eye-slash")}></i>
									</button>
								</div>
								<p className={"text-danger "+((!resetError.length)?"d-none":"d-block")}>{resetError}</p>
								<button type="submit" className="btn bg-white w-100 mt-3 mb-5 rounded-5 fs-5 shadow" style={{color:"rgb(50,100,140)"}}><b>Change password</b></button>
							</form>
						</div>
						<div className={"container rounded-4 d-none pb-5 "+((finished)?"d-block":"d-none")} style={{backgroundColor:"rgba(255,255,255,.35)",textShadow:"2px 2px 3px black",backdropFilter:"blur(10px)"}}>
							<div className="text-center pt-5 pb-2" style={{color:"rgb(0,255,0)"}}><h1><i className="bi bi-check2-circle"></i></h1></div>
							<h2 className="text-white mb-3 text-center">Password has been reset</h2>
							<p className="text-white text-center ps-3 pe-3">Your account has been successfully created. You can now use your email to log in.</p>
							<Link to="/login" className="btn text-center w-100 mt-3 bg-white rounded-5 fs-5 fw-bold" style={{color:"rgb(50,100,140)",textShadow:"none"}}>Log in</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ResetPasswordPage

