import { Navigate } from "react-router-dom"

function RecoverVerifyRoute({children})
{
	const fromRecover = sessionStorage.getItem("vt")
	if (fromRecover !== "auth") return <Navigate to="/recover" replace/>;
	window.sessionStorage.removeItem("vt")
	return <>{children}</>;
}

export default RecoverVerifyRoute;