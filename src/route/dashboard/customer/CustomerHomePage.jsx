import { useEffect } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

function CustomerHomePage()
{
	useEffect(()=>{
		async function fetchData() {
			try {
				const response = await AccessHTTP("get",`/get/user/${window.localStorage.getItem("id")}`)
				document.getElementById("welcomeText").innerHTML = "Welcome " + response.data.name
			} catch (e) {
				console.error(e)
			}
		}
		fetchData()
	},[])
	return (
		<div className="col d-flex flex-column justify-content-center align-items-center text-white" style={{textShadow:"2px 2px 2px black"}}>
			<h1 id="welcomeText" className="mb-3 fst-italic" style={{transform:"scale(1.5)"}}></h1>
		</div>
	)
}

export default CustomerHomePage