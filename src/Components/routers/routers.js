
import {createBrowserRouter} from "react-router-dom" ;
import MainLayOut from "../../MainLayOut/MainLayOut";
import AddBooks from "../Pages/CRUD/AddBooks/AddBooks";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyBooks from "../Pages/MyBooks/MyBooks";
import Register from "../Pages/Register/Register";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import ShowDetails from "../Pages/CRUD/ShowDetails/ShowDetails";
import EditBooks from "../Pages/CRUD/EditBooks/EditBooks" ;

export const routers = createBrowserRouter([
    {
        path:"/", errorElement:<h2 style={{textAlign:"center" , height:"100vh", fontSize:"56px", paddingTop:"120px" , color:"red"}}> You have an error : </h2>, children:[
            {
                path:"/", element:<MainLayOut></MainLayOut>, children:[
                    {
                        path:"/", element:<Home></Home>
                    },
                    {
                        path:"/register", element:<Register></Register>
                    },
                    {
                        path:"/login", element:<Login></Login>
                    },
                    {
                        path:"/my-books", element:<MyBooks></MyBooks>
                    },
                    {
                        path:"/add-books", element:<AddBooks></AddBooks>
                    },
             
                    {
                        path:"/edit/:id",
                        loader: ({params}) => fetch(`http://localhost:4000/bookData/${params.id}`)
                        .then(res => res.json())
                        .then(data => data ) 
                        , element:<EditBooks></EditBooks>
                    },
                    {
                        path:"/reset-password", element:<ResetPassword></ResetPassword>
                    },
                    {
                     path:"/details/:id" ,   element:<ShowDetails></ShowDetails> ,
                     loader: ({params}) => fetch(`http://localhost:4000/bookData/${params.id}`)
                     .then(res => res.json())
                     .then(data => data ) 
                    } , 

                    {
                        path:"*", element:<h2> Page not found !!</h2>
                    }
                ]
            }
        ]
    }
]);

