import React, { useState } from "react";
import Form from "./Form.jsx";
import Tarea from "./Tarea.jsx";
import { AiOutlineClose } from "react-icons/ai";

const Home = () => {
	const [listaDeTareas, setListaDeTareas] = useState([]);
	const [contador, setContador] = useState(0);

	const nuevaTarea = (tarea) => {
		const tareasActualizadas = [tarea, ...listaDeTareas];
		setListaDeTareas(tareasActualizadas);
		setContador(tareasActualizadas.length);
	};

	const borrar = (e) => {
		const nuevaLista = listaDeTareas.filter((elemento, index) => {
			if (index !== e) {
				return true;
			}
		});
		setListaDeTareas(nuevaLista);
		setContador(nuevaLista.length);
	};

	return (
		<div className="container">
			<h1>Todos</h1>
			<p>
				To add new tasks press <strong>"Enter"</strong> key
			</p>
			<div className="todos-container">
				<div>
					<Form
						className="tarea"
						type={"text"}
						placeholder={"What needs to be done?"}
						nuevaTarea={nuevaTarea}
						size={"100"}
					/>
					{listaDeTareas.map((nuevaTarea, index) => {
						return (
							<div className="tarea-container" key={index}>
								<Tarea tarea={nuevaTarea} id={index} />
								<button
									className="icono"
									onClick={() => {
										borrar(index);
									}}>
									<AiOutlineClose />
								</button>
							</div>
						);
					})}
					<div className="item-left">
						{contador <= 1
							? contador + " Item "
							: contador + " Items "}
						left
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
