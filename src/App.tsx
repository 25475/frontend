import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingCart from './components/FloatingCart'
import { FlyingProductProvider } from './contexts/FlyingProductContext'
import { CartProvider } from './contexts/CartContext'
import Home from './pages/home/Home'
import Nosotros from './pages/Nosotros'
import Vizion from './pages/Vizion'
import Novatek from './pages/Novatek'
import Sobre from './pages/Sobre'
import Planes from './pages/Planes'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

export default function App(){
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isPlanes = location.pathname === '/planes'
  const isVizion = location.pathname === '/vision'
  const isNovatek = location.pathname === '/novatec'
  const isNosotros = location.pathname === '/nosotros'

  return (
    <CartProvider>
      <FlyingProductProvider>
        <div className="min-h-screen flex flex-col">
          <Header isHome={isHome} isPlanes={isPlanes} isVizion={isVizion} isNovatek={isNovatek} isNosotros={isNosotros} />
          <main className={`flex-1 ${(isHome || isPlanes || isVizion || isNovatek || isNosotros) ? '' : 'pt-20'}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/vision" element={<Vizion />} />
              <Route path="/novatec" element={<Novatek />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/planes" element={<Planes />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
          
          {/* Carrito flotante - solo aparece cuando hay productos y estás en páginas de productos */}
          <FloatingCart />
        </div>
      </FlyingProductProvider>
    </CartProvider>
  )
}
