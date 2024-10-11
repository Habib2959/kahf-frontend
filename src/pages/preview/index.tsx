import ProfileView from "../../components/ProfileView";

export default function Preview() {
	const items = JSON.parse(localStorage.getItem("items") || "[]");
	const base64Image = JSON.parse(localStorage.getItem("image") || '""');
	const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
	return (
		<div>
			<ProfileView
				items={items || []}
				base64Image={base64Image || ""}
				email={userInfo?.email || ""}
				firstName={userInfo?.firstName || ""}
				lastName={userInfo?.lastName || ""}
			/>
		</div>
	);
}
