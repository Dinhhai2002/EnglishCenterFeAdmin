import BaseApiService from './BaseApiService';

class ExamApiService extends BaseApiService {
  constructor(token?: any) {
    super(token);
  }

  public async getQuestion(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/exam/${id}/questions`);

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  public async findOne(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/exam/${id}/detail`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getAll(
    topicExamId: number,
    status: number,
    keySearch: string,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/exam`, {
        params: {
          topic_exam_id: topicExamId,
          status: status,
          key_search: keySearch,
          page,
          limit
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  public async getAudioByExamId(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/exam/${id}/get-audio`);

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  public async countUser(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/exam/${id}/count-user`);

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
const token = localStorage.getItem('token');

const examApiService = new ExamApiService(token);
export default examApiService;
