import { useState } from 'react'
import menuItems from '../data/menu'

function KOT({ goBack }) {
  const [selectedItem, setSelectedItem] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [orderItems, setOrderItems] = useState([])

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

  return (
    <div>
      <h1>New KOT</h1>

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

      <button onClick={goBack}>Back to Dashboard</button>
    </div>
  )
}

export default KOT