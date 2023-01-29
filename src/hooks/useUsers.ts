import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/apiClient';
import { User } from '../types/User';


interface test {
  data: any
  isLoading: any;
  isFetching: any;
}

const getUsers = async (page: number, limit: number) => {
  const { data } = await api.get(`/clients?page=${page}&limit=${limit}`);
  
  const users = data.clients.map((user: User) => Object.assign(
    user, {created_at: new Date(user.created_at).toLocaleDateString(
      'pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
    )}
  ))
  return ({
    users, total: data.total
  })
}

export function useUsers(page: number, limit: number) {
  return useQuery(["users", page], () => getUsers(page, limit), {
    staleTime: 1000 * 5, // 5 Seconds
  });
}