import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home  from './screens/Home'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import About from './screens/About'
import NetbankingLogin from './screens/Netbanking/NetbankingLogin'
import NetbankingSignup from './screens/Netbanking/NetbankingSignup'
import Services from './screens/Services/Services'
import Balance from './screens/Services/Balance'
import Contact from './screens/Contact'
import { Provider } from 'react-redux';
import store from './reduxContainer/Store';
import Transfer from './screens/Services/Transfer'
import MiniStatement from './screens/Services/MiniStatement'
import ForgotPassword from './screens/Netbanking/ForgotPassword'
import ChangePassword from './screens/Netbanking/ChangePassword'
import AdminDashboard from './screens/Admin/AdminDashboard'

function App() {

  return (
    <>
    <Provider store={store}>
        <Header />
        <div style={{ display: 'flex', height:'max-content' }}>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/netbanking/login" element={<NetbankingLogin/>} />
            <Route path="/netbanking/forgot-password" element={<ForgotPassword />} />
            <Route path="/netbanking/change-password" element={<ChangePassword />} />
            <Route
              path="/admin-dashboard/*"
              element={
                  <AdminDashboard />
              }
            />
            <Route path="/services" element={<Services/>} />
            <Route path="/services/balance" element={<Balance />} />
            <Route path="/services/transfer" element={<Transfer />} />
            <Route path="/services/mini-statement" element={<MiniStatement />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/netbanking/signup" element={<NetbankingSignup/>} />
          </Routes>
        </div>
        <Footer />
      </Provider>
    </>
  )
  
}

export default App
