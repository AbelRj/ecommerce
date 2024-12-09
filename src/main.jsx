import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router'
import "./styles/index.css"

import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/userContext'

createRoot(document.getElementById('root')).render(
    <CartProvider>
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    </CartProvider>


)
