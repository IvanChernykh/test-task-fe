import { IUser } from '@/redux/reducers/user/types';
import { LocalStorageKeys } from '@/utils/constants/localStorage';
import { newId } from '@/utils/helpers/newId';

class AuthApi {
  loginAsNewOrExistingUser(name: string) {
    let users: IUser[] = this.getAllUsers();

    if (users.find((item) => item.name === name)) {
      const user = users.find((item) => item.name === name);
      localStorage.setItem(LocalStorageKeys.AUTH_KEY, JSON.stringify(user!.id));
      return user;
    }
    const newUser = { name, id: newId() };

    users.length ? users.push(newUser) : (users = [newUser]);

    localStorage.setItem(LocalStorageKeys.ALL_USERS, JSON.stringify(users));
    localStorage.setItem(LocalStorageKeys.AUTH_KEY, JSON.stringify(newUser.id));

    return newUser;
  }

  getAllUsers() {
    const allUsers: IUser[] = JSON.parse(
      localStorage.getItem(LocalStorageKeys.ALL_USERS) || '[]',
    );
    return allUsers;
  }

  logOut() {
    localStorage.removeItem(LocalStorageKeys.AUTH_KEY);
  }

  auth() {
    let authKey;

    try {
      authKey = JSON.parse(
        localStorage.getItem(LocalStorageKeys.AUTH_KEY) || '',
      );
    } catch {
      return null;
    }

    if (!authKey) {
      return null;
    }

    const users = this.getAllUsers();

    return users.find((item) => item.id === authKey) || null;
  }

  findUser(userId: string) {
    const users = this.getAllUsers();

    return users.find((item) => item.id === userId);
  }
}

export const authApi = new AuthApi();
