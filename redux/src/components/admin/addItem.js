import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../redux/itemSlice";


const AddItem = ()=>{
    const [itemData , setItemData] = useState({name:"" , description:"" , image:null});
    let navigate = useNavigate();
    const handleChange = (e)=>{
        e.preventDefault()
        const value = e.target.value;
        setItemData({
          ...itemData,
          [e.target.name]: value
        })
    }

    const handleChangeImage=(e)=>{
        setItemData(
           { ...itemData,
            image: e.target.files[0]}
        )
    }

    const dispatch = useDispatch();
    const handleSubmit=(e)=>{



        e.preventDefault()
        const value = e.target.value;
        setItemData({
            ...itemData,
        })
        
        const formData = new FormData();
        formData.append('image', itemData.image)
        formData.append('name', itemData.name)
        formData.append('description', itemData.description)
        // console.log(itemData)
        dispatch(addItem(formData));

        navigate("/main", { replace: true });
    }

  


    return(
    <div className="container m-5 p-5 " >
    <form onSubmit={handleSubmit}>
        <h3>Add New Product</h3>
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


            <div className="form-outline mb-4">
                <label className="form-label" >Image</label>
                <input 
                    type="file" 
                    className="form-control" 
                    name="image" 
                    onChange={handleChangeImage}
                    multiple
                />
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" >Description</label>
                <textarea
                 
                 className="form-control" 
                 value={itemData.description}
                 onChange={handleChange}
                 name="description"
                 />
            </div>


            <button type="submit" className="btn btn-primary btn-block mb-4">Add</button>
    </form>
    </div>
    )
}

export default AddItem;