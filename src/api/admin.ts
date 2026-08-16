import api from "./api";
import { Urls } from "./urls";

export interface RegisteredUsersCountResponse {
  count: number;
}

export const getRegisteredUsersCount = () =>
  api.get<RegisteredUsersCountResponse>(
    Urls.adminUrls.registeredUsersCount,
  );
