import { Link } from "react-router-dom"
import { useState } from "react"

import axios from "axios"

function FeedbackRatePage()
{
	const [sliderValue,setSliderValue] = useState("")
	const [isLoading,setLoading] = useState(false)
	const handleSubmitFeedback = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			let a = document.getElementById("feedbackArea").value
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
							Anonymous has sent ${sliderValue} point/s rating.<br/><br/>
							Feedback:<br/>
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
					</Link>&nbsp;Feedback and rate
				</h4>
			</div>
			<div className="d-flex flex-column gap-3 pt-3 text-white" style={{textShadow:"2px 2px 2px black"}}>
				<form onSubmit={handleSubmitFeedback} className="w-100">
					<h4 className="text-center">Drag the slider to rate</h4>
					<input type="range" className="form-control" id="rateSlider" defaultValue="0" max="10" onInput={()=>{setSliderValue(document.getElementById("rateSlider").value)}} required />
					<p className="text-center fs-5">Rating: {sliderValue} pts</p>
					<textarea id="feedbackArea" className="form-control" placeholder="Perhaps you could write some feedback about our system" required></textarea>
					<button type="submit" className="btn btn-success mt-3">Submit feedback and rating{(isLoading)?<>&nbsp;<span className="spinner-grow spinner-grow-sm"></span></>:""}</button>
				</form>
			</div>
		</div>
	)
}

export default FeedbackRatePage;