import axios, { AxiosInstance } from "axios";

export class TestServices {
  protected readonly instance: AxiosInstance;
  protected readonly token: string;
  public constructor(url: string, token: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
    this.token = token;
  }
  firstTest = () =>
    this.instance
      .get(`/student`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((res) => {
        return res.data;
      });
}
