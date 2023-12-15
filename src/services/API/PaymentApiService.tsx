import handleResponseApi from '../handleResponseApi/handleResponseApi';
import BaseApiService from './BaseApiService';

class PaymentApiService extends BaseApiService {
  constructor(token?: any) {
    super(token);
  }

  public async getAll(
    courseId: number,
    isPagination: number,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/payment`, {
        params: {
          course_id: courseId,
          is_pagination: isPagination,
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

  public async getUrlPayment(id: any, amount: number): Promise<any> {
    try {
      const response = await this.api.get(`/payment/${id}/course`, {
        params: {
          amount: amount
        }
      });

      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async createPayment(id: number, amount: number): Promise<any> {
    try {
      const response = await this.api.post(`/payment/${id}/course`, {
        amount: amount
      });

      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
const token = localStorage.getItem('token');

const paymentApiService = new PaymentApiService(token);
export default paymentApiService;
