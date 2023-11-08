import handleResponseApi from "../handleResponseApi/handleResponseApi";
import HandleResponseApi from "../handleResponseApi/handleResponseApi";
import BaseApiService from "./BaseApiService";

class TargetApiService extends BaseApiService {
  private token: string | null;

  constructor(token?: any) {
    super(token);
    this.token = token || null;
  }

  public setToken(token: string | null) {
    this.token = token;
    this.updateAuthorizationHeader();
  }

  public async getByUserId(): Promise<any> {
    let messageError = "";
    try {
      const response = await this.api.get(`/target/get-by-user`);
      messageError = handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw new Error(messageError);
    }
  }

  public async create(time_exam: any, point_target: any): Promise<any> {
    try {
      const response = await this.api.post(`/target/create`, {
        time_exam,
        point_target,
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async update(
    id: any,
    time_exam: any,
    point_target: any
  ): Promise<any> {
    try {
      const response = await this.api.post(`/target/${id}/update`, {
        time_exam,
        point_target,
      });

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

const targetApiService = new TargetApiService(token);
export default targetApiService;
