import handleResponseApi from 'src/services/handleResponseApi/handleResponseApi';
import BaseApiService from '../BaseApiService';

class StatisticalApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async Amount(
    numberWeek: number,
    fromDate: string,
    toDate: string,
    type: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/admin/statistical/amount`, {
        params: {
          number_week: numberWeek,
          from_date: fromDate,
          to_date: toDate,
          type: type
        }
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async DoExam(
    numberWeek: number,
    fromDate: string,
    toDate: string,
    type: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/admin/statistical/do-exam`, {
        params: {
          number_week: numberWeek,
          from_date: fromDate,
          to_date: toDate,
          type: type
        }
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
const token = localStorage.getItem('token');

const statisticalApiService = new StatisticalApiService(token);
export default statisticalApiService;
