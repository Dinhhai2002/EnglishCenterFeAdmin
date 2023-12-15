import handleResponseApi from 'src/services/handleResponseApi/handleResponseApi';
import BaseApiService from '../BaseApiService';

class CategoryExamAdminApiService extends BaseApiService {
  constructor(token?: any) {
    super(token);
  }

  public async getAll(
    keySearch: string,
    status: number,
    page: number,
    limit: number
  ): Promise<any> {
    var messageError = '';
    try {
      const response = await this.api.get(`/admin/category-exam`, {
        params: {
          key_search: keySearch,
          status: status,
          page: page,
          limit: limit
        }
      });

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async changeStatus(id: number): Promise<any> {
    try {
      const response = await this.api.post(
        `/admin/category-exam/${id}/change-status`
      );
      console.log(response);

      handleResponseApi.handleResponse(response);
      if (response.data.status === 400) {
        throw {
          response
        };
      }

      return response.data;
    } catch (error: any) {
      throw { error };
    }
  }

  public async create(name: any, description: string): Promise<any> {
    try {
      const response = await this.api.post(`/admin/category-exam/create`, {
        name: name,
        description: description
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async update(
    id: number,
    name: any,
    description: string
  ): Promise<any> {
    try {
      const response = await this.api.post(
        `/admin/category-exam/${id}/update`,
        {
          name: name,
          description: description
        }
      );

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
const token = localStorage.getItem('token');

const categoryExamAdminApiService = new CategoryExamAdminApiService(token);
export default categoryExamAdminApiService;
