import { Link } from "react-router-dom" 

function Navbar()
{
	return (
		<nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="d-flex align-items-center justify-content-center gap-2 text-white nav-link" to="/">
          <img src="https://cdn-icons-png.flaticon.com/512/4666/4666163.png" width="35" />
          <h5 className="m-0" style={{textShadow:"2px 2px 2px black"}}>Laundry Wise Co.</h5>
        </Link>
        <button className="navbar-toggler rounded-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarButtons">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarButtons">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item">
              <Link className="btn text-white" to="/" style={{textShadow:"2px 2px 2px black"}}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="btn text-white" to="/aboutus" style={{textShadow:"2px 2px 2px black"}}>About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="btn text-white" to="/faqs" style={{textShadow:"2px 2px 2px black"}}>FAQ's</Link>
            </li>
            <li className="nav-item">
              <Link className="btn text-white" to="/login" style={{textShadow:"2px 2px 2px black"}}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
	)
}

export default Navbar;