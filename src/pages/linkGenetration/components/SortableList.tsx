import { useEffect, useState } from "react";
import Preview from "../../../components/Preview";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export type Item = {
	link: string;
	type: string;
	bgColor: string;
	icon: string;
};

const dropDownOptions = [
	{
		value: "github",
		label: "GitHub",
		icon: "fab fa-github",
		bgColor: "bg-black",
	},
	{
		value: "facebook",
		label: "Facebook",
		icon: "fab fa-facebook",
		bgColor: "bg-blue-600",
	},
	{
		value: "linkdin",
		label: "LinkedIn",
		icon: "fab fa-linkedin",
		bgColor: "bg-blue-800",
	},
	{
		value: "youtube",
		label: "YouTube",
		icon: "fab fa-youtube",
		bgColor: "bg-red-600",
	},
];

export const SortableList = () => {
	const parsedItems = JSON.parse(
		localStorage.getItem("items") ||
			'[{ "link": "", "type": "github", "bgColor": "bg-black", "icon": "" }]'
	);
	const [items, setItems] = useState<Item[]>(parsedItems);

	const navigate = useNavigate();

	const [draggingItemIndex, setDraggingItemIndex] = useState<number | null>(
		null
	);

	useEffect(() => {
		localStorage.setItem("items", JSON.stringify(items));
	}, [items]);

	const handleDragStart = (index: number) => {
		setDraggingItemIndex(index);
	};

	// Prevent default to allow drop
	const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
		e.preventDefault();
	};

	const handleDrop = (index: number) => {
		const updatedItems = [...items];
		if (draggingItemIndex !== null) {
			const [draggedItem] = updatedItems.splice(draggingItemIndex, 1);
			updatedItems.splice(index, 0, draggedItem);
			setItems(updatedItems);
		}
		setDraggingItemIndex(null);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Check if all links are filled
		if (items.some((item) => !item.link)) {
			toast.error("Please fill all the links");
			return;
		}

		// Link validation with regex
		let isValid = true;

		items.forEach((item) => {
			switch (item.type) {
				case "github":
					if (!item.link.match(/^https?:\/\/github\.com\/([a-zA-Z0-9._-]+)$/)) {
						toast.error("Invalid GitHub link");
						isValid = false;
					}
					break; // Use break instead of return

				case "facebook":
					if (
						!item.link.match(
							/(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\\-]*\/)*([\w\-\\.]+)(?:\/)?/i
						)
					) {
						toast.error("Invalid Facebook link");
						isValid = false;
					}
					break;

				case "linkdin": // Change this to 'linkedin' if needed
					if (
						!item.link.match(
							/((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/
						)
					) {
						toast.error("Invalid LinkedIn link");
						isValid = false;
					}
					break;

				case "youtube":
					if (
						!item.link.match(
							/^(https?\\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/
						)
					) {
						toast.error("Invalid YouTube link");
						isValid = false;
					}
					break;

				default:
					break;
			}

			// Exit loop early if an invalid link is found
			if (!isValid) {
				return;
			}
		});

		// If there's an invalid link, stop the submission
		if (!isValid) {
			return;
		}

		// Save the items if all validations pass
		localStorage.setItem("items", JSON.stringify(items));
		toast.success("Links saved successfully");

		// Navigate to the profile page
		navigate("/profile");
	};

	const addLink = () => {
		setItems([
			...items,
			{ link: "", type: "github", bgColor: "bg-black", icon: "" },
		]);
		toast.info("New link added");
	};

	const handleTypeSelect = (
		e: React.ChangeEvent<HTMLSelectElement>,
		index: number
	) => {
		const updatedItems = [...items];
		updatedItems[index].type = e.target.value;
		updatedItems[index].bgColor = dropDownOptions.find(
			(option) => option.value === e.target.value
		)?.bgColor as string;
		updatedItems[index].icon = dropDownOptions.find(
			(option) => option.value === e.target.value
		)?.icon as string;
		setItems(updatedItems);
	};

	const handleLink = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const updatedItems = [...items];
		updatedItems[index].link = e.target.value;
		setItems(updatedItems);
	};

	const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

	return (
		<div className="flex gap-7 flex-wrap md:flex-nowrap">
			<div className="w-full order-2 md:order-1">
				<Preview
					items={items}
					base64Image={JSON.parse(localStorage.getItem("image") || '""')}
					email={userInfo?.email || ""}
					firstName={userInfo?.firstName || ""}
					lastName={userInfo?.lastName || ""}
				/>
			</div>
			<div className="card order-1 md:order-2">
				<ToastContainer />
				<h2 className="font-bold text-3xl">Customize your links</h2>
				<p className="text-gray-400 mt-2">
					Add/edit/remove links and share to the world!
				</p>
				<button onClick={addLink} className="clear-btn my-5">
					Clear profile
				</button>
				<button onClick={addLink} className="transparent-btn mb-5">
					+ Add new link
				</button>
				<form onSubmit={handleSubmit}>
					<ul>
						{items.map((item, index) => (
							<li
								key={index}
								draggable
								onDragStart={() => handleDragStart(index)}
								onDragOver={handleDragOver}
								onDrop={() => handleDrop(index)}
								className="card-link"
							>
								<h2 className="text-slate-400"># Link #{index + 1}</h2>
								<select
									value={item.type}
									onChange={(e) => handleTypeSelect(e, index)}
									className="select"
								>
									{dropDownOptions.map((option) => (
										<option
											key={option.value}
											value={option.value}
											className="p-2"
										>
											{option.label}
										</option>
									))}
								</select>
								<input
									type="text"
									placeholder="Enter your link"
									value={item.link}
									onChange={(e) => handleLink(e, index)}
									className="link-input"
								/>
							</li>
						))}
					</ul>
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
		</div>
	);
};
