import React, { useState } from 'react';
import imgHermes from './assets/terre.png';
import imgMontblanc from './assets/Montblanc.png';
import imgMykonos from './assets/Mykonos.png';
import imgYSL from './assets/YSL.png';

// --- MOCK DATA ---
const products = [
  {
    id: 1,
    name: "Terre d'Hermès",
    brand: "Hermès",
    notes: "Woody, Citrus",
    price: "2100000",
    priceDisplay: "Rp 2.100.000",
    img: imgHermes
  },
  {
    id: 2,
    name: "Explorer",
    brand: "Montblanc",
    notes: "Fresh, Aromatic",
    price: "1450000",
    priceDisplay: "Rp 1.450.000",
    img: imgMontblanc
  },
  {
    id: 3,
    name: "Matcha Latte",
    brand: "Mykonos",
    notes: "Gourmand, Sweet",
    price: "299000",
    priceDisplay: "Rp 299.000",
    img: imgMykonos
  },
  {
    id: 4,
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    notes: "Gourmand, Vanilla",
    price: "2450000",
    priceDisplay: "Rp 2.450.000",
    img: imgYSL
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true); 
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + parseInt(item.price), 0);
    return `Rp ${total.toLocaleString('id-ID')}`;
  };

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.notes.includes(activeCategory));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-semibold tracking-wider text-slate-900">AURA<span className="text-amber-600">.</span></h1>
          <ul className="hidden md:flex space-x-8 text-sm font-medium">
            <li><a href="#home" className="hover:text-amber-600 transition">Home</a></li>
            <li><a href="#catalog" className="hover:text-amber-600 transition">Catalog</a></li>
            <li><a href="#about" className="hover:text-amber-600 transition">About</a></li>
          </ul>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm hover:bg-amber-600 transition duration-300"
          >
            Cart ({cartItems.length})
          </button>
        </div>
      </nav>

      {/* CART SIDEBAR / DRAWER */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-serif font-semibold">Shopping Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-900 text-2xl leading-none">&times;</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center text-slate-500 mt-20">
              <p>Keranjang kamu masih kosong.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-4 text-amber-600 hover:underline"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cartItems.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <img src={item.img} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-500 mb-1">{item.brand}</p>
                    <p className="text-sm font-medium">{item.priceDisplay}</p>
                  </div>
                  <button 
                    onClick={() => handleRemoveFromCart(index)}
                    className="text-red-400 hover:text-red-600 text-sm font-medium h-fit"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-slate-600">Total:</span>
              <span className="font-bold text-xl text-slate-900">{calculateTotal()}</span>
            </div>
            <button className="w-full bg-slate-900 text-white py-3 rounded-full hover:bg-amber-600 transition font-medium">
              Checkout Sekarang
            </button>
          </div>
        )}
      </div>

      {/* HERO SECTION */}
      <section id="home" className="pt-32 pb-20 px-6 lg:px-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-amber-600 font-semibold tracking-widest text-sm uppercase">Pancarkan Pesonamu</span>
          <h2 className="text-5xl lg:text-7xl font-serif font-semibold leading-tight text-slate-900">
            Discover Your <br /> Signature <i className="text-amber-600">Scent</i>.
          </h2>
          <p className="text-slate-500 text-lg max-w-md leading-relaxed">
            Dari aroma citrus yang menyegarkan hingga kehangatan manisnya gourmand. Temukan parfum yang merepresentasikan dirimu.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <a href="#catalog" className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-amber-600 transition duration-300 shadow-lg hover:shadow-amber-600/30 text-center">
              Shop Collection
            </a>
            <a href="#about" className="border border-slate-300 px-8 py-3 rounded-full hover:border-slate-900 transition text-center inline-block">
              Explore Brands
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-amber-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <img 
            src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80" 
            alt="Luxury Perfume" 
            className="relative z-10 rounded-2xl shadow-2xl object-cover h-[500px] w-full"
          />
        </div>
      </section>

      {/* CATALOG SECTION */}
      <section id="catalog" className="bg-white py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-semibold mb-4 text-slate-900">Featured Collection</h2>
            <p className="text-slate-500">Koleksi parfum pilihan sesuai selera eksklusifmu.</p>
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex justify-center space-x-4 mb-10 overflow-x-auto pb-4">
            {['All', 'Citrus', 'Gourmand', 'Woody', 'Fresh'].map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full border text-sm font-medium transition ${
                  activeCategory === category 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                {/* 1. Hapus p-8 (padding) dan bg-slate-50 agar gambar bisa menyentuh ujung bingkai */}
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/5] bg-slate-200 shadow-sm border border-slate-200">
                  {/* Tag img sekarang sudah bersih dari komentar di dalamnya */}
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="object-cover w-full h-full group-hover:scale-110 transition duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleAddToCart(product);
                      }}
                      className="w-full bg-white text-slate-900 py-3 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition shadow-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-amber-600 font-semibold tracking-widest uppercase mb-1">{product.brand}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                  <p className="text-sm text-slate-500 mb-2">{product.notes}</p>
                  <p className="font-medium text-slate-900">{product.priceDisplay}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="bg-slate-50 py-20 px-6 lg:px-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-amber-600 font-semibold tracking-widest text-sm uppercase mb-2 block">Tentang Kami</span>
          <h2 className="text-3xl lg:text-4xl font-serif font-semibold mb-6 text-slate-900">Kurasi Aroma Eksklusif untuk Identitas Unikmu</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            AURA Perfumery hadir sebagai kurator utama untuk berbagai pilihan parfum terbaik. Kami menyeleksi setiap produk dengan hati-hati, menghadirkan koleksi dari *brand* ternama internasional seperti Yves Saint Laurent, Hermès, dan Montblanc, hingga mahakarya lokal yang luar biasa seperti Mykonos. Jelajahi dan temukan karakter aslimu melalui setiap semprotan.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-12 text-center">
        <h2 className="text-2xl font-serif text-white mb-4">AURA.</h2>
        <p className="text-sm mb-6">Membawa aroma eksklusif ke keseharianmu.</p>
        <p className="text-xs opacity-50">&copy; {new Date().getFullYear()} Aura Perfumery. All rights reserved.</p>
      </footer>
    </div>
  );
}