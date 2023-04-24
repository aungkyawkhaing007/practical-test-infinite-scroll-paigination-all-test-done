import { useRoutes,Navigate } from "react-router-dom";


import { Market } from "./Element";



const AdminRoutes = () => {

  return (
      useRoutes([
        {
          path: '/',
          element: <Navigate to='/market-place'/>,
        },  
        {
          path: '/market-place',
          element:<Market/>,
        },
      ])
  ) 
}

export default AdminRoutes
