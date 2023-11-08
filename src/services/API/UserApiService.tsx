import handleResponseApi from '../handleResponseApi/handleResponseApi';
import BaseApiService from './BaseApiService';

class UserApiService extends BaseApiService {
  private token: string | null;

  constructor(token?: any) {
    super(token);
    this.token = token || null;
  }

  public setToken(token: string | null) {
    this.token = token;
    this.updateAuthorizationHeader();
  }

  public async getUser(): Promise<any> {
    try {
      const response = await this.api.get(
        `${process.env.REACT_APP_URL_USER_DETAIL}`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  public async update(
    fullName: any,
    email: any,
    phone: any,
    address: any
  ): Promise<any> {
    try {
      const response = await this.api.post(`/users/update`, {
        full_name: fullName,
        email: email,
        phone: phone,
        full_address: address
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private updateAuthorizationHeader() {
    if (this.token) {
      this.api.defaults.headers['Authorization'] = `Bearer ${this.token}`;
    } else {
      delete this.api.defaults.headers['Authorization'];
    }
  }
}
const token = localStorage.getItem('token');

const userApiService = new UserApiService(token);
export default userApiService;
