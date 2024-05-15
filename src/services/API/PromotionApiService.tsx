import { HttpStatusCode } from 'axios';
import handleResponseApi from '../handleResponseApi/handleResponseApi';
import BaseApiService from './BaseApiService';

const prefix = 'promotion';

class PromotionApiService extends BaseApiService {
  constructor(token?: any) {
    super(token);
  }
  public async getAll(
    keySearch?: string,
    status?: number,
    page?: number,
    limit?: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}`, {
        params: {
          key_search: keySearch,
          status: status,
          page: page,
          limit: limit
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  public async findOne(id: number): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  public async create(
    description: string,
    promotion_type: number,
    promotion_value: number,
    point: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/${prefix}/create`, {
        description: description,
        promotion_type: promotion_type,
        promotion_value: promotion_value,
        point: point
      });
      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(
    id: number,
    description: string,
    promotion_type: number,
    promotion_value: number,
    point: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/${prefix}/${id}/update`, {
        description: description,
        promotion_type: promotion_type,
        promotion_value: promotion_value,
        point: point
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async changeStatus(id: number): Promise<any> {
    try {
      const response = await this.api.post(`/${prefix}/${id}/change-status`);

      if (response.data.status === HttpStatusCode.BadRequest) {
        throw {
          response
        };
      }
      return response.data;
    } catch (error: any) {
      throw { error };
    }
  }
}
const token = localStorage.getItem('token');

const promotionApiService = new PromotionApiService(token);
export default promotionApiService;
