import React, { useState } from 'react';


export const FileUploadButton = ({ runParentFunction }) => {
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		runParentFunction(event.target.files[0]);
		setIsFilePicked(true)
	};

	return (
		<div>
			<input type="file" name="file" onChange={changeHandler} />
		</div>
	)
}