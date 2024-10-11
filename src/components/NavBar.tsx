import { faLink, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<header className="bg-white text-white flex justify-between items-center p-5 mb-10">
			<div className="flex gap-5">
				<a href="/">
					<FontAwesomeIcon icon={faLink} size="2x" color="#6366F1" />
				</a>
			</div>
			<nav className="flex gap-3">
				<NavLink
					to="/"
					className={({ isActive }) => {
						return !isActive
							? "text-gray-500 flex gap-2 justify-center items-center"
							: "active-navlink";
					}}
				>
					<FontAwesomeIcon icon={faLink} />
					<p>Links</p>
				</NavLink>
				<NavLink
					to="/profile"
					className={({ isActive }) => {
						return !isActive
							? "text-gray-500 flex gap-2 justify-center items-center"
							: "active-navlink";
					}}
				>
					<FontAwesomeIcon icon={faUser} />
					<p>Profile</p>
				</NavLink>
			</nav>
			<Link to="/preview" className="transparent-btn-small">
				Preview
			</Link>
		</header>
	);
}
