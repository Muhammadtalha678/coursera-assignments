import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';
import { ShoppingBag, Sprout, Home, Check, Sparkles } from 'lucide-react';

export const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      {
        name: 'Snake Plant',
        image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80',
        description: 'Produces oxygen at night, effectively cleansing indoor air toxins and formaldehyde.',
        cost: '$18',
      },
      {
        name: 'Spider Plant',
        image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=600&q=80',
        description: 'Graceful cascading foliage that filters carbon monoxide and household impurities.',
        cost: '$15',
      },
      {
        name: 'Peace Lily',
        image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80',
        description: 'Serene white blooms that naturally filter benzene, acetone, and airborne spores.',
        cost: '$22',
      },
      {
        name: 'Boston Fern',
        image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80',
        description: 'Rich feathery frills that act as natural humidifiers while purifying the surrounding air.',
        cost: '$16',
      },
      {
        name: 'Rubber Plant',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
        description: 'Glossy broad foliage that captures dust particles and balances room moisture.',
        cost: '$25',
      },
      {
        name: 'Aloe Vera',
        image: 'https://images.unsplash.com/photo-1567689265664-1c48de61db0b?auto=format&fit=crop&w=600&q=80',
        description: 'Healing succulent that monitors air quality and emits clean nighttime oxygen.',
        cost: '$12',
      },
    ],
  },
  {
    category: 'Aromatic & Fragrant Plants',
    plants: [
      {
        name: 'English Lavender',
        image: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=600&q=80',
        description: 'Fragrant purple blossoms providing soothing, calming botanical relaxation.',
        cost: '$19',
      },
      {
        name: 'Rosemary Herb',
        image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=600&q=80',
        description: 'Woody pine-like aroma known to sharpen cognitive focus and uplift moods.',
        cost: '$14',
      },
      {
        name: 'Peppermint',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
        description: 'Vibrant, refreshing mint scent that deters pests and invigorates indoor spaces.',
        cost: '$12',
      },
      {
        name: 'Star Jasmine',
        image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=600&q=80',
        description: 'Sweet, heavenly floral perfume with delicate star-shaped white flowers.',
        cost: '$24',
      },
      {
        name: 'Lemon Balm',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
        description: 'Zesty lemon scented foliage that naturally repels insects and reduces stress.',
        cost: '$14',
      },
      {
        name: 'Eucalyptus Baby Blue',
        image: 'https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?auto=format&fit=crop&w=600&q=80',
        description: 'Mentholated silver leaves releasing a clean, spa-grade aromatic ambience.',
        cost: '$26',
      },
    ],
  },
  {
    category: 'Low Maintenance & Succulents',
    plants: [
      {
        name: 'ZZ Plant',
        image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=600&q=80',
        description: 'Indestructible waxy leaves that thrive in dim lighting and sporadic waterings.',
        cost: '$25',
      },
      {
        name: 'Golden Pothos',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
        description: 'Fast-trailing heart leaf vine that tolerates low light and drought easily.',
        cost: '$16',
      },
      {
        name: 'Jade Plant',
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
        description: 'Classic succulent tree with fleshy leaves representing resilience and prosperity.',
        cost: '$18',
      },
      {
        name: 'Cast Iron Plant',
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80',
        description: 'Hardy shade-lover that tolerates drafty conditions, dust, and neglect.',
        cost: '$28',
      },
      {
        name: 'Echeveria Elegans',
        image: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=600&q=80',
        description: 'Symmetrical frosted rosette succulent demanding minimal water and lots of sun.',
        cost: '$10',
      },
      {
        name: 'Zebra Haworthia',
        image: 'https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=600&q=80',
        description: 'Compact architectural succulent with striking white horizontal stripes.',
        cost: '$14',
      },
    ],
  },
];

