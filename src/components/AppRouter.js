import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { routes } from 'Components/routes';

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({path, element}) => 
                <Route key={path} path={path} element={element} exact/>
            )
            }
            <Route path='*' element={<Navigate to="/invoices"/>} />
        </Routes>
    )
};

export default AppRouter