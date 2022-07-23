import React, { useState, useEffect } from "react";

function App() {
	const [data, setData] = useState(() => {
		const savedTodos = localStorage.getItem("todos");
		if (savedTodos) {
			return JSON.parse(savedTodos);
		} else
			return {
				toDoList: [],
				toDo: "",
				priority: "",
			};
	});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(data));
  }, [data]);
	const updateData = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};
	const handleChange = (e) => {
		updateData(e);
	};

	const validate = () => {
		if (data.toDo === "") {
			alert("Please enter a to do item");
			return false;
		}
		if (data.priority === "") {
			alert("Please enter a priority");
			return false;
		}
		return true;
	};

	const handleSubmit = (e) => {
		if (!validate()) {
			return;
		}
		const obj = {
			todo: data.toDo,
			priority: data.priority,
			id: data.toDoList.length + 1,
		};
		const currentList = [...data.toDoList];
		currentList.push(obj);
		setData({
			...data,
			toDoList: currentList,
			toDo: "",
		});
	};

	const handleDelete = (id) => {
		setData({
			...data,
			toDoList: data.toDoList.filter((item) => item.id !== id),
		});
	};

	return (
		<div className="App">
			<div className="container">
				<input
					name="toDo"
					value={data.toDo}
					onChange={handleChange}
					type="text"
					id="todoInput"
					placeholder="List down your pending works here"
				/>
				<div className="priority">
					<div className="priority-label">Priority:</div>
					<div className="priority-buttons">
						<input id="high" type="radio" name="priority" value="High" onChange={handleChange} />
						<label htmlFor="high">High</label>
						<input id="medium" type="radio" name="priority" value="Medium" onChange={handleChange} />
						<label htmlFor="medium">Medium</label>
						<input id="low" type="radio" name="priority" value="Low" onChange={handleChange} />
						<label htmlFor="low">Low</label>
					</div>
				</div>

				<button onClick={handleSubmit} id="addTodo">
					Add
				</button>
				<ul id="todoList">
					{data.toDoList.map((el) => (
						<li key={el.id}>
							{el.todo} {el.priority}
							<button onClick={() => handleDelete(el.id)} className="delete">
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
