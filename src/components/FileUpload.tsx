import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

type FileUploadProps = {
	getImage: (image: string) => void;
};

export default function FileUpload({ getImage }: FileUploadProps) {
	const [dragActive, setDragActive] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [files, setFiles] = useState<FileList | undefined>(undefined);
	const [base64Image, setBase64Image] = useState<string>(
		JSON.parse(localStorage.getItem("image") || '""')
	);

	useEffect(() => {
		// convert file to base 64
		if (files && files.length > 0) {
			const file = files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setBase64Image(reader.result as string);
				localStorage.setItem("image", JSON.stringify(reader.result));
				getImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	}, [files, getImage]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files && e.target.files) {
			setFiles(e.target.files);
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		console.log(e.dataTransfer.files);

		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files) {
			setFiles(e.dataTransfer.files);
		}
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	};

	const removeFile = () => {
		setFiles(undefined);
		setBase64Image("");
		localStorage.removeItem("image");
		getImage("");
	};

	const openFileExplorer = () => {
		if (inputRef) {
			if (inputRef.current) {
				inputRef.current.value = "";
				inputRef.current.click();
			}
		}
	};

	return (
		<div
			className={`${
				dragActive ? "bg-indigo-300" : "bg-slate-100"
			}  p-4 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center w-full`}
			onDragEnter={handleDragEnter}
			onSubmit={(e) => e.preventDefault()}
			onDrop={handleDrop}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
		>
			<input
				placeholder="fileInput"
				className="hidden"
				ref={inputRef}
				type="file"
				multiple={false}
				onChange={handleChange}
				accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
			/>

			<p className="text-slate-400">
				Drag & Drop files or{" "}
				<span
					className="font-bold text-indigo-500 cursor-pointer"
					onClick={openFileExplorer}
				>
					<u>Select files</u>
				</span>{" "}
				to upload
			</p>

			{base64Image && (
				<div className="flex flex-col items-center border border-indigo-500 rounded-md relative mt-5">
					<FontAwesomeIcon
						icon={faTrash}
						className="text-red-600 absolute top-3 right-3 cursor-pointer"
						onClick={removeFile}
					/>
					<img src={base64Image} alt="preview" className="w-40" />
				</div>
			)}
		</div>
	);
}
