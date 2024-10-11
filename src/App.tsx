import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar";
import PreviewNavBar from "./components/PreviewNavBar";

export default function App() {
	const location = useLocation();

	return (
		<div className="w-full relative">
			{location.pathname === "/preview" ? (
				<div className="hidden md:block absolute bg-indigo-500 top-0 left-0 right-0 bottom-0 rounded-b-3xl min-h-80"></div>
			) : null}
			{location.pathname === "/preview" ? (
				<div className="md:pt-7">
					<PreviewNavBar />
				</div>
			) : (
				<Navbar />
			)}
			<div className="mx-5">
				<Outlet />
			</div>
		</div>
	);
}
