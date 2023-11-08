import BaseApiService from './BaseApiService';

class TopicExamApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async getAll(): Promise<any> {
    try {
      const response = await this.api.get(
        `${process.env.REACT_APP_URL_TOPIC_EXAM}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllExamById(id: any): Promise<any> {
    try {
      const response = await this.api.get(
        `${process.env.REACT_APP_URL_TOPIC_EXAM}/${id}/get-exam-by-topic`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllExamByAllTopic(): Promise<any> {
    try {
      const response = await this.api.get(
        `${process.env.REACT_APP_URL_TOPIC_EXAM}/get-all-exam-by-all-topic`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
const token = localStorage.getItem('token');
const topicExamApiService = new TopicExamApiService(token);
export default topicExamApiService;
