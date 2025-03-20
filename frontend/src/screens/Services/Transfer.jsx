import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Transfer() {
  const [amount,setAmount] = useState('')
  const [transferTo, setTransferTo] = useState('')
  const customerID = useSelector(state => state.custID)
  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post(`http://localhost:8080/${customerID}/transfer/${transferTo}`)
    .then()
  }
  return (
    <div class="main-content">
      <div class="content-section">
        <h2>Transfer</h2>
        <p>Securely transfer funds from your account with our NetBanking platform.</p>
        <form class="login-form" onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="transfer-amount">Transfer Amount</label>
            <input type="number" id="transfer-amount" name="transfer-amount" placeholder="Enter Transfer Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} required />
          </div>
          <div class="form-group">
            <label for="transfer-to">Transfer To</label>
            <input type="text" id="transfer-to" name="transfer-to" placeholder="Enter Transfer To" value={transferTo} onChange={(e)=>setTransferTo(e.target.value)} required />
          </div>
          <button type="submit" class="btn btn-primary">
            Transfer
          </button>
        </form>
      </div>
    </div>
  )
}

export default Transfer
