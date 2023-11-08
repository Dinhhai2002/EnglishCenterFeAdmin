import BaseApiService from './BaseApiService';

class WeekdayApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async getAll(): Promise<any> {
    try {
      const response = await this.api.get(`/weekday`);

      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}
const token = localStorage.getItem('token');

const weekdayApiService = new WeekdayApiService(token);
export default weekdayApiService;
