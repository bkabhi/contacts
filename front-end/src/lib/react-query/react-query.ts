import { api } from './api';
import {
	useMutation,
	UseMutationOptions,
	useQuery,
	UseQueryOptions,
} from 'react-query';
import { QueryFunctionContext } from 'react-query/types/core/types';
import isNil from 'lodash/isNil';
import { BaseResponse } from '../../models/base-response';

type QueryKeyT = [string, object | undefined]; // [url, params]

export const fetcher = <T>(
	{ queryKey, pageParam }: QueryFunctionContext<QueryKeyT>,
	isCovidRequest = false
): Promise<T> => {
	const [url, params] = queryKey;
	return api
		.get<T>(url, { params: { ...params, pageParam } }, isCovidRequest)
		.then((res) => res.data);
};

export const useFetch = <T>(
	url: string,
	params?: object,
	config?: UseQueryOptions<T, Error, T, QueryKeyT>,
	isCovidRequest = false
) => {
	const context = useQuery<T, Error, T, QueryKeyT>(
		[url, params],
		({ queryKey }) =>
			fetcher({ queryKey, meta: undefined }, isCovidRequest),
		{
			enabled: !isNil(url) ? true : false,
			...config,
		}
	);

	return context;
};

/* T - Response; S - Request */
export const useAxiosPost = <T extends BaseResponse, S>(
	url: string,
	options?: Omit<UseMutationOptions<T, unknown, S>, 'mutationFn'>,
	isCovidRequest = false
) => {
	return useMutation<T, unknown, S>((data: S) => {
		return api.post<T, S>(url, data, isCovidRequest).then((res) => {
			return res.data;
		});
	}, options);
};

export const useAxiosPatch = <T extends BaseResponse, S>(
	url: string,
	options?: Omit<UseMutationOptions<T, unknown, S>, 'mutationFn'>,
	isCovidRequest = false
) => {
	return useMutation<T, unknown, S>((data: S) => {
		return api.patch<T, S>(url, data, isCovidRequest).then((res) => {
			return res.data;
		});
	}, options);
};

export const useAxiosPut = <T extends BaseResponse, S>(
	url: string,
	options?: Omit<UseMutationOptions<T, unknown, S>, 'mutationFn'>,
	isCovidRequest = false
) => {
	return useMutation<T, unknown, S>((data: S) => {
		return api.put<T, S>(url, data, isCovidRequest).then((res) => {
			return res.data;
		});
	}, options);
};

export const useAxiosDelete = <T extends BaseResponse, S>(
	url: string,
	options?: Omit<UseMutationOptions<T, unknown, S>, 'mutationFn'>,
	isCovidRequest = false
) => {
	return useMutation<T, unknown, S>((data: S) => {
		return api.delete<T, S>(url, data, isCovidRequest).then((res) => {
			return res.data;
		});
	}, options);
};