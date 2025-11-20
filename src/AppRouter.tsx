import Layout from "./layouts/Layout";
import { createBrowserRouter} from 'react-router-dom';
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
            },{
                index: true,
                element: <MerchantsList/>,
                path: 'payment-list'
            }
        ]
}])

export default AppRouter;