import { useAuth } from "context/auth-context";
import React from "react";
import { Form, Input } from 'antd'
import { LongButton } from "unauthenticated-app/index";
import { useAsync } from "utils/use-async";
 
export const LoginScreen = ({onError}: {onError: (error:any) => void}) => {
    // 通过useAuth获取user用户信息
    const {login} = useAuth() 
    const {run,isLoading} = useAsync(undefined,{throwOnError:true})
    
    const handleSubmit = async (values:{username:string,password:string}) => {
        // event.preventDefault();
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        try{
            //login是异步操作，当调用login的时候已经调用onError
            await run(login(values)) 
        } catch(e){
            onError(e)
        }
    }

    return <Form onFinish={handleSubmit}>        
        <Form.Item name={'username'} rules={[{required:true,message:'请输入用户名'}]}>
            <Input placeholder={'用户名'} type="text" id={'username'}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true,message:'请输入密码'}]}>
            <Input placeholder={'密码'} type="password" id={'password'}/>
        </Form.Item>
        <Form.Item>
            <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>登录</LongButton>    
        </Form.Item>
    </Form>
}