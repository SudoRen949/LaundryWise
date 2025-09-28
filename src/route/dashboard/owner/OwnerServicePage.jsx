import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

function convertImgToURL(a) {
	return new Promise((resolve,reject)=>{
		if (a===null) resolve(null)
		else {
			const reader = new FileReader()
			reader.onload = () => resolve(reader.result)
			reader.onerror = () => reject(reader.error)
			reader.readAsDataURL(a)
		}
	})
}

function OwnerServicePage()
{
	const [data,setData] = useState([])
	const [priceData,setPriceData] = useState([])
	const [noService,setNoService] = useState(false)
	const [errorAddShop,setErrorAddShop] = useState("")
	const [loading,setLoading] = useState(false)
	const de = (e) => { return document.getElementById(e) }
	const handleSubmit = async (e) => {
		e.preventDefault()
		const banner = de("myShopBanner").files[0]
		const qrcode = de("myShopQR").files[0] || null
		try {
			setLoading(true)
			let bannerURL = await convertImgToURL(banner),
				qrcodeURL = await convertImgToURL(qrcode)
			await AccessHTTP("post","/add/services",{
				owner_id: window.localStorage.getItem("id"),
				owner: window.localStorage.getItem("user"),
				name: de("myServiceName").value,
				address: de("myShopAddress").value,
				banner: bannerURL,
				contact: de("myShopContact").value,
				time: de("myShopTime").value,
				prices: window.sessionStorage.getItem("prices") || "[]", //< JSON format
				qr: qrcodeURL || "NULL"
			})
			setLoading(false)
			window.sessionStorage.removeItem("prices")
			document.getElementById("hiddenButton").click()
			window.location.reload()
		} catch (e) {
			console.error(e)
			setLoading(false)
			if (!window.navigator.onLine) setErrorAddShop("Unable to add shop. Reason: No internet.")
			else setErrorAddShop("Unable to add shop. Reason: Server error.")
			setTimeout(()=>{setErrorAddShop("")},5000)
		}
	}
	const handleEditShop = async (e,d,i) => {
		e.preventDefault()
		const banner = de(`myShopBanner${i}`).files[0]
		const qrcode = de(`myShopQR${i}`).files[0] || null
		try {
			setLoading(true)
			let bannerURL = await convertImgToURL(banner),
				qrcodeURL = await convertImgToURL(qrcode)
			await AccessHTTP("put","/update/services",{
				id: parseInt(d.id),
				owner_id: window.localStorage.getItem("id"),
				owner: window.localStorage.getItem("user"),
				name: de(`myServiceName${i}`).value,
				address: de(`myShopAddress${i}`).value,
				banner: bannerURL,
				contact: de(`myShopContact${i}`).value,
				time: de(`myShopTime${i}`).value,
				prices: window.sessionStorage.getItem("prices") || "[]", //< JSON format
				qr: qrcodeURL || "NULL"
			})
			setLoading(false)
			window.sessionStorage.removeItem("prices")
			document.getElementById("hiddenButton").click()
			window.location.reload()
		} catch (e) {
			console.error(e)
			setLoading(false)
		}
	}
	const handleEditAddPrice = (e,d,i) => {
		e.preventDefault()
		var prices = []
		if (window.sessionStorage.getItem("prices") === null) {
			prices.push({
				"name": de(`priceName${i}`).value,
				"details": de(`priceDetails${i}`).value,
				"price": de(`price${i}`).value
			})
			window.sessionStorage.setItem("prices",JSON.stringify(prices))
		} else {
			prices = JSON.parse(window.sessionStorage.getItem("prices"))
			prices.push({
				"name": de(`priceName${i}`).value,
				"details": de(`priceDetails${i}`).value,
				"price": de(`price${i}`).value
			})
			window.sessionStorage.setItem("prices",JSON.stringify(prices))
		}
		de(`priceDetails${i}`).value = de(`price${i}`).value = null
		setPriceData(prices)
		de(`backEditShopButton${i}`).click()
	}
	const handleDeleteShop = async (e,d,i) => {
		e.preventDefault()
		try {
			setLoading(true)
			const id = parseInt(d.id)
			await AccessHTTP("delete",`/delete/services/${id}`)
			setLoading(false)
			de(`deleteShopButton${i}`).click()
			window.location.reload()
		} catch (e) {
			console.error(e)
			setLoading(false)
		}
	}
	const handleAddPrice = (e) => {
		e.preventDefault()
		var prices = []
		if (window.sessionStorage.getItem("prices") === null) {
			prices.push({
				"name": de("priceName").value,
				"details": de("priceDetails").value,
				"price": de("price").value
			})
			window.sessionStorage.setItem("prices",JSON.stringify(prices))
		} else {
			prices = JSON.parse(window.sessionStorage.getItem("prices"))
			prices.push({
				"name": de("priceName").value,
				"details": de("priceDetails").value,
				"price": de("price").value
			})
			window.sessionStorage.setItem("prices",JSON.stringify(prices))
		}
		de("priceName").value = de("priceDetails").value = de("price").value = null
		setPriceData(prices)
		de("backAddShopButton").click()
	}
	const handleCloseAddShop = () => {
		de("myShopPrices").innerHTML = ""
		window.sessionStorage.removeItem("prices")
	}
	useEffect(()=>{
		async function fetchData() {
			if (de("myShops") === null) return
			de("shopModals").innerHTML = "" //< reload when saved
			const id = window.localStorage.getItem("id")
			try {
				const response = await AccessHTTP("get",`/get/services/${id}`)
				setNoService(false)
				if (response.data.length === 0) {
					setNoService(true)
					return
				}
				setData(response.data)
			} catch (e) {
				console.error(e)
				console.log(`No service/s found on owner ${id}`)
			}
		}
		fetchData()
	},[])
	return (
		<div className="col ms-4 me-4 rounded-5 p-4" style={{backgroundColor:"rgba(255,255,255,.35)",height:"100%",overflow:"auto"}}>
			<div className="d-flex gap-2 border-bottom border-white">
				<h4 className="text-white d-flex align-items-center" style={{textShadow:"2px 2px 2px black"}}>
					<Link to="/dashboard/owner/home" className="btn fs-1 text-white p-0" onClick={()=>{window.sessionStorage.removeItem("prices")}}>
						<i className="bi bi-arrow-left-circle-fill m-0"></i>
					</Link>&nbsp;My services (Shop)
				</h4>
			</div>
			<div className="d-flex flex-column gap-3 pt-3">
				<div className="d-flex justify-content-end w-100 pb-2 border-bottom border-white">
					<button type="button" id="addAddress" className="btn btn-success"
						data-bs-toggle="modal" data-bs-target="#addShop" 
						onClick={()=>{
							const d = (e) => {return document.getElementById(e)}
							const a = [
								"myServiceName","myShopAddress","myShopContact",
								"myShopAddress","myShopTime","myShopBanner"
							]
							for (let i of a) d(i).value = null
						}}>
						<i className="bi bi-plus-circle"></i>&nbsp;&nbsp;Add new shop
					</button>
				</div>
				<div id="myShops" className="row row-cols-1 g-3">
					<div className={"justify-content-center w-100 text-white fs-5 "+((noService)?"d-flex":"d-none")} style={{textShadow:"2px 2px 2px black"}}>
						<span>No shops created</span>
					</div>
					{
						data.map((d,i)=>(
							<div id={"shop"+i} className="col d-flex flex-column p-3 border border-1 rounded-3 fs-5" 
							style={{color:"rgb(0,95,115)",background:"white"}}>
								<img alt="profile" src={(d.banner === null)?"":d.banner} className="img-thumbnail img-fluid mb-3"/>
								<p className="lead fw-bold fs-4">{d.name}</p>
								<p className="m-0"><i className="bi bi-geo-alt-fill"></i>&nbsp;{d.address}</p>
								<p className="m-0"><i className="bi bi-telephone-fill"></i>&nbsp;(+63) {d.contact}</p>
								<p className="m-0 fw-bold"><i className="bi bi-cash"></i>&nbsp;Prices: </p>
								{
									JSON.parse(d.prices).map(p=>(
										<p className="fst-italic m-0">
											<span className="fw-bold ms-3">- {p.name} - {p.price} Php</span>
											<br/>
											<span className="ms-3">- {p.details}</span>
										</p>
									))
								}
								<hr/>
								<div className="d-flex justify-content-end">
									<button type="button" className="btn p-0" data-bs-toggle="modal" data-bs-target={"#shopEditModal"+i}>
										<i className="bi bi-pencil-square fs-4 text-success"></i>
									</button>
									<button type="button" className="ms-3 btn p-0" data-bs-toggle="modal" data-bs-target={"#shopDeleteModal"+i}>
										<i className="bi bi-trash-fill fs-4 text-danger"></i>
									</button>
								</div>
							</div>
						))
					}
				</div>
			</div>
			<div id="myModals">
				{/* Add shop */}
				<div className="modal fade" id="addShop" tabIndex="-1">
					<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
						<form className="modal-content" onSubmit={handleSubmit}>
							<div className="modal-header">
								<h5>Add new shop</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleCloseAddShop}></button>
							</div>
							<div className="modal-body d-flex flex-column" style={{color:"rgb(0,95,115)"}}>
								<label className="form-label">Shop name</label>
								<input id="myServiceName" type="text" maxLength="191" className="form-control mb-2" placeholder="example: Aling maring laundry shop" required/>
								<label className="form-label">Shop address</label>
								<input id="myShopAddress" type="text" className="form-control mb-2" maxLength="191" placeholder="Street, City/Municipality, Province" required/>
								<label className="form-label">Shop contact number</label>
								<input id="myShopContact" type="number" className="form-control mb-2" maxLength="11" min="0" placeholder="09XXXXXXXXX" required/>
								<label className="form-label">Shop image</label>
								<input id="myShopBanner" type="file" className="form-control mb-2" required/>
								<label className="form-label">Shop operating time</label>
								<input id="myShopTime" type="text" className="form-control mb-2" placeholder="example: Mon-Sun, 8AM-7PM" required/>
								<label className="form-label">GCash QR Code (if GCash payment is available)</label>
								<input id="myShopQR" type="file" className="form-control mb-2"/>
								<div className="d-flex gap-3 align-items-center">
									<label className="form-label m-0">Prices</label>
									<button type="button" className="btn btn-success rounded-2" data-bs-toggle="modal" data-bs-target="#addPrices">
										<i className="bi bi-plus-lg"></i>
									</button>
								</div>
								<div id="myShopPrices" className="d-flex flex-column mt-2 gap-2">
									{
										priceData.map((d,i)=>(
											<div id={"p"+i} className="input-group">
												<textarea className="form-control" disabled>{d.name+"\n"+d.details+(d.details?"\n":"")+d.price}</textarea>
												<button type="button" className="btn btn-danger fs-4" onClick={
													() => {
														document.getElementById(`p${i}`).remove()
														var e = JSON.parse(window.sessionStorage.getItem("prices"))
														if (e.length === 1) window.sessionStorage.removeItem("prices")
														else {
															e.splice(i,1)
															window.sessionStorage.setItem("prices",JSON.stringify(e))
														}
													}
												}>&times;</button>
											</div>
										))
									}
								</div>
							</div>
							<div id="buttons" className="modal-footer">
								<p id="addError" className="text-danger m-0">{errorAddShop}</p>
								<button type="submit" className="btn btn-success w-25">Add{((loading)?<>&nbsp;<span className="spinner-grow spinner-grow-sm"></span></>:"")}</button>
								<button type="button" id="hiddenButton" className="d-none" data-bs-dismiss="modal"></button>
							</div>
						</form>
					</div>
				</div>
				{/* Add price */}
				<div className="modal fade" id="addPrices" tabIndex="-1">
					<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
						<form className="modal-content" onSubmit={handleAddPrice}>
							<div className="modal-header">
								<h5>Add a price</h5>
								<button type="button" className="btn-close" data-bs-toggle="modal" data-bs-target="#addShop"></button>
							</div>
							<div className="modal-body d-flex flex-column" style={{color:"rgb(0,95,115)"}}>
								<label className="form-label">Shop price name</label>
								<input id="priceName" type="text" className="form-control mb-2" required/>
								<label className="form-label">Shop price details</label>
								<textarea id="priceDetails" type="text" className="form-control mb-2" placeholder="Enter price details"/>
								<label className="form-label">Shop price</label>
								<input id="price" type="number" className="form-control mb-2" min="0" required/>
							</div>
							<div className="modal-footer">
								<button type="button" id="backAddShopButton" className="d-none" data-bs-toggle="modal" data-bs-target="#addShop"></button>
								<button type="submit" className="btn btn-success w-25">Done</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div id="shopModals">
				{
					data.map((d,i)=>(
						<>
							<div id={"shopEditModal"+i} className="modal fade" tabIndex="-1">
								<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
									<form id={"editForm"+i} className="modal-content" onSubmit={(e)=>{handleEditShop(e,d,i)}}>
										<div className="modal-header">
											<h5>Edit ({d.name})</h5>
											<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
										</div>
										<div className="modal-body" style={{color:"rgb(0,95,115)"}}>
											<label className="form-label">Shop name</label>
											<input id={"myServiceName"+i} type="text" maxlength="191" className="form-control mb-2" placeholder="example: Aling maring laundry shop" defaultValue={d.name} required/>
											<label className="form-label">Shop address</label>
											<input id={"myShopAddress"+i} type="text" className="form-control mb-2" maxlength="191" placeholder="Street, City/Municipality, Province" defaultValue={d.address} required/>
											<label className="form-label">Shop contact number</label>
											<input id={"myShopContact"+i} type="number" className="form-control mb-2" maxlength="11" min="0" placeholder="09XXXXXXXXX" defaultValue={d.contact} required/>
											<label className="form-label">Shop image</label>
											<input id={"myShopBanner"+i} type="file" className="form-control mb-2" required/>
											<label className="form-label">Shop operating time</label>
											<input id={"myShopTime"+i} type="text" className="form-control mb-2" placeholder="example: Mon-Sun, 8AM-7PM" defaultValue={d.time} required/>
											<label className="form-label">GCash QR Code (if GCash payment is available)</label>
											<input id={"myShopQR"+i} type="file" className="form-control mb-2"/>
											<div className="d-flex gap-3 align-items-center">
												<label className="form-label m-0">Prices</label>
												<button type="button" className="btn btn-success rounded-2" data-bs-toggle="modal" data-bs-target={"#addPrices"+i}>
													<i className="bi bi-plus-lg"></i>
												</button>
											</div>
											<div id={"myShopPrices"+i} className="d-flex flex-column mt-2 gap-2">
												{
													priceData.map((d,i)=>(
														<div id={"p"+i+""+i} className="input-group">
															<textarea className="form-control" disabled>{d.name+"\n"+d.details+(d.details?"\n":"")+d.price}</textarea>
															<button type="button" className="btn btn-danger fs-4" onClick={
																() => {
																	document.getElementById(`p${i}${i}`).remove()
																	var e = JSON.parse(window.sessionStorage.getItem("prices"))
																	if (e.length === 1) window.sessionStorage.removeItem("prices")
																	else {
																		e.splice(i,1)
																		window.sessionStorage.setItem("prices",JSON.stringify(e))
																	}
																}
															}>&times;</button>
														</div>
													))
												}
											</div>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-dark" data-bs-dismiss="modal">Cancel</button>
											<button type="submit" className="btn btn-success">Save{((loading)?<>&nbsp;<span className="spinner-grow spinner-grow-sm"></span></>:"")}</button>
										</div>
									</form>
								</div>
							</div>
							<div id={"addPrices"+i} className="modal fade" tabIndex="-1">
								<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
									<form className="modal-content" onSubmit={(e)=>{handleEditAddPrice(e,d,i)}}>
										<div className="modal-header">
											<h5>Add a price for ({d.name})</h5>
											<button type="button" className="btn-close" data-bs-toggle="modal" data-bs-target={"#shopEditModal"+i}></button>
										</div>
										<div className="modal-body d-flex flex-column" style={{color:"rgb(0,95,115)"}}>
											<label className="form-label">Shop price</label>
											<input id={"priceName"+i} type="text" className="form-control mb-2" required/>
											<label className="form-label">Shop price details</label>
											<textarea id={"priceDetails"+i} type="text" className="form-control mb-2" placeholder="Enter price details"/>
											<label className="form-label">Shop price</label>
											<input id={"price"+i} type="number" className="form-control mb-2" min="0" required/>
										</div>
										<div className="modal-footer">
											<button type="button" id={"backEditShopButton"+i} className="d-none" data-bs-toggle="modal" data-bs-target={"#shopEditModal"+i}></button>
											<button type="submit" className="btn btn-success w-25">Done</button>
										</div>
									</form>
								</div>
							</div>
							<div id={"shopDeleteModal"+i} className="modal fade" tabIndex="-1">
								<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
									<form id={"editForm"+{i}} className="modal-content" onSubmit={(e)=>{handleDeleteShop(e,d,i)}}>
										<div className="modal-header">
											<h5>Delete confirmation</h5>
											<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
										</div>
										<div className="modal-body">
											<h5>Are you sure to delete <b>{d.name}</b>?</h5>
										</div>
										<div className="modal-footer">
											<button type="button" id={"deleteShopButton"+i} className="d-none" data-bs-dismiss="modal"></button>
											<button type="button" className="btn btn-dark" data-bs-dismiss="modal">No</button>
											<button type="submit" className="btn btn-danger">Yes{((loading)?<>&nbsp;<span className="spinner-grow spinner-grow-sm"></span></>:"")}</button>
										</div>
									</form>
								</div>
							</div>
						</>
					))
				}
			</div>
		</div>
	)
}

export default OwnerServicePage;
