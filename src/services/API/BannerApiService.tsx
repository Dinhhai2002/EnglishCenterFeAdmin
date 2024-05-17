import { HttpStatusCode } from 'axios';
import handleResponseApi from '../handleResponseApi/handleResponseApi';
import BaseApiService from './BaseApiService';

const prefix = '/banner';
class BannerApiService extends BaseApiService {
  constructor(token?: any) {
    super(token);
  }

  public async getAll(
    status: number,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`${prefix}`, {
        params: {
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
      const response = await this.api.get(`${prefix}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async create(file: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await this.api.post(`${prefix}/create`, formData);

      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  public async update(id: number, file: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await this.api.post(`${prefix}/${id}/update`, formData);

      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  public async changeStatus(id: number): Promise<any> {
    try {
      const response = await this.api.post(`${prefix}/${id}/change-status`);

      handleResponseApi.handleResponse(response);
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

const bannerApiService = new BannerApiService(token);
export default bannerApiService;
