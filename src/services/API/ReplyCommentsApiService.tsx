import BaseApiService from "./BaseApiService";

class ReplyCommentsApiService extends BaseApiService {
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

  public async create(content: any, comments_id: number): Promise<any> {
    try {
      const response = await this.api.post(`/reply-comments/create`, {
        content,
        comments_id,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  public async update(id: number, content: any, comments_id: number): Promise<any> {
    try {
      const response = await this.api.post(`/reply-comments/${id}/update`, {
        content,
        comments_id,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  public async delete(id: number): Promise<any> {
    try {
      const response = await this.api.post(`/reply-comments/${id}/delete`);

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

}
const token = localStorage.getItem("token");

const replyCommentsApiService = new ReplyCommentsApiService(token);
export default replyCommentsApiService;
