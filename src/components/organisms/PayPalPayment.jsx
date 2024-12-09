import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useNavigate } from "react-router-dom"
import { PAYPAL_ID } from "../../constans/env"
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const PayPalPayment = ({ value, order }) => {
  const { dispatch } = useContext(CartContext);
  const nav = useNavigate()
  return (
    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_ID,
      }}
    >
      <PayPalButtons
        createOrder={(_, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value,
                },
                custom_id: order.id,
              },
            ],
          })
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((resp) => {
            if (resp.status === "COMPLETED") {
              nav("/pago-exitoso")
              // Vacía el carrito cuando el pago sea exitoso
              dispatch({ type: "CLEAR_CART" });
            } else {
              alert("Tu pado no se procesó. Intenta nuevamente.")
            }
          })
        }}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalPayment