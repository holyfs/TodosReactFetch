import React, { useState, useEffect } from "react";
import Form from "./Form.jsx";
import Tarea from "./Tarea.jsx";
import { AiOutlineClose } from "react-icons/ai";
import Api from "/workspace/todosWithReact/src/js/component/Api.js";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [listaDeTareas, setListaDeTareas] = useState([]);
	const [contador, setContador] = useState(0);

	const getTareas = (name) => {
		Api.GetUser(name).then((resp) => {
			if (resp.msg && resp.msg.startsWith("This use does not exists")) {
				Api.CreateUser(name).then((resp) => {
					if (resp.result === "ok") {
						Api.GetUser(name).then((resp) => {
							setListaDeTareas(resp);
							setContador(resp.length);
						});
					}
				});
			} else {
				setListaDeTareas(resp);
				setContador(resp.length);
			}
		});
	};

	/* 	const getUserInfo = async (name) => {
		const valorDeGetTareas = await getTareas(name);
		console.log(valorDeGetTareas);
	}; */
	// useEffect hace que se cargue la funcion a penas se levanta el componente!
	/* 	useEffect(() => {
		getTareas();
	}, []); */

	const nuevaTarea = (tarea) => {
		let nuevaTarea = {
			label: tarea,
			done: false,
		};
		const tareasActualizadas = [nuevaTarea, ...listaDeTareas];
		const tareaUsuario = Api.UpdateUser(inputValue, tareasActualizadas);
		getTareas(inputValue);
	};

	const borrar = (e) => {
		let nuevaLista = listaDeTareas.filter((elemento, index) => {
			if (index !== e) {
				return true;
			}
		});
		if (nuevaLista.length === 0) {
			nuevaLista = [
				{
					label: "sample task",
					done: false,
				},
			];
		}
		Api.UpdateUser(inputValue, nuevaLista).then((resp) => {
			getTareas(inputValue);
		});
	};
	const obtenerNombreDeUsuario = (e) => {
		return setInputValue(e.target.value);
	};
	const eliminarTodo = (name) => {
		Api.UpdateUser(inputValue, [
			{
				label: "sample task",
				done: false,
			},
		]).then((resp) => {
			getTareas(inputValue);
		});
	};
	/* 	const eraseUser = (name) => {
		Api.DeleteUser(name).then((resp) => {
			if (resp.result === "ok") {
				console.log(resp);
				setInputValue("");
				setListaDeTareas([]);
				setContador(0);
				console.log({ inputValue });
			}
		});
	}; */

	return (
		<div className="container">
			<h1>Todos</h1>
			<p>
				To add new tasks press <strong>"Enter"</strong> key
			</p>
			<div className="todos-container">
				<input
					onChange={obtenerNombreDeUsuario}
					className="tarea"
					type={"text"}
					placeholder={"user Name"}
					size={"100"}
					value={inputValue}
				/>
				<div className="forUsers">
					<button
						onClick={() => getTareas(inputValue)}
						className="botonDeBusqueda">
						search/create user
					</button>
					{/* <button
						className="eraseUser"
						onClick={() => {
							eraseUser(inputValue);
						}}>
						delete user
					</button> */}
				</div>
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
								<Tarea tarea={nuevaTarea.label} id={index} />
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
					<div className="container-especies">
						<div className="item-left">
							{contador <= 1
								? contador + " Item "
								: contador + " Items "}
							left
						</div>

						<button
							className="boton-eliminarAll"
							onClick={() => {
								eliminarTodo(inputValue);
							}}>
							erase all todos
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
