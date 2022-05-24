import { atom, selector } from "recoil";

export const userState = atom({
  key: 'user',
  default: localStorage.getItem('user'),
});

export const currentUser = selector({
  key: 'currentUser',
  get: ({ get }) => {
    const user = get(userState)
    return user
  }
})

export const login = (cart, product) => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex(x => x.id === product.id);

  // Increase quantity if existing
  if (foundIndex >= 0) {
    newCart[foundIndex] = {
      ...cart[foundIndex],
      quantity: cart[foundIndex].quantity + 1,
    };
    return newCart;
  }

  // Add new item
  newCart.push({
    product,
    id: product.id,
    quantity: 1,
  });
  return newCart;
}