import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

function AdminSettingsPage()
{
    const [pfpSuccess,setPfpSuccess] = useState(null)
    const [pfp,setPfp] = useState(null)
    const [saved,setSaved] = useState(null)
	const handleChangeProfile = () => {
        const e = document.createElement("input")
        e.type = "file"
        e.accept = "image/*"
        e.onchange = (f) => {
            if (f.target.files[0].size > 2*Math.pow(1024,2)) {
                alert("The file could not be larger than 2MB!");
                return
            }
            const a = new FileReader();
            a.readAsDataURL(f.target.files[0]);
            a.onload = async () => {
                try {
                    await AccessHTTP("put","/update/profile/admin",{
                        id: window.localStorage.getItem("id"),
                        profile: a.result || "null"
                    })
                    setPfpSuccess("Profile picture has been updated.")
                    const t0 = setTimeout(()=>{
                        setPfpSuccess(null)
                        clearTimeout(t0)
                    },3000)
                    setPfp(a.result)
                    window.location.reload()
                } catch (e) {
                    console.error(e)
                    setPfpSuccess(null)
                }
            }
        }
        e.click()
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
        try {
            const response = await AccessHTTP("put","/update/password/admin",{
                email: window.localStorage.getItem("email"),
                password: document.getElementById("myNewPassword").value,
                password_confirmation: document.getElementById("myNewPassword").value
            })
            setSaved("Changes saved.")
            const t0 = setTimeout(()=>{
                setSaved(null)
                clearTimeout(t0)
            },3000)
        } catch (e) {
            console.error(e)
            setSaved(null)
        }
	}
    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await AccessHTTP("get",`/get/admin/${window.localStorage.getItem("id")}`)
                setPfp(response.data.profile)
            } catch (e) {
                console.error(e)
            }
        }
        fetchData()
    },[])
	return (
		<div className="col ms-4 me-4 rounded-5 p-4" style={{backgroundColor:"rgba(255,255,255,.35)",height:"100%",overflow:"auto"}}>
			<div className="d-flex gap-2 border-bottom border-white">
				<h4 className="text-white d-flex align-items-center" style={{textShadow:"2px 2px 2px black"}}>
					<Link to="/dashboard/admin/home" className="btn fs-1 text-white p-0"><i className="bi bi-arrow-left-circle-fill m-0"></i></Link>&nbsp;Settings</h4>
			</div>
			<form className="d-flex flex-column gap-3 pt-3 text-white" style={{textShadow:"2px 2px 2px black"}} onSubmit={handleSubmit}>
				<div className="d-flex flex-column justify-content-center align-items-center mt-3">
					<button type="button" onClick={handleChangeProfile} className="nav-link">
  					    <img className="img-thumbnail img-fluid mb-2 rounded-3" alt="my_profile" src={(pfp)?pfp:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} width="125" />
  				    </button>
                    <p className={"fst-italic fs-5 text-center text-success "+((pfpSuccess!=null)?"d-block":"d-none")} style={{textShadow:"none"}}>{pfpSuccess}</p>
				</div>
				<div className="d-flex flex-column ps-md-5 pe-md-5 gap-3">
                    <h4>Profile information</h4>
                    <input type="text" id="myName" placeholder="Enter name" maxlength="191" className="rounded-0 form-control" value={window.localStorage.getItem("user")} required/>
                    <input type="email" id="myEmail" placeholder="Enter email" maxlength="191" className="rounded-0 form-control" value={window.localStorage.getItem("email")} required/>
                    <h4>Change password</h4>
                    <div className="row row-cols-1 row-cols-md-2 g-3">
                        <div className="col">
                            <input type="password" id="myOldPassword" placeholder="Enter old password" minlength="8" className="rounded-0 form-control" required/>
                        </div>
                        <div className="col">
                            <input type="password" id="myNewPassword" placeholder="Enter new password" minlength="8" className="rounded-0 form-control" required/>	
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <h5 className="text-success fw-bold fst-italic" style={{textShadow:"none"}}>{saved}</h5>
                        <button type="submit" className="btn btn-success w-25">Save</button>
                    </div>
                </div>
			</form>
		</div>
	)
}

export default AdminSettingsPage;