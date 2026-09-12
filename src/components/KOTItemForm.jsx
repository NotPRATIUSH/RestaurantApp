function KOTItemForm({
  menuItems,
  selectedItem,
  setSelectedItem,
  quantity,
  setQuantity,
  addItem,
}) {
  return (
    <>
      <h2>Add Item</h2>

      <div>
        <label>
          Select Item:{' '}

          <select
            value={selectedItem}
            onChange={(e) =>
              setSelectedItem(e.target.value)
            }
          >
            <option value="">
              -- Select Item --
            </option>

            {menuItems.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name} - Rs. {item.price}
              </option>
            ))}
          </select>
        </label>
      </div>

      <br />

      <div>
        <label>
          Quantity:{' '}

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
          />
        </label>
      </div>

      <br />

      <button onClick={addItem}>
        Add Item
      </button>
    </>
  )
}

export default KOTItemForm