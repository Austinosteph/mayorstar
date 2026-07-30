import { CartItem, Product } from "@/types/product";

export const STORE_PHONE_NUMBER = "2348123456789";
export const STORE_NAME = "MayorStar Gadget Store";

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function getSingleProductWhatsAppUrl(product: Product, quantity: number = 1): string {
  const itemTotal = product.price * quantity;
  const message = `Hello *${STORE_NAME}* 👋,

I want to place an order for the following item:

🛍️ *Product:* ${product.name}
🏷️ *Brand:* ${product.brand}
💵 *Unit Price:* ${formatPrice(product.price)}
🔢 *Quantity:* ${quantity}
✨ *Total Amount:* ${formatPrice(itemTotal)}

📌 *Category:* ${product.category}

Please confirm stock availability and pickup/delivery options. Thank you!`;

  return `https://wa.me/${STORE_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getCartWhatsAppUrl(items: CartItem[], totalPrice: number): string {
  if (items.length === 0) return `https://wa.me/${STORE_PHONE_NUMBER}`;

  const itemLines = items
    .map((item, index) => {
      const lineTotal = item.product.price * item.quantity;
      return `${index + 1}. *${item.product.name}*\n   Qty: ${item.quantity} × ${formatPrice(item.product.price)} = *${formatPrice(lineTotal)}*`;
    })
    .join("\n\n");

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const message = `Hello *${STORE_NAME}* 👋,

I would like to complete an order for the items in my cart:

${itemLines}

📌 *Order Summary:*
------------------------------
📦 *Total Items:* ${totalItemsCount}
💰 *Total Order Amount:* *${formatPrice(totalPrice)}*
🚚 *Delivery:* Free Store Pickup Available

Please confirm my order and let me know the next steps for delivery or store pickup!`;

  return `https://wa.me/${STORE_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
