import { useState } from 'react'
import menuItems from '../data/menu'

function KOT({ goBack }) {
  const [kotNumber, setKotNumber] = useState(1)

  const [selectedItem, setSelectedItem] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [orderItems, setOrderItems] = useState([])

  const [discount, setDiscount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('Cash')

  // Stores all saved KOTs
  const [kotHistory, setKotHistory] = useState([])

  const addItem = () => {
    if (!selectedItem) {
      alert('Please select an item')
      return
    }

    const menuItem = menuItems.find(
      (item) => item.id === Number(selectedItem)
    )

    const newItem = {
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: Number(quantity),
      total: menuItem.price * Number(quantity),
    }

    setOrderItems([...orderItems, newItem])

    setSelectedItem('')
    setQuantity(1)
  }

  const removeItem = (indexToRemove) => {
    setOrderItems(
      orderItems.filter((_, index) => index !== indexToRemove)
    )
  }

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.total,
    0
  )

  const finalAmount = Math.max(
    0,
    subtotal - Number(discount)
  )

  const saveKOT = () => {
    if (orderItems.length === 0) {
      alert('Please add at least one item')
      return
    }

    if (Number(discount) > subtotal) {
      alert('Discount cannot be greater than the subtotal')
      return
    }

    const newKOT = {
      kotNumber: kotNumber,
      items: orderItems,
      subtotal: subtotal,
      discount: Number(discount),
      finalAmount: finalAmount,
      paymentMethod: paymentMethod,
    }

    // Add the new KOT to history
    setKotHistory([...kotHistory, newKOT])

    alert(
      `KOT No. ${kotNumber} saved!\nFinal Amount: Rs. ${finalAmount}\nPayment: ${paymentMethod}`
    )

    setKotNumber(kotNumber + 1)
    setOrderItems([])
    setDiscount(0)
    setPaymentMethod('Cash')
  }

  return (
    <div>
      <h1>New KOT</h1>

      <h2>KOT No. {kotNumber}</h2>

      <label>Select Item: </label>

      <select
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
      >
        <option value="">-- Select an item --</option>

        {menuItems.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} - Rs. {item.price}
          </option>
        ))}
      </select>

      <br />
      <br />

      <label>Quantity: </label>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addItem}>Add Item</button>

      <hr />

      <h2>Order</h2>

      {orderItems.map((item, index) => (
        <div key={index}>
          <p>
            {item.name} × {item.quantity} = Rs. {item.total}

            <button onClick={() => removeItem(index)}>
              Remove
            </button>
          </p>
        </div>
      ))}

      <h3>Subtotal: Rs. {subtotal}</h3>

      <label>Discount: Rs. </label>

      <input
        type="number"
        min="0"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />

      <h3>Final Amount: Rs. {finalAmount}</h3>

      <br />

      <label>Payment Method: </label>

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="Cash">Cash</option>
        <option value="QR">QR</option>
        <option value="Card">Card</option>
        <option value="Credit">Credit</option>
      </select>

      <br />
      <br />

      <button onClick={saveKOT}>Save KOT</button>

      <hr />

      <h2>KOT History</h2>

      {kotHistory.length === 0 ? (
        <p>No KOTs saved yet.</p>
      ) : (
        kotHistory.map((kot) => (
          <div key={kot.kotNumber}>
            <h3>KOT #{kot.kotNumber}</h3>

            {kot.items.map((item, index) => (
              <p key={index}>
                {item.name} × {item.quantity} = Rs. {item.total}
              </p>
            ))}

            <p>Subtotal: Rs. {kot.subtotal}</p>
            <p>Discount: Rs. {kot.discount}</p>
            <p>Final Amount: Rs. {kot.finalAmount}</p>
            <p>Payment: {kot.paymentMethod}</p>

            <hr />
          </div>
        ))
      )}

      <button onClick={goBack}>Back to Dashboard</button>
    </div>
  )
}

export default KOT