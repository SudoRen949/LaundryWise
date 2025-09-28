import Navbar from "../objects/Navbar"

function AboutPage()
{
	return (
		<div className="container-fluid">
			<Navbar/>
			<div className="container mt-3">
				<h1 className="text-center text-white mb-4" style={{textShadow:"2px 2px 2px black"}}>About us</h1>
				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 rounded-3" style={{backgroundColor:"rgba(255,255,255,.35)",backdropFilter:"blur(10px)"}}>
					<div className="col text-white p-2" style={{textShadow:"2px 2px 2px black"}}>
						<h4>Who we are</h4>
						<p>Laundry Wise Company is a trusted laundry pickup and delivery service dedicated to making laundry hassle-free. We provide convinience for customers by allowing them to schedule them to a pickups, track orders, recive updates online. </p>
					</div>
					<div className="col text-white p-2" style={{textShadow:"2px 2px 2px black"}}>
						<h4>Our mission</h4>
						<p>Our mission is to provide a seamless and convinient laundry booking system that saves time and ensures customer satisfaction. We combine technoology with professional care to offer an effortless laundry experience.</p>
					</div>
					<div className="col text-white p-2" style={{textShadow:"2px 2px 2px black"}}>
						<h4>Our vission</h4>
						<p>To be the most reliable and customer-centric laundry service, offering innovative solutions that simplify everyday life.</p>
					</div>
					<div className="col text-white p-2" style={{textShadow:"2px 2px 2px black"}}>
						<h4>Our core values</h4>
						<ul>
							<li>Reliability - We ensures timely pickup and delivery, so you never have to worry about laundry again.</li>
							<li>Quality service - Every garment receives expert care with premium cleaning techniques.</li>
							<li>Convenience - Simple online booking, easy payments, and hassle-free delivery.</li>
							<li>Customer satisfaction - Your happiness is our priority, and we strive to exceed expectations.</li>
							<li>Sustainability - We use eco-friendly detergents and energy-effecient process.</li>
						</ul>
					</div>
				</div>
				<div className="d-flex flex-column text-white p-2 mt-5" style={{textShadow:"2px 2px 2px black"}}>
					<h3>Contact us</h3>
					<p className="lead"><i className="bi bi-phone"></i>&nbsp;Phone: +63 905 143 2486</p>
					<p className="lead"><i className="bi bi-envelope"></i>&nbsp;Email: laundrywise.co@gmail.com</p>
				</div>
			</div>
    </div>
	);
}

export default AboutPage;