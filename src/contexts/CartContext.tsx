import React, { createContext, useContext, useState, type ReactNode } from "react";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  imageSrc: string;
};

export type CartItem = Product & { qty: number };

type CartContextType = {
  items: CartItem[];
  addToCart: (p: Product) => void;
  removeOne: (id: number) => void;
  removeAll: (id: number) => void;
  clearCart: () => void;
  formatCLP: (n: number) => string;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (p: Product) => {
    setItems((prev) => {
      const exist = prev.find((e) => e.id === p.id);
      if (!exist) {
        return [...prev, { ...p, qty: 1 }];
      } else {
        return prev.map((e) =>
          e.id === p.id ? { ...e, qty: e.qty + 1 } : e
        );
      }
    });
  };

  const removeOne = (id: number) => {
    setItems((prev) => {
      const producto = prev.find((x) => x.id === id);
      if (!producto) return prev;
      if (producto.qty === 1) {
        return prev.filter((x) => x.id !== id);
      }
      return prev.map((x) =>
        x.id === id ? { ...x, qty: x.qty - 1 } : x
      );
    });
  };

  const removeAll = (id: number) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const clearCart = () => setItems([]);

  const formatCLP = (n: number) =>
    n.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    });

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeOne,
        removeAll,
        clearCart,
        formatCLP,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("Error: useCart debe usarse dentro de CartProvider");
  return ctx;
};