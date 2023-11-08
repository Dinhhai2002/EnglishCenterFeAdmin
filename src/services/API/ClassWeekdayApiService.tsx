import handleResponseApi from '../handleResponseApi/handleResponseApi';
import BaseApiService from './BaseApiService';

class ClassWeekdayApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async create(listHourId: any, classId: number): Promise<any> {
    var messageError = '';
    try {
      const response = await this.api.post(`/class-weekday/create`, {
        list_hour_id: listHourId,
        class_id: classId
      });

      messageError = handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
const token = localStorage.getItem('token');

const classWeekdayApiService = new ClassWeekdayApiService(token);
export default classWeekdayApiService;
