# Saffron House — Digital Menu Demo

A mobile-first, high-end digital restaurant menu experience designed with the visual language of a luxury product launch (sneakers, watches, high-craft objects). Built for modern dining establishments offering QR-code table browsing and direct WhatsApp ordering.

---

## ✦ Key Features

- **2.5D Product Launch Showcase**: Interactive 2.5D mouse-follow depth perspective, layered ambient shadows, floating spec chips, and smooth mobile float animation.
- **Instagram Follower 10% Discount System**: Prompts guests to follow the restaurant's official Instagram page while ordering. Once followed, automatically deducts 10% from the bill, records their handle for kitchen cross-check, and includes the discount in the final WhatsApp order slip.
- **Exit-Intent Google Review Prompt**: Detects desktop exit intent (mouse leaving window top) or mobile back navigation, gracefully presenting a 5-star rating dialog and direct link to write a Google Review.
- **Direct WhatsApp Ordering**: Fully formatted digital order slip with itemized dishes, quantities, table number/takeaway selection, and total calculations sent directly to WhatsApp without requiring user login or account creation.
- **Editorial Chef's Selection**: Curated best-sellers with quotes from the Executive Culinary Director and high-contrast photography.
- **Categorized Digital Catalog**: Signature Dishes, Starters, Mains, Biryani & Rice, Breads, Desserts, and Beverages with instant live search and dietary filters (Vegetarian, Gluten-Free, Signatures).
- **Interactive Product Modal**: In-depth ingredient breakdowns, spice gauge, allergen warnings, portion size, and instant ordering.
- **Mobile-First Responsive Design**: Optimized thumb navigation adhering to sticky surface governance (<15% viewport height).

---

## ✦ How to Customize This Menu

All restaurant information, branding, prices, and menu items are centralized in a single configuration file:
👉 `src/data/menuData.ts`

### 1. Change Restaurant Name & Branding
Open `src/data/menuData.ts` and modify the `restaurantInfo` object:

```typescript
export const restaurantInfo: RestaurantInfo = {
  name: "Your Restaurant Name",
  monogram: "YR",
  tagline: "Taste, presented differently.",
  location: "Mayfair, London",
  // ...
};
```

### 2. Change the WhatsApp Number
Update the `whatsappNumber` field (use international format without `+` or spaces):

```typescript
// Example: "918956528026"
whatsappNumber: "918956528026",
displayWhatsApp: "+91 89565 28026",
```

### 3. Change Currency & Pricing
Update the currency symbol and dish prices:

```typescript
currency: "GBP", // or "USD", "EUR", "INR"
currencySymbol: "£", // or "$", "€", "₹"
```

To adjust dish prices, edit the `price` field in each dish in `menuItems`:
```typescript
{
  id: 'dish-1',
  name: 'Signature Butter Chicken',
  price: 26.00, // Update price here
  // ...
}
```

### 4. Change Images
- Generated dishes are stored in `src/assets/images/`.
- To swap an image, replace the file or import your custom image into `src/data/menuData.ts`:

```typescript
import myDishImage from '../assets/images/my_dish.jpg';

// In menuItem:
image: myDishImage,
```

### 5. Add or Modify Menu Items
Add any new item to the `menuItems` array in `src/data/menuData.ts`:

```typescript
{
  id: 'dish-new',
  name: 'Smoked Dal Makhani',
  hindiName: 'Dal Bukhara Royale',
  category: 'mains', // 'signature' | 'starters' | 'mains' | 'biryani' | 'breads' | 'desserts' | 'beverages'
  price: 18.00,
  description: 'Slow-simmered whole urad lentils infused with roasted garlic and churned white butter.',
  ingredients: ['Urad lentils', 'Heritage tomato coulis', 'White butter', 'Kashmiri chili'],
  allergens: ['Dairy'],
  spiceLevel: 1, // 0 = None, 1 = Mild, 2 = Medium, 3 = Fiery
  isVegetarian: true,
  isGlutenFree: true,
  isSignature: false,
  serves: 'Serves 1–2',
  prepTime: '24h Simmered',
  floatingSpecs: ["24h Embers", "Cultured Butter", "Vegetarian"],
  image: butterChickenImg,
}
```

### 6. Change Brand Colors
The brand colors are configured in `src/index.css` via Tailwind CSS theme variables:
- Deep Charcoal: `#0A0C0F`, `#0E1116`, `#14171D`
- Warm Ivory: `#F6F2E9`, `#FCFAF6`
- Saffron Orange: `#E26421`, `#C75214`
- Metallic Gold: `#C29E65`, `#D8B781`

To change primary accents (e.g. from saffron orange to another signature color), search for `#E26421` and replace with your brand hue.

---

## ✦ Technical Stack

- **React 19** with **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Lucide React** (icons)
- **CSS 3D Transforms** for lightweight 2.5D product tilt and floating physics without WebGL overhead.
