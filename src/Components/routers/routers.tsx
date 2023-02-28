import {createBrowserRouter} from "react-router-dom" ;
import MainLayOut from "../../MainLayOut/MainLayOut";
import AddBook from "../Pages/AddBook/AddBook";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyBooks from "../Pages/MyBooks/MyBooks";
import Register from "../Pages/Register/Register";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
export const routers = createBrowserRouter([
    {
        path:"/", errorElement:<h2 style={{textAlign:"center" , marginTop:"20%", color:"red"}}> You have an error </h2>, children:[
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
                        path:"/add-books", element:<AddBook></AddBook>
                    },
                    {
                        path:"/reset-password", element:<ResetPassword></ResetPassword>
                    },
                    {
                     path:"/add" , 
                    } ,
                    {
                        path:"*", element:<h2> Page not found !!</h2>
                    }
                ]
            }
        ]
    }
]);

