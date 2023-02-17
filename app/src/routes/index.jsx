import { Routes, Route, Navigate } from "react-router-dom"
import { LoginRegister } from "../components/LoginRegister/Login"
import { TodoList } from "../components/TodoList/TodoList"

export const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginRegister/>}/>
            <Route path="*" element={<Navigate replace to="/"/>}/>

            <Route path="/todo" element={<TodoList/>}/>
        </Routes>
    )
}