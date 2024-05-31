import { request } from "./request";

export const list_notify = async (uid) => {
    if (!uid) {
      throw new Error("UID is required");
    }
    return await request.get(`/api/notifications/${uid}`);
  };
