import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import AccessHTTP from "../../../access/AccessHTTP"

function AdminLoginsPage()
{
    const [users,setUsers] = useState([])
    useEffect(()=>{
        async function fetchData() {
            try {
                const e = await AccessHTTP("get","/get/users")
                setUsers(e.data)
            } catch (e) {
                alert(e)
            }
        }
        fetchData()
    },[])
	return (
		<div className="col ms-4 me-4 rounded-5 p-4" style={{backgroundColor:"rgba(255,255,255,.35)",height:"100%",overflow:"auto"}}>
			<div className="d-flex gap-2 border-bottom border-white">
				<h4 className="text-white d-flex align-items-center" style={{textShadow:"2px 2px 2px black"}}>
					<Link to="/dashboard/admin/home" className="btn fs-1 text-white p-0"><i className="bi bi-arrow-left-circle-fill m-0"></i></Link>&nbsp;Log in records</h4>
			</div>
			<div className="d-flex flex-column gap-3 pt-3">
				<table className="table table-striped-columns">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Role</th>
							<th scope="col">Log in date & time</th>
						</tr>
					</thead>
					<tbody>
                        {
                            users.map((d)=>(
                                <tr>
                                    <td>{d.name}</td>
                                    <td>{d.role}</td>
                                    <td>{d.login_dt}</td>
                                </tr>
                            ))
                        }
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default AdminLoginsPage;