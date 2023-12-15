import BaseApiService from "./BaseApiService";

class AudioApiService extends BaseApiService {
  constructor(token?: any) {
    super(token);
  }

  public async getDetail(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/audio/${id}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }
}
const token = localStorage.getItem("token");

const audioApiService = new AudioApiService(token);
export default audioApiService;
