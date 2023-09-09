import { toast, TypeOptions } from 'react-toastify';

const showToast = (msg: string, type: TypeOptions) => {
	toast(msg, {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		progress: undefined,
		theme: 'light',
		type,
	});
};

const showSuccess = (msg: string) => {
	console.log(msg, "msg");
	showToast(msg, 'success');
};

const showError = (msg: string) => {
	showToast(msg, 'error');
};

export { showToast, showSuccess, showError };