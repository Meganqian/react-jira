import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
 
export const LoginScreen = () => {

    const {login, user} = useAuth() 
    
    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        console.log(event) 
        event.preventDefault();
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        login({username,password})
    }

    return <form onSubmit={handleSubmit}>
        {user?<div>登录成功，用户名{user?.name}</div>:''}
        
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id={'username'}/>
        </div>
        <div>
            <label htmlFor="passward">密码</label>
            <input type="passward" id={'passward'}/>
        </div>
        <button type={"submit"}>登录</button>
    </form>
}