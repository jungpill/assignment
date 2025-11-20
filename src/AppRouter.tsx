import Layout from "./layouts/Layout";
import { createBrowserRouter, redirect} from 'react-router-dom';
import Dashboard from "./pages/dashboard";
import MerchantsList from "./pages/merchantsList";

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
                element: <MerchantsList/>,
                path: 'merchants-list'
            }
        ]
}])

export default AppRouter;