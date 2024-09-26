import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi"
import { Form } from "./Form";
import "../App.css";

export const Posts = () =>{
    const [data, setData] = useState([]);
    const [updateDataApi, setUpdateDataApi] = useState({})

    const getPostData = async () =>{
        const res = await getPost();
        console.log(res.data);
        setData(res.data);
    };

    useEffect(()=>{
        getPostData();
    
    },[]);

    const handleDeletePost = async (id) =>{
        try {
            const res = await  deletePost(id);
            if(res.status === 200){
                const newUpdatedPosts = data.filter((curPost)=>{
                  return curPost.id !== id;
                })
                setData(newUpdatedPosts);
            }
            
        } catch (error) {
            console.log(error);
        }
     

    }

    // handleUpdatePost
    const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);

    return ( 
        <>

        <section className="section-form">
                <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi} />
        </section>


    <section className="section-post">
        <ol>
            {
                data.map((curElem)=>{
                    const {id, body,title} = curElem;
                    return(
                        <li key={id}> 
                        <p> Title: {title}</p>
                        <p> Body: {body}</p>
                        <button onClick={()=> handleUpdatePost()}>Edit</button>
                        <button className="btn-delete" onClick={()=> handleDeletePost(id)}>Delete</button>
                        </li>
                    )
                })
            }
        </ol>
    </section>
    </>
    )
}