import { useState } from 'react'
import menuItems from '../data/menu'

function KOT({ goBack }) {
  const [kotNumber, setKotNumber] = useState(1)

  const [selectedItem, setSelectedItem] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [orderItems, setOrderItems] = useState([])

  const [discount, setDiscount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('Cash')

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

      <br />
      <br />

      <button onClick={goBack}>Back to Dashboard</button>
    </div>
  )
}

export default KOT