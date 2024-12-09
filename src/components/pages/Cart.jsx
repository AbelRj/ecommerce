

import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import SummaryItem from "../atoms/SummaryItem"
import axios from "axios"
import { API_URL } from "../../constans/env"
import { token } from "../../helpers/auth"
import PayPalPayment from "../organisms/PayPalPayment"



function Cart() {
  const { state } = useContext(CartContext)
  const [order,setOrder] = useState()
  const [error, setError] = useState()


  let value = 0
  state.cart.forEach((c) => (value += c.price))

  const handleOrder = () =>{

    const products =state.cart.map(p=>{
      return{
        product_id: p.id,
            amount: 1,
						unit_price: p.price

      }
    })

    const data = {
      products
    }

    axios.post(`${API_URL}/private/purchase-orders`,data,{
      headers:{
        Authorization:`Bearer ${token()}`,
      }
    }).then (resp =>{
      setOrder(resp.data.data)
      console.log(resp)
    }) .catch((err) => {
      const message =
        err.response?.data?.message || "Debe de iniciar sesion para generar la compra";
      setError(message);
    });
  }

  return (
    <div className="max-w-256 m-auto">
      <div className="grid grid-cols-3 gap-8 mb-16">
        <section className="col-span-2 pt-10">
          <h1 className="text-3xl font-semibold mb-6">Carrito de compras</h1>
          {state?.cart?.length > 0 ? (
            <div>
              <div className="grid mb-2 border-t border-gray-300/60">
                {state.cart.map((prod) => (
                  <SummaryItem key={prod.id} product={prod} />
                ))}
              </div>
              {!order ? (
                <button className="bg-gradient" onClick={handleOrder}>
                  CREAR ORDEN</button>
              ) : (
                
                <>
                <p>ID de la orden de COMPRA: {order.id}</p>
                <PayPalPayment value={value} order={order}/>
                </>
              )

              }

            </div>
          ) : (
            <>
              <p className="mb-2">Tu carrito está vacío</p>
              <Link to="/productos" className="button bg-gradient">
                Ver productos
              </Link>
            </>
          )}
        </section>

      </div>
      {error && (
  <div>
    <p>{error}</p>
  </div>
)}
    </div>
  )
}

export default Cart