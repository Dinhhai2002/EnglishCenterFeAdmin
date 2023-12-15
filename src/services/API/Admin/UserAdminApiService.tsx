import handleResponseApi from 'src/services/handleResponseApi/handleResponseApi';
import BaseApiService from '../BaseApiService';

class UserAdminApiService extends BaseApiService {
  constructor(token?: any) {
    super(token);
  }

  public async getAll(
    key_search: any,
    status: number,
    role: number,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/admin/user`, {
        params: {
          key_search: key_search,
          status: status,
          role: role,
          page: page,
          limit: limit
        }
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async changeStatus(id: number): Promise<any> {
    try {
      const response = await this.api.post(`/admin/user/${id}/change-status`);
      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
const token = localStorage.getItem('token');

const userAdminApiService = new UserAdminApiService(token);
export default userAdminApiService;
