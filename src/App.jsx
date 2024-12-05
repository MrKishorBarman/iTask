import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const App = () => {
    let [todo, setTodo] = useState("")
    let [todos, setTodos] = useState([])
    let [showFinished, setShowFinished] = useState(false)

    useEffect(() => {
        let todoString = localStorage.getItem("todos")
        if (todoString) {
            setTodos(JSON.parse(todoString))
        }
    }, [])

    useEffect(() => {
            saveTodosLocalStorage();
    }, [todos])

    let saveTodosLocalStorage = () => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        } else {
            localStorage.removeItem("todos");
        }
    }

    let toggleFinished = (e) => {
        setShowFinished(!showFinished)
    }


    let handleEdit = (e) => {
        let t = todos.filter(item => item.id === e.currentTarget.id)
        setTodo(t[0].todo)

        let newTodos = todos.filter(item => item.id !== e.target.id)
        setTodos(newTodos)
        saveTodosLocalStorage()
    }

    let handleDelete = (e) => {
        let isConfirmed = confirm("Are you sure you want to delete 🤨?")
        if (isConfirmed) {
            let newTodos = todos.filter(item => item.id != e.currentTarget.id)
            setTodos(newTodos)
        }
        saveTodosLocalStorage()
    }

    let handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
        setTodo("")
        saveTodosLocalStorage()
    }

    let handleChange = (e) => {
        setTodo(e.target.value)
    }

    let handleCheckbox = (e) => {
        let id = e.target.id
        let index = todos.findIndex(item => item.id === id)
        let newTodos = [...todos]
        newTodos[index].isCompleted = !newTodos[index].isCompleted
        setTodos(newTodos)
        saveTodosLocalStorage()
    }

    return (

        <>
            <Navbar />
            <div className='mx-3 md:container bg-violet-200 rounded-xl p-5 my-5 md:mx-auto md:w-1/2 min-h-[80vh]'>
                <h1 className="font-bold text-center text-3xl shadow-sm"><span className='font-extrabold text-4xl'>iTask</span> - Stay Organized, Stay Productive</h1>
                <div className="addTodo my-5">
                    <h2 className="text-2xl font-bold">Add a Todo</h2>
                    <div className="flex">
                        <input onChange={handleChange} value={todo} type="text" className='w-full rounded-md' />
                        <button disabled={todo.length < 3} onClick={handleAdd} className="disabled:bg-violet-950 bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md ml-6 w-36 cursor-pointer">Save</button>
                    </div>
                </div>
                <input className='cursor-pointer' onChange={toggleFinished} type="checkbox" id="showfinished" checked={showFinished} />
                <label className='m-3' htmlFor="showfinished">Show finished</label>
                <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
                <h2 className='text-lg font-bold'>Your Todos</h2>
                <div className="todos">

                    {todos.length === 0 && <h1 className='text-base font-[100] m-5'>No todos to display</h1>}

                    {todos.map(item => {

                        return (showFinished || !item.isCompleted) &&
                            <div key={item.id} className="todo flex justify-between w-full my-3">
                                <div className='flex gap-5'>
                                    <input className='cursor-pointer' id={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                                </div>
                                <div className="buttons flex h-full">
                                    <button id={item.id} onClick={handleEdit} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"><FaEdit /></button>
                                    <button id={item.id} onClick={handleDelete} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"><MdDelete /></button>
                                </div>
                            </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default App
