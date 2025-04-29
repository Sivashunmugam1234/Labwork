import { useState, useRef } from "react";

export default function Todo() {
    const getTask =useRef<HTMLInputElement>(null);
    const [Task, setTask] = useState<string[]>([]);
    const[index,setIndex]=useState<number>(-1);


    const AddTask=(()=>{
        console.log(index);
        
        if(getTask.current){

            if (getTask.current.value==="")return;

            if(index>=0){
                const editingTask=getTask.current.value;
                const EditedTask=[...Task]
                EditedTask.splice(index,1,editingTask)
                setTask(EditedTask);
            getTask.current.value=""
            setIndex(-1);

            }
            else{
                const currentTask=getTask.current.value;
            setTask([...Task,currentTask])
            getTask.current.value=""

            }
            
        }
    })

    function editTask(index:number){
        
        if(getTask.current){
            getTask.current.value=Task[index];
            setIndex(index)

        }

    }

    function deleteTask(delIndex:number){
    setTask(Task.filter((_,index)=>index!==delIndex))
    }

    return (
        <>
            <input type="text" ref={getTask} className="border-2" />
            <button onClick={()=>{AddTask()}}>Add</button>  
            {
                Task.map((task,key)=>(
                    <div className="flex">
                    <p key={key}>
                        {task}
                    </p>
                    <button className="border border-2"onClick={()=>editTask(key)}>edit</button>
                    <button  className="border border-2" onClick={()=>deleteTask(key)}>Delete</button>
                    </div>
                    
                ))
            }  
        </>
    );
}
