import handleResponseApi from '../handleResponseApi/handleResponseApi';
import BaseApiService from './BaseApiService';
const prefix = 'authentication';
class AuthenticationApiService extends BaseApiService {
  public async Login(user_name: any, password: any): Promise<any> {
    try {
      const response = await this.api.post(
        `${process.env.REACT_APP_URL_LOGIN}`,
        {
          user_name,
          password
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error('Thông tin đăng nhập không chính xác!');
    }
  }

  public async Register(
    user_name: any,
    full_name: any,
    email: any,
    gender: any,
    phone: any,
    password: any,
    birthday: any,
    city_id: any,
    district_id: any,
    ward_id: any,
    full_address: any
  ): Promise<any> {
    var messageError = '';

    try {
      const response: any = await this.api.post(
        `${process.env.REACT_APP_URL_REGISTER}`,
        {
          user_name,
          full_name,
          email,
          gender,
          phone,
          password,
          birthday,
          city_id,
          district_id,
          ward_id,
          full_address
        }
      );

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      console.log(error.message);

      throw new Error('Thông tin đăng kí không hợp lệ!');
    }
  }

  public async SendOtp(user_name: any, email: any): Promise<any> {
    var messageError = '';
    try {
      const response: any = await this.api.post(
        `${process.env.REACT_APP_URL_OTP}`,
        {
          user_name,
          email
        }
      );

      messageError = handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      console.error('Error setting up request:', error.message);
      throw new Error(messageError);
    }
  }

  public async resetPassword(
    user_name: any,
    new_password: any,
    confirm_password: any
  ): Promise<any> {
    var messageError = '';
    try {
      const response: any = await this.api.post(
        `${process.env.REACT_APP_URL_RESETPASSWORD}`,
        {
          user_name,
          new_password,
          confirm_password
        }
      );

      messageError = handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      console.error('Error setting up request:', error.message);
      throw new Error(messageError);
    }
  }

  public async getAllCity(): Promise<any> {
    var messageError = '';
    try {
      const response: any = await this.api.get(
        `${process.env.REACT_APP_URL_GET_ALL_CITY}`
      );

      messageError = handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      console.error('Error setting up request:', error.message);
      throw new Error(messageError);
    }
  }

  public async findDistrictByCityId(id: number): Promise<any> {
    var messageError = '';
    console.log(`${process.env.REACT_APP_URL_GET_DISTRICT}`);

    try {
      const response: any = await this.api.get(
        `/${prefix}/${id}/get-district-by-city`
      );

      messageError = handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(messageError);
    }
  }

  public async findWardByDistrictId(id: number): Promise<any> {
    var messageError = '';

    try {
      const response: any = await this.api.get(
        `/${prefix}/${id}/get-ward-by-district`
      );

      messageError = handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(messageError);
    }
  }

  public async OtpForgot(user_name: any, email: any): Promise<any> {
    try {
      const response: any = await this.api.post(`/${prefix}/otp`, {
        user_name,
        email
      });

      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async confirmOtp(
    user_name: any,
    email: any,
    otp: number,
    type: number
  ): Promise<any> {
    try {
      const response: any = await this.api.post(`/${prefix}/confirm-otp`, {
        user_name,
        email,
        otp,
        type
      });

      handleResponseApi.handleResponse(response);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getAllPost(
    categoryBlogId?: number,
    keySearch?: string,
    status?: number,
    page?: number,
    limit?: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/post`, {
        params: {
          category_blog_id: categoryBlogId,
          key_search: keySearch,
          status: status,
          page: page,
          limit: limit
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async findOnePost(id: number, isAuthorize?: number): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/post/${id}`, {
        params: {
          isAuthorize: isAuthorize
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  public async getAllCategoryBlog(status?: number): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/category-blog`, {
        params: {
          status: status
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const authenticationApiService = new AuthenticationApiService();
export default authenticationApiService;
