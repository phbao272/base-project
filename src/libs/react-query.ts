import axios, { AxiosRequestConfig } from 'axios'
import { DefaultOptions, QueryClient, QueryKey } from 'react-query'

const defaultFn = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [endpoint, params, options] = queryKey as Array<string | Record<string, unknown>>

  const res = await axios.get(endpoint as string, {
    params,
    ...(options as AxiosRequestConfig),
  })
  return res.data
}

const queryConfig: DefaultOptions = {
  queries: {
    queryFn: defaultFn,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: false,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })
