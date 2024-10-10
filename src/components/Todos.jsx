import { DeleteOutlined, EditOutlined, HeartOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useReducer } from 'react'


const TYPES ={
    create:"CREATE",
    delete:"DELETE",
    liked:"LIKED"
}



function reducer(state,action){
    if(action.type == TYPES.create){
    return{
        todos:[...state.todos, action.payload],
        likedList:state.likedList
        }
    }
    else if(action.type == TYPES.liked){
        return{
            todos:state.todos,
            likedList:[...state.likedList,action.payload ]
        }
    }
    else if(action.type == TYPES.delete){
        const deleteIndex = state.todos.findIndex(item => item.id == action.payload)
        state.todos.splice(deleteIndex, 1)
        return{
            todos:[...state.todos], 
            likedList:state.likedList
        }
    }
}

const initialState ={
    todos:[],
    likedList:[]
}

function Todos() {
const [data,dispatch] = useReducer(reducer,initialState)


    function handleSubmit(e){
        e.preventDefault()
        const newValue ={
            id:data.todos.length,
            value:e.target.todo.value
        }
        dispatch({type:TYPES.create,payload:newValue})

    }
  return (
    <>
    
  <form onSubmit={handleSubmit} className='w-[500px] flex justify-between items-center space-x-2 mx-auto bg-white p-5 rounded-md mt-10'>
    <Input name='todo' className='w-[80%]' placeholder='Add Todo' size='large' allowClear/>
    <Button htmlType='submit' type='primary' size='large'>Submit</Button>
  </form>
  <ul className='w-[500px] mx-auto bg-white p-5 space-y-2 rounded-md mt-10'>
     {data.todos.map((item,index) =>(
        <li className='p-2 rounded-md bg-slate-300 flex justify-between  items-center' key={index}>
            <div>{index + 1}.{item.value}</div>
            <div className='flex space-x-4'>
             <button className='text-green-500'><SaveOutlined /></button>   
            <button onClick={() => dispatch({type:TYPES.liked, payload:item })} className='text-red-600'><HeartOutlined/></button>
            <button onClick={() => dispatch({type:TYPES.delete, payload:item.id})}><DeleteOutlined/></button>
            <button className='text-blue-600'><EditOutlined/></button>
            </div>
        </li>
     ))}
  </ul>
    
    </>
  )
}

export default Todos