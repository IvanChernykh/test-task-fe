import {
  IRequest,
  ParcelTypes,
  RequestType,
} from '@/redux/reducers/requests/types';
import { LocalStorageKeys } from '@/utils/constants/localStorage';
import { newId } from '@/utils/helpers/newId';

type CreateRequestDto = {
  createdByUser: string;
  type: RequestType;
  description?: string;
  dispatchDate: string;
  cityFrom: string;
  cityTo: string;
  typeofParcel?: ParcelTypes;
};

class RequestsApi {
  createRequest(data: CreateRequestDto) {
    const newRequest: IRequest = {
      id: newId(),
      createdAt: Date.now().toString(),
      ...data,
    };

    const all = this.getAllRequests();
    all.push(newRequest);

    localStorage.setItem(LocalStorageKeys.ALL_REQUESTS, JSON.stringify(all));

    return all;
  }

  updateRequest(data: IRequest) {
    const all = this.getAllRequests();

    const updated = all.map((item) => (item.id === data.id ? data : item));

    localStorage.setItem(
      LocalStorageKeys.ALL_REQUESTS,
      JSON.stringify(updated),
    );

    return updated;
  }

  getAllRequests() {
    const data: IRequest[] = JSON.parse(
      localStorage.getItem(LocalStorageKeys.ALL_REQUESTS) || '[]',
    );
    return data;
  }

  getAllUserRequests(userId: string) {
    const all = this.getAllRequests();

    return all.filter((item) => item.createdByUser === userId);
  }

  getUserRequest(userId: string, requestid: string) {
    const all = this.getAllRequests();

    return (
      all.find(
        (item) => item.id === requestid && item.createdByUser === userId,
      ) || null
    );
  }

  deleteRequest(requestId: string) {
    const all = this.getAllRequests();

    const updated = all.filter((item) => item.id !== requestId);

    localStorage.setItem(
      LocalStorageKeys.ALL_REQUESTS,
      JSON.stringify(updated),
    );

    return updated;
  }
}

export const requestsApi = new RequestsApi();
