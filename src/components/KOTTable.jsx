function KOTTable({
  orderItems,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
}) {
  return (
    <>
      <h2>Current KOT</h2>

      {orderItems.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
        >
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orderItems.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.name}
                </td>

                <td>
                  Rs. {item.price}
                </td>

                <td>
                  <button
                    onClick={() =>
                      decreaseQuantity(index)
                    }
                  >
                    -
                  </button>

                  {' '}

                  {item.quantity}

                  {' '}

                  <button
                    onClick={() =>
                      increaseQuantity(index)
                    }
                  >
                    +
                  </button>
                </td>

                <td>
                  Rs. {item.total}
                </td>

                <td>
                  <button
                    onClick={() =>
                      removeItem(index)
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default KOTTable