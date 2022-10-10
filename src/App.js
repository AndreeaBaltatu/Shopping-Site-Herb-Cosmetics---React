import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "./components";
import {
  NotFound,
  Home,
  ProductList,
  ProductDetails,
  Auth,
  AuthContextProvider,
  AddProduct,
  EditProduct,
  UserProfile,
  EditProfile,
  Contact,
  Recenzii,
} from "./features";
import { ShoppingCart } from "./features/Products/ShoppingCart";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recenzii" element={<Recenzii />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:productId" element={<EditProduct />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
export { App };
