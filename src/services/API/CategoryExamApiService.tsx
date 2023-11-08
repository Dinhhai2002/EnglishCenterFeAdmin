import BaseApiService from './BaseApiService';

class CategoryExamApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async getAll(): Promise<any> {
    try {
      const response = await this.api.get(
        `${process.env.REACT_APP_URL_CATEGORY_EXAM}`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  public async findOne(id: number): Promise<any> {
    try {
      const response = await this.api.get(
        `${process.env.REACT_APP_URL_CATEGORY_EXAM}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllExamById(id: any): Promise<any> {
    try {
      const response = await this.api.get(
        `${process.env.REACT_APP_URL_CATEGORY_EXAM}/${id}/get-exams-by-category`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  public async getAllTopicById(id: any): Promise<any> {
    try {
      const response = await this.api.get(
        `${process.env.REACT_APP_URL_CATEGORY_EXAM}/${id}/get-topic-exam-by-category`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
const token = localStorage.getItem('token');

const categoryExamApiService = new CategoryExamApiService(token);
export default categoryExamApiService;
