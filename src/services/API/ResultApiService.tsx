import BaseApiService from "./BaseApiService";

class ResultApiService extends BaseApiService {
  private token: string | null;
  

  constructor(token?: any) {
    super(token);
    this.token = token || null;
  }

  public setToken(token: string | null) {
    this.token = token;
    this.updateAuthorizationHeader();
  }

  public async create(
    exam_id: any,
    time_complete: any,
    list_answer: any,
    total_question_skip: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/result/create`, {
        exam_id,
        time_complete,
        list_answer,
        total_question_skip,
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async getDetail(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/result/${id}`);

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async getListByUser(): Promise<any> {
    try {
      const response = await this.api.get(`/result/get-by-user`);

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  private updateAuthorizationHeader() {
    if (this.token) {
      this.api.defaults.headers["Authorization"] = `Bearer ${this.token}`;
      
    } else {
      delete this.api.defaults.headers["Authorization"];
    }
  }
}
const token = localStorage.getItem("token");

const resultApiService = new ResultApiService(token);
export default resultApiService;
