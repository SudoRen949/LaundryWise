/*
	--------- No Page ---------
	Also known as 404 no page found

	when route is unknown, they will be redirected here...
*/

function NoPage()
{
	return (
		<div className="position-absolute top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center">
			<div className="p-4 rounded-4 text-white" style={{backgroundColor:"rgba(255,255,255,.35)",textShadow:"2px 2px 2px black",backdropFilter:"blur(10px)"}}>
				<h3>404 | Page not found</h3>
			</div>
		</div>
	)
}

export default NoPage;