import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class LabServices {
  protected readonly instance: AxiosInstance;
  protected readonly headerObj: AxiosRequestConfig;
  public constructor(url: string, token: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
    this.headerObj = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  getLab = () =>
    this.instance.get(`/labs`, this.headerObj).then((res) => {
      return res.data;
    });
  getLabById = (id: string) =>
    this.instance.get(`/labs/${id}`, this.headerObj).then((res) => {
      return res.data;
    });
  createLab = (data: any) =>
    this.instance.post(`/labs`, data, this.headerObj).then((res) => {
      return res.data;
    });

  enrollStudent = (id: string, password: string) =>
    this.instance
      .post(`/labs/${id}/enroll`, { password }, this.headerObj)
      .then((res) => {
        return res.data;
      });
}
