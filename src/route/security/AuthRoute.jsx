
import { Navigate } from "react-router-dom"

function AuthRoute({children})
{
	const u = window.localStorage.getItem("id")
	if (u === null) return <Navigate to="/login" />
	return <>{children}</>
}

export default AuthRoute;