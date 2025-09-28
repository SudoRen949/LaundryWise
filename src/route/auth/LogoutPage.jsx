import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import AccessHTTP from "../../access/AccessHTTP"

function LogoutPage()
{
	const navigate = useNavigate()
	useEffect(()=>{
		async function fetchData() {
			try {
				await AccessHTTP("post","/logout",{
					id: window.localStorage.getItem("id")
				})
				const e = [ "id", "user", "email", "contact", "address" ]
				for (let i of e) window.localStorage.removeItem(i)
				navigate("/")
			} catch (e) {
				alert(e)
			}
		}
		fetchData()
	},[navigate])
	return (
		<div className="position-absolute d-flex align-items-center w-100 h-100 top-0 left-0">
			<h2 className="text-center w-100 text-white" style={{textShadow:"2px 2px 2px black"}}>
                Logging out...
            </h2>
		</div>
	)
}

export default LogoutPage