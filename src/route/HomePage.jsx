import Navbar from "../objects/Navbar"
import Motto from "../objects/Motto"

function HomePage()
{
	return (
		<div className="container-fluid">
			<Navbar/>
			<div className="container mt-5">
				<Motto/>
			</div>
		</div>
	);
}

export default HomePage;
