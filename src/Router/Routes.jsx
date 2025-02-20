import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home/Home";
// import Users from "../Pages/Home/Users/Users";
import Branch from "../Pages/Home/Branch/Branch";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            

            {
                path: '/branch',
                element: <Branch></Branch>
            }
        ]
    }
]);