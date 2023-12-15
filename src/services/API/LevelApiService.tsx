import handleResponseApi from 'src/services/handleResponseApi/handleResponseApi';
import BaseApiService from './BaseApiService';

class LevelApiService extends BaseApiService {
  constructor(token?: any) {
    super(token);
  }

  public async getAllNoLimit(): Promise<any> {
    var messageError = '';
    try {
      const response = await this.api.get(`/level`);

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error(messageError);
    }
  }
}
const token = localStorage.getItem('token');

const levelApiService = new LevelApiService(token);
export default levelApiService;
