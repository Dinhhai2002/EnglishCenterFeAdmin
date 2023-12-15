import handleResponseApi from 'src/services/handleResponseApi/handleResponseApi';
import BaseApiService from '../BaseApiService';
// import { post } from '../../../../node_modules/axios';

class CourseAdminApiService extends BaseApiService {
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
      const response = await this.api.get(`/admin/course`, {
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

  public async changeStatus(id: number): Promise<any> {
    var messageError = '';
    try {
      const response = await this.api.post(`/admin/course/${id}/change-status`);

      // xử lí để trả về listData khi thay đổi trạng thái không thành công
      if (response.data.status === 400) {
        messageError = response.data;
        const errorData = response.data.data;
       
        throw {
          response
        };
      }

      return response.data;
    } catch (error: any) {
      
      throw { error };
    }
  }

  public async uploadBanner(id: number, file: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await this.api.post(
        `/admin/course/${id}/upload-banner`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  public async create(
    name: any,
    description: any,
    price: number,
    isFree: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/admin/course/create`, {
        name: name,
        description: description,
        price: price,
        is_free: isFree
      });
      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(
    id: number,
    name: string,
    description: string,
    price: number,
    isFree: number,
    discountPercent: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/admin/course/${id}/update`, {
        name: name,
        description: description,
        price: price,
        is_free: isFree,
        discount_percent: discountPercent
      });
      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
const token = localStorage.getItem('token');

const courseAdminApiService = new CourseAdminApiService(token);
export default courseAdminApiService;
