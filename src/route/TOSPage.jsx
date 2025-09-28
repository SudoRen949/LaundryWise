import { Link } from "react-router-dom"

import Navbar from "../objects/Navbar"

function TOSPage()
{
	return (
		<div>
			<Navbar></Navbar>
			<div className="container">
				<h3 className="w-100 text-center text-white mt-4" style={{textShadow:"2px 2px 2px black"}}>
					Laundry Wise Co. Terms of Service
				</h3>
				<div className="container rounded-2 mt-3 p-2 text-white" style={{background:"rgba(255,255,255,.35)",textShadow:"2px 1px 2px black"}}>
					<p className="lead">
						<b>1. Introduction</b><br/>
						<i>
							Welcome to Laundry Wise Co.! These terms of Service ("Terms") govern your use of out web application and services.<br/>
							By accessing or using our platform, you agree to be bond by these terms.<br/>
						</i><br/>
						<b>2. Definitions</b><br/>
						<i>
							- "We" or "Us" refers to Laundry Wise Co., the provider of the web application and services.<br/>
							- "You" or "User" refers to the laundry services provided through our platform.<br/>
						</i><br/>
						<b>2. Account registration</b><br/>
						<i>
							To use our services, you must create an account.<br/>
							You agree to provide an accurate and complete information during registration and to keep your account and credentials secure.<br/>
						</i><br/>
						<b>3. Service Description</b><br/>
						<i>
							Our platform connects User with laundry service providers.<br/>
							We facilitate the scheduling, payment, and management of laundry services<br/>
						</i><br/>
						<b>4. Payment Terms</b><br/>
						<i>
							- You agree to pay for all services used through our platform.<br/>
							- Payments are processed through our secure payment gateway.<br/>
							- Refunds and cancellations are subject to our refund and cancellation prolicies.<br/>
						</i><br/>
						<b>5. User responsibilities</b><br/>
						<i>
							- You agree to provide accurate information about your laundry needs.<br/>
							- You agree to follow our platform's rules and guidelines.<br/>
							- You are responsible for maintaining the confidentiality of your account credentials.<br/>
						</i><br/>
						<b>6. Liability and disclaimer</b><br/>
						<i>
							- We are not liable for any damages or losses resulting from the use of our services.<br/>
							- Our platform and services are provided "as is" and "as available" without warranties.<br/>
						</i><br/>
						<b>7. Termination</b><br/>
						<i>
							We reserve the right to terminate or suspend your account and access to our service at any time.<br/>
						</i><br/>
						<b>8. Changes to terms</b><br/>
						<i>
							We may update these terms at any time.<br/>
							Your continued use of our platform and services constitutes your acceptance of the updated terms.<br/>
						</i><br/>
						<b className="fs-3">Privacy Policy</b><br/><br/>
						<b>1. Data collection</b><br/>
						<i>
							We collect your personal data, including name, email, phone number, and laundry preferences, to provide and improve our services.<br/>
						</i><br/>
						<b>2. Data use</b><br/>
						<i>
							We use collected data to:<br/>
							- Provide and manage our services<br/>
							- Communicate with users<br/>
							- Improve our service to fulfill your needs<br/>
						</i><br/>
						<b>3. Data security</b><br/>
						<i>
							We implemented reasonable security measures to protect collected data.<br/>
						</i><br/>
						<b className="fs-3">Refunds and cancellation policy</b><br/><br/>
						<b>1. Refunds</b><br/>
						<i>
							Refunds are available for services not delivered or delivered with significant errors.<br/>
						</i><br/>
						<b>2. Cancellations</b><br/>
						<i>
							Users can cancel scheduled services at any time before the scheduled pickup time.<br/>
						</i><br/>
						<b className="fs-3">Governing law</b><br/><br/>
						<i>
							These terms are goverened by and constructed in accurance with the laws of Philippines.<br/>
						</i><br/>
						<b className="fs-3">Contact Us</b><br/><br/>
						<i>
							If you have any questions or concerns about our Terms or Services, please contact us at [laundrywise.co@gmail.com].<br/><br/>
							By using our platform and services, you acknowledge that you have read, understand, and agree to be bound by these Terms.<br/>
						</i><br/>
					</p>
				</div>
			</div>
		</div>
	)
}

export default TOSPage;