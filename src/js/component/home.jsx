import React, { useState } from "react";


//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("");
	const [tareas, setTareas] = useState([]);
	return (
		<div className="container">
			<h1>To dos </h1>
			<ul>
				<li>
					<input
						type="text" 
						placeholder="Introduzca una tarea"
						onChange={(e) => setTarea(e.target.value)}
						value={tarea}
						onKeyDown={(e)=> {
						if (e.key==="Enter") {
							setTareas(tareas.concat((tarea)));
							setTarea("");
						}
						}}></input>
				</li>
				{tareas.map((item, index)=>(
				<li>
					<div>
						<span>{item}</span><i className="fa-regular fa-circle-xmark" onClick={()=>
						setTareas(tareas.filter((t, currentIndex)=>
					index != currentIndex
				)
				)
				}></i>
					</div>
				</li>
				))}
			</ul>
			<div>{tareas.length} tareas</div>
		</div>
	);
};

export default Home;
