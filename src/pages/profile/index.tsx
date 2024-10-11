import { useState } from "react";
import FileUpload from "../../components/FileUpload";
import Preview from "../../components/Preview";
import { toast, ToastContainer } from "react-toastify";

type UserInfo = {
	firstName: string;
	lastName: string;
	email: string;
};

export default function Profile() {
	const [image, setImage] = useState<string>(
		JSON.parse(localStorage.getItem("image") || '""')
	);
	const parsedUserInfo: UserInfo | null = JSON.parse(
		localStorage.getItem("userInfo") || "null"
	);

	const [userInfo, setUserInfo] = useState({
		firstName: parsedUserInfo?.firstName ?? "",
		lastName: parsedUserInfo?.lastName ?? "",
		email: parsedUserInfo?.email ?? "",
	});
	const items = JSON.parse(localStorage.getItem("items") || "[]");

	const getImage = (image: string) => {
		setImage(image);
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!userInfo.firstName || !userInfo.lastName) {
			toast.error("Please fill all the fields");
			return;
		}
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		localStorage.setItem("image", JSON.stringify(image));
		toast.success("Profile updated successfully");
	};

	return (
		<div className="flex gap-7 flex-wrap md:flex-nowrap">
			<div className="w-full order-2 md:order-1">
				<Preview
					items={items}
					base64Image={image}
					email={userInfo.email}
					firstName={userInfo.firstName}
					lastName={userInfo.lastName}
				/>
			</div>
			<form className="card order-1 md:order-2" onSubmit={handleSubmit}>
				<ToastContainer />
				<div className="card-link">
					<FileUpload getImage={getImage} />
				</div>
				<div className="card-link">
					<label
						htmlFor="firstName"
						className="flex justify-between items-center"
					>
						<p className="w-full text-gray-400">
							First Name <sup>*</sup>
						</p>
						<input
							type="text"
							placeholder="First name"
							required
							className="link-input"
							onChange={(e) => {
								setUserInfo((prev) => {
									return {
										...prev,
										firstName: e.target.value,
									};
								});
							}}
						/>
					</label>
					<label
						htmlFor="lastName"
						className="flex justify-between items-center"
					>
						<p className="w-full text-gray-400">
							Last Name <sup>*</sup>
						</p>
						<input
							type="text"
							placeholder="Last name"
							required
							className="link-input"
							onChange={(e) => {
								setUserInfo((prev) => {
									return {
										...prev,
										lastName: e.target.value,
									};
								});
							}}
						/>
					</label>
					<label htmlFor="email" className="flex justify-between items-center">
						<p className="w-full text-gray-400">Email</p>
						<input
							type="email"
							placeholder="Enter Email"
							className="link-input"
							onChange={(e) => {
								setUserInfo((prev) => {
									return {
										...prev,
										email: e.target.value,
									};
								});
							}}
						/>
					</label>
				</div>
				<div className="text-right mt-5">
					<button
						type="submit"
						className="text-white bg-indigo-500 focus-within:outline-none hover:bg-transparent hover:text-indigo-500 transition-all"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
