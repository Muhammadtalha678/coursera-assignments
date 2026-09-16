import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CheckCircle2, ShieldCheck } from 'lucide-react';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const total = cartItems.reduce((sum, item) => {
      const priceNumeric = parseFloat(String(item.cost).replace('$', '')) || 0;
      return sum + priceNumeric * item.quantity;
    }, 0);
    return total.toFixed(2);
  };

  // Calculate subtotal for an individual item
  const calculateTotalCost = (item) => {
    const priceNumeric = parseFloat(String(item.cost).replace('$', '')) || 0;
    return (priceNumeric * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If decrementing from 1, prompt removal
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    setCheckoutModalOpen(true);
  };

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">Your Shopping Cart</h1>
          <p className="text-stone-500 text-sm mt-1">
            {totalItemCount === 0
              ? 'Your cart is currently empty'
              : `${totalItemCount} plant${totalItemCount > 1 ? 's' : ''} in your sanctuary collection`}
          </p>
        </div>

        <button
          id="continue-shopping-top-btn"
          onClick={onContinueShopping}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 mt-6 px-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-medium text-stone-800">Your basket is waiting for greenery</h2>
          <p className="text-stone-500 text-sm max-w-md mx-auto mt-2 mb-6">
            Explore our curated categories of air-purifying, aromatic, and low-maintenance indoor plants to find your perfect match.
          </p>
          <button
            id="empty-cart-browse-btn"
            onClick={onContinueShopping}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-full transition-colors shadow-sm cursor-pointer"
          >
            Browse Houseplants
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Item List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.name}
                id={`cart-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-stone-200 shadow-xs hover:border-emerald-200 transition-colors"
              >
                {/* Thumbnail & Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-stone-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-900 text-base sm:text-lg">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">Unit Price:</span>
                      <span className="text-sm font-semibold text-emerald-700">{item.cost}</span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-stone-500 mt-1 line-clamp-1 max-w-xs">{item.description}</p>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Item Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 overflow-hidden">
                    <button
                      id={`dec-qty-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => handleDecrement(item)}
                      aria-label="Decrease quantity"
                      className="p-1.5 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span
                      id={`qty-count-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 text-sm font-semibold text-stone-800 min-w-[2rem] text-center"
                    >
                      {item.quantity}
                    </span>
                    <button
                      id={`inc-qty-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => handleIncrement(item)}
                      aria-label="Increase quantity"
                      className="p-1.5 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[5rem]">
                    <span className="text-xs text-stone-400 block sm:hidden">Total</span>
                    <span className="text-base sm:text-lg font-bold text-stone-900">
                      ${calculateTotalCost(item)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    id={`delete-btn-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleRemove(item)}
                    aria-label={`Remove ${item.name} from cart`}
                    title="Remove item"
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Back button at bottom */}
            <div className="pt-4">
              <button
                id="continue-shopping-bottom-btn"
                onClick={onContinueShopping}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 font-medium rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sticky top-24 shadow-xs">
              <h2 className="text-xl font-bold font-serif text-stone-900 pb-4 border-b border-stone-100">
                Order Summary
              </h2>

              <div className="space-y-3 py-4 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Total Items</span>
                  <span className="font-semibold text-stone-900">{totalItemCount}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Standard Nursery Shipping</span>
                  <span className="text-emerald-700 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Eco-Packaging</span>
                  <span className="text-emerald-700 font-medium">Complimentary</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-between items-baseline mb-6">
                <div>
                  <span className="text-base font-medium text-stone-800">Total Cart Amount</span>
                  <p className="text-xs text-stone-400">Includes all applicable nursery taxes</p>
                </div>
                <span id="cart-total-amount" className="text-2xl sm:text-3xl font-bold text-emerald-800">
                  ${calculateTotalAmount()}
                </span>
              </div>

              <button
                id="checkout-btn"
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl shadow-md transition-all transform active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Checkout</span>
              </button>

              <div className="mt-4 flex items-center gap-2 text-xs text-stone-500 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Secure plant checkout & 14-day health guarantee</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal / Notification */}
      {checkoutModalOpen && (
        <div
          id="checkout-modal-overlay"
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={() => setCheckoutModalOpen(false)}
        >
          <div
            id="checkout-modal"
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 text-center relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Coming Soon!</h3>
            <p className="text-stone-600 text-sm mb-6 leading-relaxed">
              Online checkout is currently in private preview. Our nursery team is integrating sustainable cold-pack delivery channels to ensure your plants arrive in pristine botanical condition.
            </p>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-left mb-6 text-xs text-stone-600">
              <div className="font-semibold text-stone-800 mb-1">Order Prepared:</div>
              <div>{totalItemCount} plants ready for delivery (${calculateTotalAmount()})</div>
            </div>
            <button
              id="close-checkout-modal-btn"
              onClick={() => setCheckoutModalOpen(false)}
              className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Back to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
