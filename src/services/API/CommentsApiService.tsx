import BaseApiService from "./BaseApiService";

class CommentsApiService extends BaseApiService {
  private token: string | null;

  constructor(token?: any) {
    super(token);
    this.token = token || null;
  }

  public setToken(token: string | null) {
    this.token = token;
    this.updateAuthorizationHeader();
  }

  private updateAuthorizationHeader() {
    if (this.token) {
      this.api.defaults.headers["Authorization"] = `Bearer ${this.token}`;
    } else {
      delete this.api.defaults.headers["Authorization"];
    }
  }

  public async create(content: any, exam_id: number): Promise<any> {
    try {
      const response = await this.api.post(`/comments/create`, {
        content,
        exam_id,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  public async update(id: number, content: any, exam_id: number): Promise<any> {
    try {
      const response = await this.api.post(`/comments/${id}/update`, {
        content,
        exam_id,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  public async delete(id: number): Promise<any> {
    try {
      const response = await this.api.post(`/comments/${id}/delete`);

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  public async getByExamId(exam_id: number): Promise<any> {
    try {
      const response = await this.api.get(`/comments/get-by-exam`, {
        params: {
          exam_id: exam_id,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  public async countByExamId(exam_id: number): Promise<any> {
    try {
      const response = await this.api.get(`/comments/count-by-exam`, {
        params: {
          exam_id: exam_id,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }
}
const token = localStorage.getItem("token");

const commentsApiService = new CommentsApiService(token);
export default commentsApiService;
