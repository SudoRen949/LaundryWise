import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

function CustomerProfilePage()
{
	const navigate = useNavigate()
	const [saveError,setSaveError] = useState("")
	const [saveSuccess,setSaveSuccess] = useState("")
	const [loading,setLoading] = useState(false)
	const de = (e) => { return document.getElementById(e) }
	const handleChangeProfile = (e) => {
		const imgFile = e.target.files[0]
		const maxSize = 2*Math.pow(1024,2)
		if (imgFile.size > maxSize) {
			alert("Image size exceeds 2MB limit")
			return
		}
		console.log(imgFile)
		const reader = new FileReader()
		reader.readAsDataURL(imgFile)
		reader.onload = async () => {
			try {
				await AccessHTTP("put","/update/profile/user",{
					id: window.localStorage.getItem("id"),
					profile: reader.result
				})
				setSaveError("")
				setSaveSuccess("Profile picture has been updated")
				de("myProfile").src = reader.result
			} catch (e) {
				console.error(e)
				setSaveSuccess("")
				setSaveError((window.navigator.onLine)?"Unable to load user information. Reason: Server error.":"Unable to load information. Reason: No internet connection.")
			}
		}
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			await AccessHTTP("put","/update/user",{
				id: window.localStorage.getItem("id"),
				name: de("myFullnameInput").value,
				email: de("myEmailInput").value,
				address: de("myHomeInput").value,
				contact: de("myPhoneInput").value
			})
			window.localStorage.setItem("contact",de("myPhoneInput").value)
			window.localStorage.setItem("address",de("myHomeInput").value)
			window.localStorage.setItem("user",de("myFullnameInput").value)
			setLoading(false)
			setSaveError("")
			setSaveSuccess("Changes has been saved")
		} catch (e) {
			console.error(e)
			setLoading(false)
			setSaveSuccess("")
			setSaveError((window.navigator.onLine)?"Unable to load user information. Reason: Server error.":"Unable to load information. Reason: No internet connection.")
		}
	}
	const handleAccountDelete = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			const id = window.localStorage.getItem("id")
			await AccessHTTP("delete",`/delete/user/${id}`)
			setLoading(false)
			window.localStorage.clear()
			window.sessionStorage.clear()
			navigate("/login")
		} catch (e) {
			console.error(e)
			setLoading(false)
			alert((window.navigator.onLine)?"Unable to delete account.\nReason: No internet connection":"Unable to delete account.\nReason: Server error.")
		}
	}
	useEffect(()=>{
		async function fetchData() {
			try {
				const id = window.localStorage.getItem("id")
				const response = await AccessHTTP("get",`/get/user/${id}`)
				de("myFullnameInput").value = response.data.name
				de("myName").innerText = response.data.name
				de("myEmailInput").value = response.data.email
				de("myHomeInput").value = response.data.address
				de("myPhoneInput").value = response.data.contact
				de("myProfile").src = (response.data.profile === null)?"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png":response.data.profile
				setSaveError("")
			} catch (e) {
				console.error(e)
				setSaveError((window.navigator.onLine)?"Unable to load user information. Reason: Server error.":"Unable to load information. Reason: No internet connection.")
			}
		}
		fetchData()
	},[])
	return (
		<div className="col ms-4 me-4 rounded-5 p-4" style={{backgroundColor:"rgba(255,255,255,.35)",height:"100%",overflow:"auto"}}>
			<div className="d-flex gap-2 border-bottom border-white">
				<h4 className="text-white d-flex align-items-center" style={{textShadow:"2px 2px 2px black"}}>
					<Link className="btn fs-1 text-white p-0" to="/dashboard/customer/home">
						<i className="bi bi-arrow-left-circle-fill m-0"></i>
					</Link>
					&nbsp;Profile
				</h4>
			</div>
			<form className="container-fluid p-2 d-flex flex-column" onSubmit={handleSubmit}>
				<div className="row row-cols-1 row-cols-md-2">
					<div className="col col-md-4 text-white" style={{textShadow:"2px 2px 2px black"}}>
						<div className="d-flex justify-content-center mt-4">
							<img id="myProfile" alt="pfp" className="rounded-3" width="125" style={{filter:"drop-shadow(2px 2px 5px black)"}} />
						</div>
						<div className="d-flex flex-column justify-content-center">
							<input id="myProfileInput" type="file" className="d-none" onChange={handleChangeProfile} accept="image/jpg, image/png, image/bmp"/>
							<button type="button" onClick={()=>{de("myProfileInput").click()}} className="btn bg-transparent p-0">
								<i className="bi bi-pencil-square fs-3" style={{color:"rgb(0,95,115)"}} title="Change profile picture"></i>
							</button>
						</div>
						<h5 className="text-center">
							<b id="myName">Username</b>
							<br/>
							( Customer )
						</h5>
					</div>
					<div className="col col-md-8 text-white" style={{textShadow:"2px 2px 2px black"}}>
						<label for="myFullnameInput" className="form-label text-white fs-5" style={{textShadow:"2px 2px 2px black"}}>Full name</label>
						<div className="input-group">
							<input id="myFullnameInput" className="form-control" placeholder="Your name (Last name, First name, M.I)" disabled />
							<span className="input-group-text" style={{textShadow:"none"}}><i class="bi bi-person-circle"></i></span>
						</div>
						<label for="myEmailInput" className="form-label text-white fs-5" style={{textShadow:"2px 2px 2px black"}}>Email account</label>
						<div className="input-group">
							<input id="myEmailInput" className="form-control" placeholder="example@gmail.com" disabled />
							<span className="input-group-text" style={{textShadow:"none"}}><i class="bi bi-envelope"></i></span>
						</div>
						<label for="myPhoneInput" className="form-label text-white fs-5" style={{textShadow:"2px 2px 2px black"}}>Phone number</label>
						<div className="input-group">
							<input id="myPhoneInput" type="number" className="form-control" placeholder="09XXXXXXXXX" required />
							<span className="input-group-text" style={{textShadow:"none"}}><i class="bi bi-phone"></i></span>
						</div>
						<label for="myHomeInput" className="form-label text-white fs-5" style={{textShadow:"2px 2px 2px black"}}>Home address</label>
						<div className="input-group">
							<input id="myHomeInput" className="form-control" placeholder="Your complete address" required />
							<span className="input-group-text" style={{textShadow:"none"}}><i class="bi bi-house"></i></span>
						</div>
						<p className={"mt-2 fst-italic text-success fw-bold text-center w-100 "+((!saveSuccess.length)?"d-none":"d-block")} style={{textShadow:"none"}}>{saveSuccess}</p>
						<p className={"mt-2 fst-italic text-danger fw-bold text-center w-100 "+((!saveError.length)?"d-none":"d-block")} style={{textShadow:"none"}}>{saveError}</p>
						<div className="d-flex w-100">
							<div className="d-flex justify-content-start mt-3 gap-2 w-50">
								<button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteAccount">Delete account</button>
							</div>
							<div className="d-flex justify-content-end mt-3 gap-2 w-50">
								<button type="submit" className="btn btn-primary">Save changes{(loading)?<>&nbsp;<span className="spinner-grow spinner-grow-sm"></span></>:""}</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			<div id="deleteAccount" className="modal fade" tabIndex="-1">
				<div className="modal-dialog modal-dialog-centered">
					<form className="modal-content" onSubmit={handleAccountDelete}>
						<div className="modal-header">
							<h5>Delete confirmation</h5>
						</div>
						<div className="modal-body">
							<p>
								Are you sure to delete this account?<br/><br/>
								Deleting your account might:<br/>
								<span className="ms-3">1. Lose your datas</span><br/>
								<span className="ms-3">2. Any transactions will be gone.</span><br/><br/>
								<b>Make sure your account is clean and there are no transactions pending.</b>
							</p>
						</div>
						<div className="modal-footer">
							<button type="button" data-bs-dismiss="modal" className="btn btn-dark">No</button>
							<button type="submit" className="btn btn-danger">Yes{(loading)?<>&nbsp;<span className="spinner-grow spinner-grow-sm"></span></>:""}</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CustomerProfilePage;