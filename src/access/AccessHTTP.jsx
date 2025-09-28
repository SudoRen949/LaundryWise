import axios from "axios"

async function AccessHTTP(action,route,data=null)
{
	let actionResult = null
	let host = "http://localhost:8000"
	switch (action) {
		case "get":
			actionResult = await axios.get(`${host}/api${route}`)
			break;
		case "post":
			actionResult = await axios.post(`${host}/api${route}`,data)
			break;
		case "put":
			actionResult = await axios.put(`${host}/api${route}`,data)
			break;
		case "delete":
			actionResult = await axios.delete(`${host}/api${route}`)
			break;
	}
	return actionResult
}

export default AccessHTTP

