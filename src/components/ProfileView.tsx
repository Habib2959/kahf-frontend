import { Item } from "../pages/linkGenetration/components/SortableList";

type Props = {
	items: Item[];
	base64Image: string;
	firstName: string;
	lastName: string;
	email: string;
};

export default function ProfileView({
	items,
	base64Image,
	email,
	firstName,
	lastName,
}: Props) {
	return (
		<div className="border border-gray-200 px-8 py-10 rounded-xl flex  flex-col justify-center items-center gap-5 bg-white md:absolute md:z-10 md:left-[44%] md:-translate-x-[25%]">
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
						className={`w-full ${item.bgColor} text-white px-5 py-3 rounded-md capitalize`}
					>
						{item.type}
					</a>
				))}
			</div>
		</div>
	);
}
