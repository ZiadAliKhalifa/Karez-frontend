import ReactDOM from "react-dom";
import React, {useState} from 'react';


function FileUploadPage({value, setValue}){
	// const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setValue(event.target.files[0]);
    setIsFilePicked(true)
	};

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {value.name}</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
		</div>
	)
}



// import React, {useState} from 'react';

// function FileUploadPage(){
// 	const [selectedFile, setSelectedFile] = useState();
// 	const [isFilePicked, setIsFilePicked] = useState(false);

// 	const changeHandler = (event) => {
// 		setSelectedFile(event.target.files[0]);
// 		setIsSelected(true);
// 	};

// 	const handleSubmission = () => {
// 	};

// 	return(True)
// }