import moment from 'moment';

import {
  IRequest,
  ParcelTypes,
  RequestType,
} from '@/redux/reducers/requests/types';
import { LocalStorageKeys } from '@/utils/constants/localStorage';
import { newId } from '@/utils/helpers/newId';

import { authApi } from '../auth/authApi';

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
    const user = authApi.findUser(data.createdByUser);
    const newRequest: IRequest = {
      ...data,
      id: newId(),
      createdByUser: user!,
      createdAt: Date.now().toString(),
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

    return all.filter((item) => item.createdByUser.id === userId);
  }

  getUserRequest(userId: string, requestid: string) {
    const all = this.getAllRequests();

    return (
      all.find(
        (item) => item.id === requestid && item.createdByUser.id === userId,
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

  findRelatedRequests(requestId: string) {
    const all = this.getAllRequests();
    const current = all.find((item) => item.id === requestId)!;

    if (current) {
      return all.filter((item) => {
        const validateDateAndType = () => {
          return current.type === 'order'
            ? item.type === 'delivery' &&
                moment(item.dispatchDate).isBefore(current.dispatchDate)
            : item.type === 'order' &&
                moment(current.dispatchDate).isBefore(item.dispatchDate);
        };

        return (
          validateDateAndType() &&
          item.createdByUser.id !== current.createdByUser.id &&
          item.cityFrom === current.cityFrom &&
          item.cityTo === current.cityTo
        );
      });
    }
    return [];
  }
}

export const requestsApi = new RequestsApi();
