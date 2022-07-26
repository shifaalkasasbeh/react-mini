import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateItem } from "../../redux/itemSlice";


const UpdateItem = ()=>{
    
    const dispatch = useDispatch();
    const {id} = useParams();
    let navigate = useNavigate();
    
    const allItems = useSelector(state=>state.item.items)

    const [itemData , setItemData] = useState({name:"", description:"" , image:""});
    let obj = {}
    
    allItems.forEach(element => {
        if(element.id == id){
            obj['id'] = element.id;
            obj['name'] = element.name;
            obj['description'] = element.description;
            obj['image'] = element.image;
            
        }
    });
    // console.log(obj)
    useEffect(() => {
        setItemData(obj)
    }, [allItems])
    
    
    const handleChange = (e)=>{
        e.preventDefault()
        const value = e.target.value;
        setItemData({
          ...itemData,
          [e.target.name]: value
        })
    }

    
    const handleSubmit=(e)=>{
        e.preventDefault()
        const value = e.target.value;
        setItemData({
            ...itemData,
            
        })
        
        dispatch(updateItem(itemData));
        navigate('/main' ,{replace:true})
    }

    console.log(itemData)
    return(
    <div className="container m-5 p-5" >

    <form onSubmit={handleSubmit}>
        <h3>Update </h3>
            <div className="form-outline mb-4">
                <label className="form-label" >Name</label>
                <input 
                type="text"  
                className="form-control" 
                value={itemData.name} 
                name="name"
                onChange={handleChange}
                />
            </div>

{/* 
            <div className="form-outline mb-4">
                <label className="form-label" >Image</label>
                <input type="file"  className="form-control" />
            </div> */}

            <div className="form-outline mb-4">
                <label className="form-label">Description</label>
                <textarea 
                className="form-control" 
                value={itemData.description} 
                name="description"
                onChange={handleChange}
                />
            </div>


    <div className="my-4">
        <img src={ "http://localhost:8000/uploads/"+ itemData.image } width="120px" />
    </div>


            <button type="submit" className="btn btn-primary btn-block mb-4">Update</button>
    </form>
    </div>
    )
}

export default UpdateItem;