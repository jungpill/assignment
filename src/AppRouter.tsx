import Layout from "./layouts/Layout";
import { createBrowserRouter, redirect} from 'react-router-dom';
import Dashboard from "./pages/dashboard";

const AppRouter = createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        loader: async () => {
            
        },
        children:[
            {   index: true,
                element:<Dashboard/>
            },{
                index: true,
                element: <Dashboard/>,
                path: 'merchantsList'
            }
        ]
}])

export default AppRouter;