import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';




const Home = ()=>{

const allItems = useSelector((state)=>state.item.items);

const showItems = allItems.map((item)=>{
    return(
    <div className="card col-3 p-0 mx-5 my-3" key={item.id}>
        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
            <img src={ "http://localhost:8000/uploads/" + item.image } className="img-fluid"/>
            <NavLink to='/'>
            <div className="mask" style={{"backgroundColor": "rgba(251, 251, 251, 0.15)"}}></div>
            </NavLink>
        </div>
        <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.description}</p>
            <NavLink to='/' className="btn btn-primary">shop</NavLink>
        </div>
    </div>
    )
});

    return(
    <div className="row container-fluid m-3">
        {showItems}
    </div>
    )
}

export default Home;