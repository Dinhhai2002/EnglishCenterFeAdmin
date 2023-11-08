import BaseApiService from "./BaseApiService";

class ImageApiService extends BaseApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(token?: any) {
    super(token);
  }

  public async getImage(id: any): Promise<any> {
    try {
      const response = await this.api.get(`/image/${id}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }
}
const token = localStorage.getItem("token");

const imageApiService = new ImageApiService(token);
export default imageApiService;
