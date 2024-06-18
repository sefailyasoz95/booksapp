import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./Utils/Redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path={`/`} element={<HomePage />} />
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
