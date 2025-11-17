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
            {
                element:<Dashboard/>
            }]
}])

export default AppRouter;