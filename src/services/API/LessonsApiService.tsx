import handleResponseApi from 'src/services/handleResponseApi/handleResponseApi';
import BaseApiService from './BaseApiService';

class LessonsApiService extends BaseApiService {
  constructor(token?: any) {
    super(token);
  }

  public async create(
    name: string,
    description: string,
    content: string,
    videoType: number,
    urlVideo: string,
    courseId: number,
    chapterId: number,
    isFree: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/lessons/create`, {
        name: name,
        description: description,
        content: content,
        video_type: videoType,
        url_video: urlVideo,
        course_id: courseId,
        chapter_id: chapterId,
        is_free: isFree
      });
      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(
    id: number,
    name: string,
    description: string,
    content: string,
    videoType: number,
    urlVideo: string,
    courseId: number,
    chapterId: number,
    isFree: number
  ): Promise<any> {
    try {
      const response = await this.api.post(`/lessons/${id}/update`, {
        name: name,
        description: description,
        content: content,
        video_type: videoType,
        url_video: urlVideo,
        course_id: courseId,
        chapter_id: chapterId,
        is_free: isFree
      });
      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getAll(
    courseId: number,
    chapterId: number,
    keySearch: string,
    status: number,
    page: number,
    limit: number,
    isPagination?: number
  ): Promise<any> {
    try {
      const response = await this.api.get(`/lessons`, {
        params: {
          course_id: courseId,
          chapter_id: chapterId,
          key_search: keySearch,
          status: status,
          is_pagination: isPagination,
          page: page,
          limit: limit
        }
      });

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async findOne(id: number): Promise<any> {
    try {
      const response = await this.api.get(`/lessons/${id}/detail`);

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async changeStatus(id: number): Promise<any> {
    try {
      const response = await this.api.post(`/lessons/${id}/change-status`);

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async uploadVideo(id: number, file: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await this.api.post(
        `/lessons/${id}/upload-driver`,
        formData
      );

      handleResponseApi.handleResponse(response);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
const token = localStorage.getItem('token');

const lessonsApiService = new LessonsApiService(token);
export default lessonsApiService;
