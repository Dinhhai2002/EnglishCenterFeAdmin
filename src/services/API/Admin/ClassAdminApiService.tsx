import handleResponseApi from 'src/services/handleResponseApi/handleResponseApi';
import BaseApiService from '../BaseApiService';

class ClassAdminApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async getAll(
    keySearch: string,
    status: number,
    page: number,
    limit: number
  ): Promise<any> {
    var messageError = '';
    try {
      const response = await this.api.get(`/admin/class`, {
        params: {
          key_search: keySearch,
          status: status,
          page: page,
          limit: limit
        }
      });

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error(messageError);
    }
  }

  public async getAllNoLimit(): Promise<any> {
    try {
      const response = await this.api.get(`/class`);

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async changeStatus(id: number): Promise<any> {
    try {
      const response = await this.api.post(`/admin/class/${id}/change-status`);
      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(
    name: any,
    startDate: string,
    endDate: string,
    courseId: number
  ): Promise<any> {
    var messageError = '';
    try {
      const response = await this.api.post(`/class/create`, {
        name: name,
        start_date: startDate,
        end_date: endDate,
        course_id: courseId
      });

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error(messageError);
    }
  }

  public async addStudent(id: number, userCourseId: any): Promise<any> {
    var messageError = '';
    try {
      const response = await this.api.post(`/class/${id}/add-student`, {
        user_course_id: userCourseId
      });

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error(messageError);
    }
  }

  public async addTeacher(id: number, teacherId: any): Promise<any> {
    var messageError = '';
    try {
      const response = await this.api.post(`/class/${id}/set-teacher`, {
        teacher_id: teacherId
      });

      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error(messageError);
    }
  }
}
const token = localStorage.getItem('token');

const classAdminApiService = new ClassAdminApiService(token);
export default classAdminApiService;
