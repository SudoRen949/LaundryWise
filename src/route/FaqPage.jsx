import Navbar from "../objects/Navbar"

function FaqPage()
{
	return (
		<div className="container-fluid">
			<Navbar/>
			<h2 className="text-center text-white mt-4 mb-3" style={{textShadow:"2px 2px 2px black"}}>Frequently asked questions</h2>
			<div className="container text-white rounded-2 p-2" style={{backgroundColor:"rgba(255,255,255,.35)",backdropFilter:"blur(10px)"}}>
				<div className="accordion" id="a0">
					<div className="accordion-item">
						<h5 className="accordion-header">
							<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#f1">
								<strong>Laundry Wise a laundry service?</strong>
							</button>
						</h5>
						<div id="f1" className="accordion-collapse collapse fade" data-bs-parent="#a0">
							<div className="accordion-body">
								No, we are not a laundry service provider, we facilitate transactions between customers and laundry business for booking and subscription management.
							</div>
						</div>
						<h5 className="accordion-header">
							<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#f2">
								<strong>How do I book a laundry pickup?</strong>
							</button>
						</h5>
						<div id="f2" className="accordion-collapse collapse fade" data-bs-parent="#a0">
							<div className="accordion-body">
								Simply create an account, select your preferred laundry provider, book a service and confirm your booking.
							</div>
						</div>
						<h5 className="accordion-header">
							<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#f3">
								<strong>What subscription plans do you offer?</strong>
							</button>
						</h5>
						<div id="f3" className="accordion-collapse collapse fade" data-bs-parent="#a0">
							<div className="accordion-body">
								We offer different plans based on automatic scheduling, such as twice a week, 3 times a week, and weekly. Two of the plans provide percentage discounts.
							</div>
						</div>
						<h5 className="accordion-header">
							<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#f4">
								<strong>How do I pay for my laundry service?</strong>
							</button>
						</h5>
						<div id="f4" className="accordion-collapse collapse fade" data-bs-parent="#a0">
							<div className="accordion-body">
								Payments are made through our platform using online payment through GCash.
							</div>
						</div>
						<h5 className="accordion-header">
							<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#f5">
								<strong>Are there any hidden fees?</strong>
							</button>
						</h5>
						<div id="f5" className="accordion-collapse collapse fade" data-bs-parent="#a0">
							<div className="accordion-body">
								No, all prices are transparent and shown upfront before confirming a booking or subscription plan.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FaqPage;