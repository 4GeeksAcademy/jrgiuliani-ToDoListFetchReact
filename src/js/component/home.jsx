import React, { useEffect, useState } from "react";
const URLBASE = "https://playground.4geeks.com/todo"

//create your first component
const Home = () => {
    const [tarea, setTarea] = useState("");
    const [tareas, setTareas] = useState([]);
    
	// Función que se trae todas las tareas de mi usuario
    async function getTask() {
        try {
            let response = await fetch(`${URLBASE}/users/jrgiuliani`)
            if (response.status == 404) {
                console.log("debo crear el uauario")
            } else {
                let data = await response.json()
                setTareas(data.todos)
            
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Funcion que agrega o crea una tarea:

    const addTask = async () => {
        try {
            let response = await fetch(`${URLBASE}/todos/jrgiuliani`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "label": tarea,
                    "is_done": false
                })
            })
            if (response.ok) {
                console.log('Tarea creada')
                getTask()
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Funcion que borra una tarea 

    const deleteTask = async (taskId) =>{
        
        try {
            let response = await fetch(`${URLBASE}/todos/${taskId}`, {
                method: "DELETE" 
            });
            if (response.status==204) {
                console.log(`Tarea con ID ${taskId} ha sido eliminada.`);
                getTask()
            } else {
                console.error('Hubo un problema al eliminar la tarea.');
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Funcion que borra el usuario:

    const deleteUser = async () =>{
        try {
            let response = await fetch(`${URLBASE}/users/jrgiuliani`,{
                method: "DELETE"
            });
            if (response.status==204) {
                console.log(`Usuario eliminado.`);
                setTareas([])
            }else {
                console.error('Hubo un problema al eliminar el usuario');
            }
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        getTask()
    }, [])

    return (
        <div className="container">
            <div>
				<h1>To dos </h1>
				<button className="btn btn-primary" onClick = {()=>{
                    {tareas.forEach((item,index)=>{
                        deleteTask(item.id)
                    })}
                    deleteUser();
                }}>Borrar usuario</button>
			</div>
            <ul>
                <li>
                    <input
                        type="text"
                        placeholder="Introduzca una tarea"
                        onChange={(e) => setTarea(e.target.value)}
                         onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                addTask()
                                setTarea("");
                            }
                        }}></input>
                </li>
                {tareas.map((item, index) => (
                    <li key={item.label}>
                        <div>
                            <span>{item.label}</span><i className="fa-regular fa-circle-xmark" onClick={() =>{
                                deleteTask(item.id)
                            }}></i>
                        </div>
                    </li>
                ))}
            </ul>
            <div>{tareas.length} tareas</div>
        </div>
    );
};
export default Home;