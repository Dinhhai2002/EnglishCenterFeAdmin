import handleResponseApi from 'src/services/handleResponseApi/handleResponseApi';
import BaseApiService from '../BaseApiService';

class ExamAdminApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async getAll(): Promise<any> {
    try {
      const response = await this.api.get(`/admin/exam`);

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getAllNoAudio(): Promise<any> {
    try {
      const response = await this.api.get(`/admin/exam/no-audio`);

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getAllNoQuestion(): Promise<any> {
    try {
      const response = await this.api.get(`/admin/exam/no-question`);

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async changeStatus(id: number): Promise<any> {
    try {
      const response = await this.api.post(`/admin/exam/${id}/change-status`);

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(
    name: string,
    description: string,
    categoryExamId: number,
    topicId: number,
    timeMinutes: number,
    totalQuestion: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/admin/exam/create`, {
        name: name,
        description: description,
        category_exam_id: categoryExamId,
        topic_id: topicId,
        time_minutes: timeMinutes,
        total_question: totalQuestion
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
    description: string,
    categoryExamId: number,
    topicId: number,
    timeMinutes: number,
    totalQuestion: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/admin/exam/${id}/update`, {
        name: name,
        description: description,
        category_exam_id: categoryExamId,
        topic_id: topicId,
        time_minutes: timeMinutes,
        total_question: totalQuestion
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async uploadAudio(id: number, file: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await this.api.post(
        `/admin/exam/${id}/upload-audio`,
        formData
      );

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async uploadQuestion(id: number, file: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await this.api.post(
        `/admin/exam/${id}/upload-question`,
        formData
      );

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
const token = localStorage.getItem('token');

const examAdminApiService = new ExamAdminApiService(token);
export default examAdminApiService;
