import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function PreviewNavBar() {
	return (
		<header className="bg-white text-white flex justify-between items-center p-5 mb-10 md:mx-10 relative rounded-lg">
			<Link to="/" className="transparent-btn-small">
				Back to builder
			</Link>
			<button
				className="text-white bg-indigo-500 focus-within:outline-none"
				onClick={() => {
					navigator.clipboard.writeText(window.location.href);
					toast.success("Link copied to clipboard");
				}}
			>
				<ToastContainer />
				Share link
			</button>
		</header>
	);
}
