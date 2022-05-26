import React, { useState } from "react";

const Form = (props) => {
	const [inputValue, setInputValue] = useState("");

	const manejarTarea = (e) => {
		return setInputValue(e.target.value);
	};

	const agregarTarea = (e) => {
		e.preventDefault();
		if (e.key === "Enter" && inputValue.trim().length > 0) {
			props.nuevaTarea(inputValue.trim());
			setInputValue("");
		}
	};

	return (
		<>
			<input
				onKeyUp={agregarTarea}
				className={props.className}
				size={props.size}
				type={props.text}
				placeholder={props.placeholder}
				value={inputValue}
				onChange={manejarTarea}
			/>
		</>
	);
};

export default Form;
