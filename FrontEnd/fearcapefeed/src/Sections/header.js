function Header(){
    return(<>
    <div className="container">
				<div className="navbar-header">
        <div className="collapse navbar-collapse">
					<ul className="nav navbar-nav navbar-right">
						<li><a href="/" className="smoothScroll">LOGIN</a></li>
						<li><a href="/signup" className="smoothScroll">SIGN UP</a></li>
						<li><a href="/dashboard" className="smoothScroll">DASH BOARD</a></li>
						<li><a href="/admin" className="smoothScroll">ADMIN</a></li>
					</ul>
				</div>
				</div>
				
			</div>
            </>);
}
export default Header;