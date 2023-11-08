import handleResponseApi from 'src/services/handleResponseApi/handleResponseApi';
import BaseApiService from './BaseApiService';

class ChapterApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async create(name: any, courseId: number): Promise<any> {
    try {
      const response = await this.api.post(`/chapter/create`, {
        name: name,
        course_id: courseId
      });
      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(
    id: number,
    name: string,
    courseId: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/chapter/${id}/update`, {
        name: name,
        course_id: courseId
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getAll(
    courseId: number,
    keySearch: string,
    status: number,
    isPagination: number,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/chapter`, {
        params: {
          course_id: courseId,
          key_search: keySearch,
          status: status,
          is_pagination: isPagination,
          page: page,
          limit: limit
        }
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async findOne(id: number): Promise<any> {
    try {
      const response = await this.api.get(`/chapter/${id}/detail`);

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async changeStatus(id: number): Promise<any> {
    var messageError = '';
    try {
      const response = await this.api.post(`/chapter/${id}/change-status`);

      // xử lí để trả về listData khi thay đổi trạng thái không thành công
      if (response.data.status === 400) {
        messageError = response.data;
        const errorData = response.data.data;
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw {
          response
        };
      }

      return response.data;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw { error };
    }
  }
}
const token = localStorage.getItem('token');

const chapterApiService = new ChapterApiService(token);
export default chapterApiService;
