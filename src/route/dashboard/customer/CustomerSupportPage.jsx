import { Link } from "react-router-dom"
import { useState } from "react"

import axios from "axios"

function CustomerSupportPage()
{
	const [isLoading,setLoading] = useState(false)
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			let a = document.getElementById("myFeedback").value
			const feedbackData = (e) => {
				return {
					service_id: "service_c1dhrn9",
					template_id: "template_q7wvz4x",
					user_id: "sUNzZI9337EDgeLIF",
					template_params: {
						"email_to": e,
						"website": "Laundry Wise Co.",
						"website_title": "Laundry Wise Co.",
						"body": `
							Anonymous platform concern:<br/>
							${a}
						`
					}
				}
			}
			await axios.post("https://api.emailjs.com/api/v1.0/email/send",feedbackData("emorechakatherine15@gmail.com"))
			await axios.post("https://api.emailjs.com/api/v1.0/email/send",feedbackData("balcitamarionjane@gmail.com"))
			await axios.post("https://api.emailjs.com/api/v1.0/email/send",feedbackData("jayme.lerramae7@gmail.com"))
			setLoading(false)
			window.location.reload()
		} catch (e) {
			alert(e)
		}
	}
	return (
		<div className="col ms-4 me-4 rounded-5 p-4" style={{backgroundColor:"rgba(255,255,255,.35)",height:"100%",overflow:"auto"}}>
			<div className="d-flex gap-2 border-bottom border-white">
				<h4 className="text-white d-flex align-items-center" style={{textShadow:"2px 2px 2px black"}}>
					<Link className="btn fs-1 text-white p-0" to="/dashboard/customer/home">
						<i className="bi bi-arrow-left-circle-fill m-0"></i>
					</Link>&nbsp;Customer Support
				</h4>
			</div>
			<div className="d-flex flex-column gap-3 pt-3 text-white" style={{textShadow:"2px 2px 2px black"}}>
				<h5>Got some questions? Let us know!</h5>
				<form onSubmit={handleSubmit} className="w-100">
					<textarea className="form-control mb-2" id="myFeedback" placeholder="Write down your statements here." style={{height:"200px"}} required></textarea>
					<div className="d-flex justify-content-end align-items-center w-100">
						<button type="submit" className="btn btn-primary w-25">Submit{(isLoading)?<>&nbsp;<span className="spinner-grow spinner-grow-sm"></span></>:""}</button>
					</div>
				</form>
				<h5 className="fw-bold">
					<i>Your opinions that are sent to us are anonymous.</i>
				</h5>
			</div>
		</div>
	)
}

export default CustomerSupportPage;