const ProductList = ({ onNavigateHome }) => {
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Dynamic total items count in cart
  const totalItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  // Helper to check if plant is already added
  const isPlantAdded = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Navigation Bar - Appears on both Product Listing and Cart pages */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div
            id="nav-brand"
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-sm group-hover:bg-emerald-800 transition-colors">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-emerald-950 group-hover:text-emerald-800 transition-colors block">
                Paradise Nursery
              </span>
              <span className="text-xs text-stone-500 tracking-wider uppercase font-medium">
                Where Green Meets Serenity
              </span>
            </div>
          </div>

          {/* Nav Links: Home, Plants, Cart */}
          <nav className="flex items-center gap-2 sm:gap-6">
            <button
              id="nav-link-home"
              onClick={onNavigateHome}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-emerald-800 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Home
            </button>

            <button
              id="nav-link-plants"
              onClick={() => setShowCart(false)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                !showCart
                  ? 'text-emerald-900 bg-emerald-50 border border-emerald-200'
                  : 'text-stone-600 hover:text-emerald-800 hover:bg-stone-100'
              }`}
            >
              <Sprout className="w-4 h-4" />
              Plants
            </button>

            {/* Cart Icon with Dynamic Count */}
            <button
              id="nav-link-cart"
              onClick={() => setShowCart(true)}
              aria-label="View shopping cart"
              className={`relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full font-medium transition-all cursor-pointer ${
                showCart
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 border border-stone-200'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">Cart</span>

              {/* Dynamic Badge */}
              <span
                id="nav-cart-count"
                className={`min-w-[1.35rem] h-[1.35rem] text-xs font-bold rounded-full flex items-center justify-center px-1 transition-transform ${
                  showCart
                    ? 'bg-white text-emerald-800'
                    : 'bg-emerald-600 text-white'
                } ${totalItemCount > 0 ? 'scale-100' : 'scale-95'}`}
              >
                {totalItemCount}
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Page Content: Toggle between Cart and Product Listing */}
      <main className="flex-1">
        {showCart ? (
          <CartItem onContinueShopping={() => setShowCart(false)} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Catalog Introduction */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Curated Nursery Collection
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                Explore Our Botanical Varieties
              </h1>
              <p className="text-stone-600 text-base mt-2">
                Hand-nurtured houseplants delivered directly from our greenhouse to brighten, purify, and elevate your indoor spaces.
              </p>
            </div>

            {/* Category Groups */}
            <div className="space-y-16">
              {plantsArray.map((categoryGroup) => (
                <section
                  key={categoryGroup.category}
                  id={`category-${categoryGroup.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="space-y-6"
                >
                  <div className="border-b border-stone-200 pb-3">
                    <h2 className="text-2xl font-serif font-bold text-stone-900 category-heading">
                      {categoryGroup.category}
                    </h2>
                    <p className="text-sm text-stone-500 mt-1">
                      {categoryGroup.plants.length} hand-selected cultivars
                    </p>
                  </div>

                  {/* 6 unique plants grid per category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {categoryGroup.plants.map((plant) => {
                      const added = isPlantAdded(plant.name);
                      const plantIdSlug = plant.name.toLowerCase().replace(/\s+/g, '-');

                      return (
                        <div
                          key={plant.name}
                          id={`plant-card-${plantIdSlug}`}
                          className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-200 transition-all flex flex-col group"
                        >
                          {/* Thumbnail Image */}
                          <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                            <img
                              src={plant.image}
                              alt={plant.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs font-semibold text-emerald-800 px-2.5 py-1 rounded-full text-sm shadow-xs border border-stone-100">
                              {plant.cost}
                            </div>
                          </div>

                          {/* Details & Button */}
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-stone-900 mb-1 group-hover:text-emerald-800 transition-colors">
                                {plant.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed line-clamp-2">
                                {plant.description}
                              </p>
                            </div>

                            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                              <span className="text-base font-bold text-emerald-800">
                                {plant.cost}
                              </span>

                              <button
                                id={`add-to-cart-${plantIdSlug}`}
                                onClick={() => handleAddToCart(plant)}
                                disabled={added}
                                aria-label={added ? `${plant.name} already added to cart` : `Add ${plant.name} to cart`}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                                  added
                                    ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
                                    : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs hover:shadow-sm active:scale-95'
                                }`}
                              >
                                {added ? (
                                  <>
                                    <Check className="w-4 h-4 text-emerald-600" />
                                    <span>Added to Cart</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>Add to Cart</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Subtle Footer */}
      <footer className="mt-20 border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500">
        <p>© Paradise Nursery Inc. All rights reserved. Cultivating living calm for your sanctuary.</p>
      </footer>
    </div>
  );
};

export default ProductList;
