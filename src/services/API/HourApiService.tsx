import BaseApiService from './BaseApiService';

class HourApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async getAll(
    weekdayId: number,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/hour`, {
        params: {
          weekday_id: weekdayId,
          page: page,
          limit: limit
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}
const token = localStorage.getItem('token');

const hourApiService = new HourApiService(token);
export default hourApiService;
