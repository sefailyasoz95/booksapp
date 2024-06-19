import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./Utils/Redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import BookDetailPage from "./Pages/BookDetailPage";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import Navbar from "./Components/Navbar";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path={`/`} element={<HomePage />} />
					<Route path={`/book/:bookTitle`} element={<BookDetailPage />} />
					<Route path={`/shopping-cart`} element={<ShoppingCartPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer
				position='top-right'
				autoClose={3000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				pauseOnHover
				theme='dark'
				transition={Slide}
			/>
		</Provider>
	);
}

export default App;
