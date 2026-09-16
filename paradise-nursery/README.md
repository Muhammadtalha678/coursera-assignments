# Paradise Nursery Shopping Application

A modern, responsive e-commerce web application for **Paradise Nursery**, an online houseplant sanctuary. This project enables plant lovers to explore curated botanical categories, inspect indoor houseplant details, dynamically manage a shopping cart with real-time price and quantity calculations, and prepare orders for delivery.

---

## Project Overview

**Paradise Nursery** specializes in hand-nurtured indoor houseplants designed to bring living calm, air purification, and aromatic vitality into everyday homes and workplaces.

### Key Highlights & Grading Criteria Checklist

- [x] **README.md**: Complete project documentation with project name, architecture, and feature overview.
- [x] **AboutUs.jsx**: Dedicated company overview highlighting Paradise Nursery's botanical heritage, eco-friendly practices, and healthy plant guarantee.
- [x] **App.css**: Full stylesheet implementing the botanical greenhouse background image for the Paradise Nursery landing page, glassmorphism overlays, and responsive layout styling.
- [x] **App.jsx**: The main landing page showcasing the company name ("Paradise Nursery"), tagline ("Where Green Meets Serenity"), company about section, and interactive "Get Started" button transitioning into the plant catalog.
- [x] **CartSlice.jsx**: Redux Toolkit slice managing shopping cart state (`items: []`) with actions:
  - `addItem`: Adds plant item to the cart or increments count.
  - `removeItem`: Removes a plant item from the cart.
  - `updateQuantity`: Updates an item's quantity, removing it if reduced to zero.
- [x] **ProductList.jsx**:
  - Displays 3 curated plant categories:
    1. **Air Purifying Plants** (6 unique varieties: Snake Plant, Spider Plant, Peace Lily, Boston Fern, Rubber Plant, Aloe Vera)
    2. **Aromatic & Fragrant Plants** (6 unique varieties: English Lavender, Rosemary Herb, Peppermint, Star Jasmine, Lemon Balm, Eucalyptus Baby Blue)
    3. **Low Maintenance & Succulents** (6 unique varieties: ZZ Plant, Golden Pothos, Jade Plant, Cast Iron Plant, Echeveria Elegans, Zebra Haworthia)
  - Each plant item contains a thumbnail photo, name, description, and price.
  - "Add to Cart" button that adds the item, disables itself upon addition (showing "Added to Cart"), and increments the cart counter.
  - Top navigation bar visible across Product Listing and Cart pages with links to Home, Plants, and Cart.
  - Dynamic cart icon showing the real-time total quantity of items.
- [x] **CartItem.jsx**:
  - Displays the shopping cart page with thumbnail, plant name, unit price, quantity controls (+ and -), and subtotal per plant.
  - Dynamically calculates and displays the total cart amount for all plants.
  - Delete button for each plant item to remove it from the cart (which re-enables the "Add to Cart" button in the catalog).
  - "Checkout" button displaying a "Coming Soon" notification modal.
  - "Continue Shopping" button returning the user to the plant listing page.

---

## File Structure

```text
├── README.md              # Project overview and grading criteria mapping
├── index.html             # Application entry point with metadata
├── package.json           # Dependencies and build scripts
├── src/
│   ├── AboutUs.jsx        # Company background and mission details
│   ├── App.css            # Stylesheet containing landing page background image
│   ├── App.jsx            # Landing page with hero banner & "Get Started"
│   ├── CartSlice.jsx      # Redux Toolkit slice for cart state management
│   ├── ProductList.jsx    # Plant catalog with 3 categories & 18 plants + Navbar
│   ├── CartItem.jsx       # Shopping Cart view with live totals & controls
│   ├── store.js           # Redux store configuration
│   ├── main.tsx           # React entry point with Redux Provider
│   └── index.css          # Global Tailwind CSS imports
```

---

## Technologies Used

- **React 19**: Modern component-driven UI architecture
- **Redux Toolkit & React-Redux**: Centralized shopping cart state management
- **Tailwind CSS v4**: Utility-first responsive styling
- **Lucide React**: Clean botanical and e-commerce iconography
- **Vite**: Ultra-fast build and development tooling

---

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```
