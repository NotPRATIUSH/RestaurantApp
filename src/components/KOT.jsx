import { useState } from 'react'
import menuItems from '../data/menu'
import KOTItemForm from './KOTItemForm'
import KOTTable from './KOTTable'

function KOT({ goBack }) {
  // -----------------------------
  // BASIC KOT STATE
  // -----------------------------

  const [kotNumber, setKotNumber] = useState(1)

  const [selectedItem, setSelectedItem] = useState('')
  const [quantity, setQuantity] = useState(1)

  const [orderItems, setOrderItems] = useState([])

  const [discount, setDiscount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('Cash')

  // Stores all saved KOTs
  const [kotHistory, setKotHistory] = useState([])

  // Stores KOT number currently being edited
  const [editingKotNumber, setEditingKotNumber] = useState(null)

  // -----------------------------
  // ADD ITEM
  // -----------------------------

  function addItem() {
    if (!selectedItem) {
      alert('Please select an item')
      return
    }

    if (Number(quantity) <= 0) {
      alert('Quantity must be at least 1')
      return
    }

    const item = menuItems.find(
      (menuItem) => menuItem.id === Number(selectedItem)
    )

    if (!item) {
      alert('Item not found')
      return
    }

    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: Number(quantity),
      total: item.price * Number(quantity),
    }

    setOrderItems([...orderItems, newItem])

    // Reset item selection
    setSelectedItem('')
    setQuantity(1)
  }

  // -----------------------------
  // INCREASE QUANTITY
  // -----------------------------

  function increaseQuantity(index) {
    const updatedItems = orderItems.map((item, itemIndex) => {
      if (itemIndex === index) {
        const newQuantity = item.quantity + 1

        return {
          ...item,
          quantity: newQuantity,
          total: item.price * newQuantity,
        }
      }

      return item
    })

    setOrderItems(updatedItems)
  }

  // -----------------------------
  // DECREASE QUANTITY
  // -----------------------------

  function decreaseQuantity(index) {
    const updatedItems = orderItems.map((item, itemIndex) => {
      if (itemIndex === index) {
        const newQuantity = item.quantity - 1

        // Don't allow quantity to become 0
        if (newQuantity < 1) {
          return item
        }

        return {
          ...item,
          quantity: newQuantity,
          total: item.price * newQuantity,
        }
      }

      return item
    })

    setOrderItems(updatedItems)
  }

  // -----------------------------
  // REMOVE ITEM
  // -----------------------------

  function removeItem(indexToRemove) {
    const updatedItems = orderItems.filter(
      (_, index) => index !== indexToRemove
    )

    setOrderItems(updatedItems)
  }

  // -----------------------------
  // CALCULATIONS
  // -----------------------------

  const subtotal = orderItems.reduce(
    (total, item) => total + item.total,
    0
  )

  const finalAmount = subtotal - Number(discount)

  // -----------------------------
  // RESET CURRENT KOT
  // -----------------------------

  function resetKOT() {
    setOrderItems([])
    setDiscount(0)
    setPaymentMethod('Cash')
    setSelectedItem('')
    setQuantity(1)
  }

  // -----------------------------
  // SAVE NEW KOT
  // -----------------------------

  function saveKOT() {
    if (orderItems.length === 0) {
      alert('Please add at least one item')
      return
    }

    if (Number(discount) < 0) {
      alert('Discount cannot be negative')
      return
    }

    if (Number(discount) > subtotal) {
      alert('Discount cannot be greater than subtotal')
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

    setKotHistory([...kotHistory, newKOT])

    // Move to next KOT number
    setKotNumber(kotNumber + 1)

    // Clear current KOT
    resetKOT()

    alert(`KOT #${kotNumber} saved successfully`)
  }

  // -----------------------------
  // START EDITING KOT
  // -----------------------------

  function editKOT(kot) {
    setEditingKotNumber(kot.kotNumber)

    setOrderItems(kot.items)
    setDiscount(kot.discount)
    setPaymentMethod(kot.paymentMethod)

    // Reset item selector
    setSelectedItem('')
    setQuantity(1)

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // -----------------------------
  // UPDATE EXISTING KOT
  // -----------------------------

  function updateKOT() {
    if (orderItems.length === 0) {
      alert('Please add at least one item')
      return
    }

    if (Number(discount) < 0) {
      alert('Discount cannot be negative')
      return
    }

    if (Number(discount) > subtotal) {
      alert('Discount cannot be greater than subtotal')
      return
    }

    const updatedKOT = {
      kotNumber: editingKotNumber,
      items: orderItems,
      subtotal: subtotal,
      discount: Number(discount),
      finalAmount: finalAmount,
      paymentMethod: paymentMethod,
    }

    const updatedHistory = kotHistory.map((kot) =>
      kot.kotNumber === editingKotNumber
        ? updatedKOT
        : kot
    )

    setKotHistory(updatedHistory)

    // Exit edit mode
    setEditingKotNumber(null)

    // Clear form
    resetKOT()

    alert(`KOT #${editingKotNumber} updated successfully`)
  }

  // -----------------------------
  // CANCEL EDIT
  // -----------------------------

  function cancelEdit() {
    setEditingKotNumber(null)

    resetKOT()
  }

  // -----------------------------
  // SALES SUMMARY
  // -----------------------------

  const totalSales = kotHistory.reduce(
    (total, kot) => total + kot.finalAmount,
    0
  )

  const totalDiscount = kotHistory.reduce(
    (total, kot) => total + kot.discount,
    0
  )

  const totalSubtotal = kotHistory.reduce(
    (total, kot) => total + kot.subtotal,
    0
  )

  const cashSales = kotHistory
    .filter((kot) => kot.paymentMethod === 'Cash')
    .reduce((total, kot) => total + kot.finalAmount, 0)

  const qrSales = kotHistory
    .filter((kot) => kot.paymentMethod === 'QR')
    .reduce((total, kot) => total + kot.finalAmount, 0)

  const cardSales = kotHistory
    .filter((kot) => kot.paymentMethod === 'Card')
    .reduce((total, kot) => total + kot.finalAmount, 0)

  const creditSales = kotHistory
    .filter((kot) => kot.paymentMethod === 'Credit')
    .reduce((total, kot) => total + kot.finalAmount, 0)

  // -----------------------------
  // PAGE
  // -----------------------------

  return (
    <div>
      {/* BACK BUTTON */}

      <button onClick={goBack}>
        ← Back to Dashboard
      </button>

      <h1>
        {editingKotNumber !== null
          ? `Edit KOT #${editingKotNumber}`
          : 'New KOT'}
      </h1>

      {/* KOT NUMBER */}

      <p>
        <strong>KOT Number:</strong>{' '}
        {editingKotNumber !== null
          ? editingKotNumber
          : kotNumber}
      </p>

      {/* ITEM SELECTION */}

      <KOTItemForm
        menuItems={menuItems}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        quantity={quantity}
        setQuantity={setQuantity}
        addItem={addItem}
      />

      <hr />

      {/* CURRENT KOT */}

      <KOTTable
        orderItems={orderItems}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        removeItem={removeItem}
      />

      <br />

      {/* TOTALS */}

      <p>
        <strong>
          Subtotal:
        </strong>{' '}
        Rs. {subtotal}
      </p>

      <div>
        <label>
          Discount: Rs.{' '}

          <input
            type="number"
            min="0"
            value={discount}
            onChange={(e) =>
              setDiscount(e.target.value)
            }
          />
        </label>
      </div>

      <br />

      <p>
        <strong>
          Final Amount:
        </strong>{' '}
        Rs. {finalAmount}
      </p>

      {/* PAYMENT METHOD */}

      <div>
        <label>
          Payment Method:{' '}

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          >
            <option value="Cash">
              Cash
            </option>

            <option value="QR">
              QR
            </option>

            <option value="Card">
              Card
            </option>

            <option value="Credit">
              Credit
            </option>
          </select>
        </label>
      </div>

      <br />

      {/* SAVE / UPDATE */}

      {editingKotNumber !== null ? (
        <div>
          <button onClick={updateKOT}>
            Update KOT
          </button>

          {' '}

          <button onClick={cancelEdit}>
            Cancel Edit
          </button>
        </div>
      ) : (
        <button onClick={saveKOT}>
          Save KOT
        </button>
      )}

      <hr />

      {/* SALES SUMMARY */}

      <h2>Sales Summary</h2>

      <p>
        <strong>
          Total KOTs:
        </strong>{' '}
        {kotHistory.length}
      </p>

      <p>
        <strong>
          Gross Sales:
        </strong>{' '}
        Rs. {totalSubtotal}
      </p>

      <p>
        <strong>
          Total Discount:
        </strong>{' '}
        Rs. {totalDiscount}
      </p>

      <p>
        <strong>
          Net Sales:
        </strong>{' '}
        Rs. {totalSales}
      </p>

      <h3>
        Sales by Payment Method
      </h3>

      <p>
        <strong>
          Cash:
        </strong>{' '}
        Rs. {cashSales}
      </p>

      <p>
        <strong>
          QR:
        </strong>{' '}
        Rs. {qrSales}
      </p>

      <p>
        <strong>
          Card:
        </strong>{' '}
        Rs. {cardSales}
      </p>

      <p>
        <strong>
          Credit:
        </strong>{' '}
        Rs. {creditSales}
      </p>

      <hr />

      {/* KOT HISTORY */}

      <h2>KOT History</h2>

      {kotHistory.length === 0 ? (
        <p>
          No KOTs saved yet.
        </p>
      ) : (
        kotHistory.map((kot) => (
          <div key={kot.kotNumber}>
            <h3>
              KOT #{kot.kotNumber}
            </h3>

            {kot.items.map(
              (item, index) => (
                <p key={index}>
                  {item.name} ×{' '}
                  {item.quantity} = Rs.{' '}
                  {item.total}
                </p>
              )
            )}

            <p>
              <strong>
                Subtotal:
              </strong>{' '}
              Rs. {kot.subtotal}
            </p>

            <p>
              <strong>
                Discount:
              </strong>{' '}
              Rs. {kot.discount}
            </p>

            <p>
              <strong>
                Final Amount:
              </strong>{' '}
              Rs. {kot.finalAmount}
            </p>

            <p>
              <strong>
                Payment:
              </strong>{' '}
              {kot.paymentMethod}
            </p>

            <button
              onClick={() =>
                editKOT(kot)
              }
            >
              Edit KOT
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  )
}

export default KOT