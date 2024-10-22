import { TestServices } from "./test.service";
import { ForumServices } from "./forum.service";
import { LabServices } from "./lab.service";
const backendURL = process.env.BACKEND_URL || "http://localhost:5000/api";

export const testService = (token: string) =>
  new TestServices(backendURL, token);

export const forumService = (token: string) =>
  new ForumServices(backendURL, token);

export const labService = (token: string) => new LabServices(backendURL, token);
