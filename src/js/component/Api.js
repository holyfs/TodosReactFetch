import { stringify } from "query-string";

const GetUser = (name) => {
	return (
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${name}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				/* 				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string) */
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			// .then((data) => {
			// 	if (data.msg) {
			// 		data = CreateUser(name);
			// 		return [
			// 			{
			// 				label: "sample task",
			// 				done: false,
			// 			},
			// 		];
			// 	}
			// 	//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
			// 	/* 			console.log(data); */
			// 	return data; //esto imprimirá en la consola el objeto exacto recibido del servidor
			// })
			.catch((error) => {
				//manejo de errores
				console.log(error);
				return null;
			})
	);
};

const UpdateUser = (name, todo) => {
	return fetch(`https://assets.breatheco.de/apis/fake/todos/user/${name}`, {
		method: "PUT",
		body: JSON.stringify(todo),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((resp) => {
			/* console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
			console.log(resp.status); // el código de estado = 200 o código = 400 etc.
			console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string) */
			return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
		})
		.then((data) => {
			//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
			/* console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor */
		})
		.catch((error) => {
			//manejo de errores
			console.log(error);
		});
};
const DeleteUser = (name) => {
	return fetch(`https://assets.breatheco.de/apis/fake/todos/user/${name}`, {
		method: "DELETE", // PUEDE ESTAR EN MINUISCULAS
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.log(error);
			return null;
		});
};
const CreateUser = (name) => {
	return fetch(`https://assets.breatheco.de/apis/fake/todos/user/${name}`, {
		method: "POST", // PUEDE ESTAR EN MINUISCULAS
		body: JSON.stringify([]),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.log(error);
			return null;
		});
};

export default { GetUser, UpdateUser, DeleteUser, CreateUser };
