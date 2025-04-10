import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import FloorPage from "../Pages/Floor/FloorPage";
import Home from "../Pages/Home/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/floors",
        element: <FloorPage />,
    },
    {
        path: '/',
        element:<Main></Main>,
        children:[
            {
                path: '/',
                element:<Home></Home>
            }
        ]
    }
])