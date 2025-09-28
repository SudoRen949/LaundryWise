import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

function CustomerServicePage()
{
	const [data,setData] = useState([])
	const [loaded,setLoaded] = useState(true)
	const [address,setAddress] = useState([])
	const [isCash,setCash] = useState(false)
	const [bookingSubtotal,setBookingSubtotal] = useState(0)
	const [bookingFee,setBookingFee] = useState(0)
	const [bookingTotal,setBookingTotal] = useState(0)
	const [refCode,setRefCode] = useState("")
	const [thisDate,setThisDate] = useState("")
	const [myName,setMyName] = useState("")
	const randRange = (a,b) => { return Math.floor( Math.random() * (b - a + 1) + a ) }
	const de = (e) => { return document.getElementById(e) }
	const referenceGen = () => {
		let c = "0123456789", t = ""
		for (let i = 0; i < 12; ++i) t += c[randRange(0,c.length-1)]
		return t
	}
	const handleBookSubmitClear = (d,i) => {
		const inputList = [`sbPhone${i}`, `sbPickDate${i}`, `sbPickTime${i}`]
		for (let i of inputList) de(i).value = null
	}
	const handleBookSubmit = (e,d,i) => {
		e.preventDefault()
		const bookFee = 10
		de(`bookHiddenButton${i}`).click()
		de(`sb2Fullname${i}`).value = de(`sbFullname${i}`).value
		de(`sb2Email${i}`).value = window.localStorage.getItem("email")
		de(`sb2Contact${i}`).value = window.localStorage.getItem("contact")
		de(`sb2Address${i}`).value = de(`sbAddress${i}`).value
		de(`sb2PickDate${i}`).value = de(`sbPickDate${i}`).value
		de(`sb2PickTime${i}`).value = `${de(`sbPickTime${i}`).value} ${(parseInt(de(`sbPickTime${i}`).value.substr(0,3))>12)?"PM":"AM"}`
		de(`sb2Service${i}`).value = de(`sbcv1${i}`).value
		de(`sb2ServiceDesciption${i}`).value = de(`sbcv2${i}`).value
		de(`sb2SubtotalPrice${i}`).innerText = `${de(`sbcv3${i}`).value} Php`
		de(`sb2BookingFee${i}`).innerText = `${bookFee} Php`
		de(`sb2Total${i}`).innerText = `${(parseInt(de(`sbcv3${i}`).value)+bookFee)} Php`
		setBookingSubtotal(parseInt(de(`sbcv3${i}`).value))
		setBookingTotal(parseInt(de(`sbcv3${i}`).value)+bookFee)
		setBookingFee(bookFee)
	}
	const handlePlaceOrder = async (e,d,i) => {
		e.preventDefault()
		const date = new Date()
		const thisWeek = parseInt(date.getDate()+6) + parseInt(date.getMonth()) + parseInt(date.getFullYear())
		const thisMonth = parseInt(date.getMonth()) + parseInt(date.getFullYear())
		try {
			const purchaseCode = referenceGen()
			await AccessHTTP("post","/add/order",{
				customer: de(`sb2Fullname${i}`).value,
				customer_id: window.localStorage.getItem("id"),
				contact: de(`sb2Contact${i}`).value,
				address: de(`sb2Address${i}`).value,
				service: de(`sb2Service${i}`).value,
				service_owner: d.owner,
				service_owner_id: d.owner_id,
				shop_name: d.name,
				payment_type: (isCash)?"Cash":"GCash",
				pickup_date: de(`sb2PickDate${i}`).value,
				pickup_time: de(`sb2PickTime${i}`).value,
				total_payment: bookingTotal,
				reference_code: purchaseCode,
				date_ordered: thisDate
			})
			await AccessHTTP("post","/add/notif",{
				date: `${thisDate} - Order`,
				from: btoa(window.localStorage.getItem("user")),
				to: btoa(d.owner),
				details: `${de(`sb2Fullname${i}`).value} has placed an order to your shop (${d.name}). Go to Manage orders to see more.`
			})
			await AccessHTTP("post","/add/report",{ //< send report to owner
				owner_id: d.owner_id,
				owner: btoa(d.owner),
				value: bookingTotal,
				week: thisWeek.toString(),
				month: thisMonth.toString()
			})
			setRefCode(purchaseCode)
			de(`hiddenButton308${i}`).click()
		} catch (e) {
			console.error(e)
		}
	}
	useEffect(()=>{
		async function fetchData() {
			setMyName(window.localStorage.getItem("user"))
			try {
				const date = new Date()
				const date_new = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} ${(date.getHours()>12)?"PM":"AM"}`
				const id = window.localStorage.getItem("id")
				const r1 = await AccessHTTP("get","/get/services")
				const r2 = await AccessHTTP("get",`/get/address/${id}`)
				if (r1.data.length === 0) {
					setLoaded(false)
					return
				}
				setLoaded(true)
				setData(r1.data)
				setAddress(r2.data)
				setThisDate(date_new)
			} catch (e) {
				console.error(e)
				setLoaded(false)
			}
		}
		fetchData()
	},[])
	return (
		<div className="col ms-4 me-4 rounded-5 p-4" style={{backgroundColor:"rgba(255,255,255,.35)",height:"100%",overflow:"auto"}}>
			<div className="d-flex gap-2 border-bottom border-white">
				<h4 className="text-white d-flex align-items-center" style={{textShadow:"2px 2px 2px black"}}>
					<Link className="btn fs-1 text-white p-0" to="/dashboard/customer/home">
						<i className="bi bi-arrow-left-circle-fill m-0"></i>
					</Link>&nbsp;Laundry shop
				</h4>
			</div>
			<div className="row row-cols-1 row-cols-md-2 pt-3 g-3 text-white" id="myServices">
				<div id="loading" className={"w-100 flex-column justify-content-center align-items-center "+((!loaded)?"d-flex":"d-none")} style={{height:"calc(60vh - 50px)"}}>
					<h3 style={{textShadow:"2px 2px 2px black",color:"rgb(0,95,115)"}} className="text-center">
						<i class="bi bi-cart-x-fill fs-1"></i><br/>No shops available
					</h3>
				</div>
				{
					data.map((d,i)=>(
						<div className="col">
							<div className="card shadow" style={{color:"rgb(0,95,115)"}}>
								<img alt={"banner"+i} src={d.banner}/>
								<div className="card-body">
									<h4 className="card-title fw-bold mb-3">{d.name}</h4>
									<p className="card-text m-0">
										<i className="bi bi-geo-alt-fill"></i>
										&nbsp;{d.address}
									</p>
									<p className="card-text m-0">
										<i className="bi bi-person"></i>
										&nbsp;{d.owner} (Owner)
									</p>
									<div className="d-flex justify-content-end gap-2">
										<button type="button" className="btn btn-primary rounded-2" data-bs-toggle="modal" data-bs-target={"#shopDetail"+i}>View details</button>
									</div>
								</div>
							</div>
						</div>
					))
				}
			</div>
			<div id="myModals">
				{
					data.map((d,i)=>(
						<>
							<div id={"shopDetail"+i} className="modal fade" tabIndex="-1">
								<div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
									<div className="modal-content" style={{color:"rgb(0,95,115)"}}>
										<div className="modal-header">
											<h5>Shop details</h5>
											<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
										</div>
										<div className="modal-body">
											<img alt={"banner"+i} src={d.banner} className="w-100 rounded-2 mb-3"/>
											<h4 className="fw-bold mb-3">{d.name}</h4>
											<p className="mb-2">
												<i className="bi bi-geo-alt-fill"></i>
												&nbsp;{d.address}
											</p>
											<p className="mb-2">
												<i className="bi bi-phone"></i>
												&nbsp;(+63) {d.contact}
											</p>
											<p className="mb-2">
												<i className="bi bi-calendar"></i>
												&nbsp;Opens: {d.time}
											</p>
											<p className="card-text m-0">
												<i className="bi bi-person"></i>
												&nbsp;Owner: {d.owner}
											</p>
											<hr/>
											<h5 className="fw-bold">Services and prices</h5>
											{
												JSON.parse(d.prices).map((j,k)=>(
													<p className="mb-2">
														<span className="fw-bold ms-3">- {j.name} - {j.price} Php</span>
														<br/>
														<span className="ms-3">- {j.details}</span>
													</p>
												))
											}
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#bookShop"+i}>Book Now</button>
										</div>
									</div>
								</div>
							</div>
							<div id={"bookShop"+i} className="modal fade" tabIndex="-1">
								<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
									<form className="modal-content" style={{color:"rgb(0,95,115)"}} onSubmit={(e)=>{handleBookSubmit(e,d,i)}}>
										<div className="modal-header">
											<h5>Book <span className="fw-bold">{d.name}</span></h5>
											<button type="button" className="btn-close" data-bs-dismiss="modal" onClick={()=>{handleBookSubmitClear(d,i)}}></button>
										</div>
										<div className="modal-body d-flex flex-column gap-2">
											<p className="text-center">Our customer service representative will contact you within 1 hour from the time of your submission for order confirmation.</p>
											<div className="row" style={{color:"rgb(0,95,115)"}}>
												<div className="col-2">
													<p>Fullname</p>
													<p>Phone No.</p>
													<p>Address</p>
													<p>Pickup date</p>
													<p>Pickup time</p>
												</div>
												<div className="col">
													<input type="text" id={"sbFullname"+i} className="form-control mb-2" placeholder="Enter your full name" defaultValue={myName} disabled/>
													<input type="number" id={"sbPhone"+i} className="form-control mb-3" placeholder="09XXXXXXXXX" min="0" required/>
													<select id={"sbAddress"+i} className="form-select mb-3" required>
														<option value="" selected disabled>-- SELECT ADDRESS --</option>
														{address.map(a=>(<option>{a.address}</option>))}
													</select>
													<input type="date" id={"sbPickDate"+i} className="form-control mb-4" required/>
													<input type="time" id={"sbPickTime"+i} className="form-control" required/>
												</div>
											</div>
											<div className="row">
												<div className="col-2">Services</div>
												<div className="col">
													<input type="text" id={"sbcv1"+i} className="d-none" required/>
													<input type="text" id={"sbcv2"+i} className="d-none" required/>
													<input type="text" id={"sbcv3"+i} className="d-none" required/>
													{
														JSON.parse(d.prices).map((j,k)=>(
															<div className="d-flex align-items-start gap-2">
																<input type="text" id={"sbRadio2"+i+""+k} className="d-none" defaultValue={j.details} />
																<input type="text" id={"sbRadio3"+i+""+k} className="d-none" defaultValue={j.price} />
																<input type="checkbox" id={"sbRadio1"+i+""+k} className="form-checkbox mt-2" defaultValue={j.name} onChange={
																	()=>{
																		const e = de(`sbcv1${i}`)
																		const v = de(`sbcv2${i}`)
																		const b = de(`sbcv3${i}`)
																		e.value = (e.value.length)?"":de(`sbRadio1${i}${k}`).value
																		v.value = (v.value.length)?"":de(`sbRadio2${i}${k}`).value
																		b.value = (b.value.length)?"":de(`sbRadio3${i}${k}`).value
																	}
																}/>
																<label for={"sbRadio"+i+""+k}>
																	<span className="fw-bold">{j.name} - {j.price} Php</span>
																	<br/>
																	{j.details}
																</label>
															</div>
														))
													}
												</div>
											</div>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-primary w-25" onClick={()=>{handleBookSubmitClear(d,i)}}>Clear</button>
											<button type="submit" className="btn btn-primary w-25">Next</button>
											<button type="button" id={"bookHiddenButton"+i} className="d-none" data-bs-toggle="modal" data-bs-target={"#bookShop2"+i}></button>
										</div>
									</form>
								</div>
							</div>
							<div id={"bookShop2"+i} className="modal fade" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
								<div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
									<div className="modal-content" style={{color:"rgb(0,95,115)"}}>
										<div className="modal-header">
											<h5>Payment setup</h5>
											<button type="button" className="btn-close" data-bs-toggle="modal" data-bs-target={"#bookShop"+i}></button>
										</div>
										<div className="modal-body row row-cols-2 g-3">
											<div className="col">
												<div className="border rounded-3 p-2">
													<p className="fw-bold">Customer details</p>
													<input type="text" id={"sb2Fullname"+i} className="form-control mb-2" disabled/>
													<input type="text" id={"sb2Email"+i} className="form-control mb-2" disabled/>
													<input type="text" id={"sb2Contact"+i} className="form-control mb-2" disabled/>
													<input type="text" id={"sb2Address"+i} className="form-control" disabled/>
												</div>
											</div>
											<div className="col">
												<div className="border rounded-3 p-2">
													<p className="fw-bold">Customer details</p>
													<input type="text" id={"sb2PickDate"+i} className="form-control mb-2" disabled/>
													<input type="text" id={"sb2PickTime"+i} className="form-control mb-2" disabled/>
													<input type="text" id={"sb2Service"+i} className="form-control mb-2" disabled/>
													<input type="text" id={"sb2ServiceDesciption"+i} className="form-control" disabled/>
												</div>
											</div>
											<div className="col">
												<div className="border rounded-3 p-2">
													<p className="fw-bold">Payment summary</p>
													<div className="w-100 d-flex">
														<p className="m-0">Subtotal:</p>
														<p id={"sb2SubtotalPrice"+i} className="text-end w-100 m-0"></p>
													</div>
													<div className="w-100 d-flex m-0">
														<p className="m-0 w-25">Booking fee:</p>
														<p id={"sb2BookingFee"+i} className="text-end w-75 m-0"></p>
													</div>
													<div className="w-100 d-flex m-0">
														<p className="m-0">Total:</p>
														<p id={"sb2Total"+i} className="text-end w-100 m-0"></p>
													</div>
												</div>
											</div>
											<div className="col">
												<div className="border rounded-3 p-2">
													<p className="fw-bold">Choose a payment method</p>
													<div className="d-flex gap-2">
														<button type="button" className="btn btn-primary" onClick={()=>{setCash(true)}} data-bs-toggle="modal" data-bs-target={"#bookShop3"+i}>Pay with Cash</button>
														<button type="button" className={"btn btn-primary "+((d.qr!=="NULL")?"d-block":"d-none")} onClick={()=>{setCash(false)}} data-bs-toggle="modal" data-bs-target={"#bookShop3"+i}>Pay with GCash</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id={"bookShop3"+i} className="modal fade" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
								<div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
									<form className="modal-content" style={{color:"rgb(0,95,115)"}} onSubmit={(e)=>{handlePlaceOrder(e,d,i)}}>
										<div className="modal-header">
											<h5>Payment confirmation</h5>
											<button type="button" className="btn-close" data-bs-toggle="modal" data-bs-target={"#bookShop2"+i}></button>
										</div>
										<div className="modal-body">
											<p className="fw-bold">Booking total</p>
											<hr/>
											<div className="w-100 d-flex">
												<p className="m-0">Subtotal:</p>
												<p className="text-end w-100 m-0">{bookingSubtotal} Php</p>
											</div>
											<div className="w-100 d-flex">
												<p className="m-0 w-25">Booking fee:</p>
												<p className="text-end w-75 m-0">{bookingFee} Php</p>
											</div>
											<div className="w-100 d-flex mb-3">
												<p className="m-0">Total:</p>
												<p className="text-end w-100 m-0">{bookingTotal} Php</p>
											</div>
											<p className="fw-bold">Payment method: {(isCash)?"Cash":"GCash"}</p>
											<div className={(!isCash)?"d-block":"d-none"}>
												<hr/>
												<p>Please scan this QR code to pay using GCash</p>
												<div className="d-flex gap-2">
													<img alt="gcashqr" className="img-thumbnail w-25" src={d.qr}/>
													<div>
														<p>Send your receipt here.</p>
														<input type={(isCash)?"text":"file"} className="form-control" accept="image/*" defaultValue={(isCash)?"0":""} required/>
													</div>
												</div>
											</div>
											<button type="button" id={"hiddenButton308"+i} className="d-none" data-bs-toggle="modal" data-bs-target={"#bookConfirm"+i}></button>
											<button type="submit" className="btn btn-primary w-100 mt-3">Place order</button>
										</div>
									</form>
								</div>
							</div>
							<div id={"bookConfirm"+i} className="modal fade" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
								<div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
									<div className="modal-content" style={{color:"rgb(0,95,115)"}}>
										<div className="modal-header">
											<h5>Payment confirmation</h5>
											<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
										</div>
										<div className="modal-body">
											<p className="fw-bold text-center">Payment successful!</p>
											<div className="ms-3 me-3">
												<div className="w-100 d-flex mb-3">
													<p className="m-0 w-25">Reference No.:</p>
													<p className="text-end w-75 m-0">{refCode}</p>
												</div>
												<div className="w-100 d-flex mb-3">
													<p className="m-0 w-25">Date and Time:</p>
													<p className="text-end w-75 m-0">{thisDate}</p>
												</div>
												<div className="w-100 d-flex mb-3 fw-bold">
													<p className="m-0 w-25">Amount {(isCash)?"to be":""} paid:</p>
													<p className="text-end w-75 m-0">{bookingTotal} Php</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					))
				}
			</div>
		</div>
	)
}

export default CustomerServicePage
