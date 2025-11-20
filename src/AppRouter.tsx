import Layout from "./layouts/Layout";
import { createBrowserRouter} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import MerchantsList from "./pages/MerchantsList";
import PaymentList from './pages/PaymentList'

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
                element: <PaymentList/>,
                path: 'payment-list'
            }
        ]
}])

export default AppRouter;