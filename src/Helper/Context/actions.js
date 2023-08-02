import CryptoJS from "crypto-js";
import { BaseUrl } from "../BaseUrl";
import { toastErrorr, toastSuccesss } from "../ToastMessage";

export async function loginUser(dispatch, loginPayload) {

	const { userName, password ,setloading,handleRollIdWiseDashboard } = loginPayload

	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "text/plain");

	let raw = `grant_type=password&Username=${userName}&Password=${password}&ApplicationType=WEB`
   
	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
	};

	try {
		setloading(true)
		dispatch({ type: 'REQUEST_LOGIN' });
		let response = await fetch(`${BaseUrl}/Token`, requestOptions)
		let data = await response.json();
		// console.log(data.Loginmessage);
		// toastSuccesss(data.Loginmessage)

		// console.log(data)

		if (data && data.access_token) {
			dispatch({ type: 'LOGIN_SUCCESS', payload: data });
			setloading(false)
			toastSuccesss(data.Loginmessage)
			handleRollIdWiseDashboard(data)
			
			var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'RangaFulan09').toString();
			try {
				sessionStorage.setItem("Gayatri", ciphertext);
				// toastSuccesss()
			} catch (error) {
				console.error("Error storing data in sessionStorage", error);
			}

			return data;
		} else {
			setloading(false)
			toastErrorr(data.error)
			dispatch({ type: 'LOGIN_ERROR', error: data.errors });
			console.log(data.errors);
			return;
		}
	}
	catch (error) {
		setloading(false)
		dispatch({ type: 'LOGIN_ERROR', error: error });
		toastErrorr('Something went wrong !')
		console.log(error);
	}
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
	sessionStorage.removeItem('Gayatri');
}
