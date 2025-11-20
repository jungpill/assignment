import Layout from "./layouts/Layout";
import { createBrowserRouter, redirect} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import MerchantsList from "./pages/MerchantsList";

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