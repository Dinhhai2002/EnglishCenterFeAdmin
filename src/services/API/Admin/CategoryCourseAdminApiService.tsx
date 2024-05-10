import handleResponseApi from 'src/services/handleResponseApi/handleResponseApi';
import BaseApiService from '../BaseApiService';

class CategoryCourseAdminApiService extends BaseApiService {
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
      const response = await this.api.get(`/category-course`, {
        params: {
          key_search: keySearch,
          status: status,
          page: page,
          limit: limit
        }
      });

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error(messageError);
    }
  }

  // public async getAllNoLimit(): Promise<any> {
  //   var messageError = '';
  //   try {
  //     const response = await this.api.get(`/category-course`);

  //     messageError = handleResponseApi.handleResponse(response);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching user:', error);
  //     throw new Error(messageError);
  //   }
  // }

  public async findOne(id: number): Promise<any> {
    try {
      const response = await this.api.get(
        `/category-course/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async changeStatus(id: number): Promise<any> {
    try {
      const response = await this.api.post(
        `/category-course/${id}/change-status`
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
      const response = await this.api.post(`/category-course/create`, {
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
        `/category-course/${id}/update`,
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

const categoryCourseAdminApiService = new CategoryCourseAdminApiService(token);
export default categoryCourseAdminApiService;
