import axios, { AxiosResponse } from 'axios';

//  Todo setup envs
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const covidApiBaseUrl = import.meta.env.VITE_API_COVID_URL;

axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// checkQueryAuth(error)
		return Promise.reject(error);
	}
);

const getHeaders = () => {
	return {
		authorization: `Bearer token`,
	};
};

const api = {
	/* T - Response; S - Request */
	get: <T>(url: string, params?: object, isCovidRequest = false) =>
		axios.get<T>(
			(isCovidRequest ? covidApiBaseUrl : apiBaseUrl) + url,
			{
				headers: getHeaders(),
				...params,
			}
		),
	post: <T, S>(url: string, data: S, isCovidRequest = false) =>
		axios.post<T, AxiosResponse<T>, S>(
			(isCovidRequest ? covidApiBaseUrl : apiBaseUrl) + url,
			data,
			{
				headers: getHeaders(),
			}
		),
	patch: <T, S>(url: string, data: S, isCovidRequest = false) =>
		axios.patch<T, AxiosResponse<T>, S>(
			(isCovidRequest ? covidApiBaseUrl : apiBaseUrl) + url,
			data,
			{
				headers: getHeaders(),
			}
		),
	put: <T, S>(url: string, data: S, isCovidRequest = false) =>
		axios.put<T, AxiosResponse<T>, S>(
			(isCovidRequest ? covidApiBaseUrl : apiBaseUrl) + url,
			data,
			{
				headers: getHeaders(),
			}
		),
	delete: <T, S>(url: string, data?: S, isCovidRequest = false) =>
		axios.delete<T, AxiosResponse<T>, S>(
			(isCovidRequest ? covidApiBaseUrl : apiBaseUrl) + url,
			{
				headers: getHeaders(),
				data,
			}
		),
};

export { api, apiBaseUrl, covidApiBaseUrl };
