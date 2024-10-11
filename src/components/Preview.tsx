import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Item } from "../pages/linkGenetration/components/SortableList";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
	items: Item[];
	base64Image: string;
	firstName: string;
	lastName: string;
	email: string;
};

export default function Preview({
	items,
	base64Image,
	email,
	firstName,
	lastName,
}: Props) {
	return (
		<div className="card flex justify-center items-center">
			<div className="border border-gray-200 min-w-[40%] px-8 py-10 rounded-xl flex  flex-col justify-center items-center gap-5">
				{base64Image ? (
					<img
						src={base64Image}
						alt="preview"
						className="w-40 h-40 object-cover rounded-full"
					/>
				) : (
					<div className="w-40 h-40 bg-gray-200 rounded-full"></div>
				)}
				{firstName && lastName ? (
					<p className="text-black font-bold">
						{firstName} {lastName}
					</p>
				) : (
					<div className="w-52 h-5 bg-gray-200 rounded-md"></div>
				)}
				{email ? (
					<p className="text-gray-400">{email}</p>
				) : (
					<div className="w-40 h-5 bg-gray-200 rounded-md"></div>
				)}
				<div className="flex flex-col gap-5 w-full mt-10">
					{items.map((item, index) => (
						<a
							href={item.link}
							key={index}
							className={`w-full ${item.bgColor} text-white px-5 py-3 rounded-md capitalize flex justify-between items-center`}
						>
							{item.type}{" "}
							{item.link ? <FontAwesomeIcon icon={faArrowRight} /> : ""}
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
