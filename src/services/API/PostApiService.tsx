import BaseApiService from './BaseApiService';
const prefix = 'post';
class PostApiService extends BaseApiService {
  constructor(token?: any) {
    super(token);
  }

  public async findOne(id: number): Promise<any> {
    try {
      const response = await this.api.get(`/${prefix}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  public async create(
    title: string,
    description: string,
    content: string,
    category_blog_id: number,
    status: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/${prefix}/create`, {
        title: title,
        description: description,
        content: content,
        category_blog_id: category_blog_id,
        status: status
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  public async update(
    id: number,
    title: string,
    description: string,
    content: string,
    category_blog_id: number,
    status: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/${prefix}/${id}/update`, {
        title: title,
        description: description,
        content: content,
        category_blog_id: category_blog_id,
        status: status
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  public async uploadBanner(id: number, file: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await this.api.post(
        `/${prefix}/${id}/upload-banner`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  public async changeStatus(id: number): Promise<any> {
    try {
      const response = await this.api.post(`/${prefix}/${id}/change-status`);

      // xử lí để trả về listData khi thay đổi trạng thái không thành công
      if (response.data.status === 400) {
        throw {
          response
        };
      }

      return response.data;
    } catch (error: any) {
      throw { error };
    }
  }
}
const token = localStorage.getItem('token');

const postApiService = new PostApiService(token);
export default postApiService;
