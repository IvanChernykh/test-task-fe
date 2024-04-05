import { IUser } from '@/redux/reducers/user/types';
import { newId } from '@/utils/helpers/newId';

class AuthApi {
  loginAsNewOrExistingUser(name: string) {
    let users: IUser[] = this.getAllUsers();

    if (users.find((item) => item.name === name)) {
      return users.find((item) => item.name === name);
    } else {
      const newUser = { name, id: newId() };

      users.length ? users.push(newUser) : (users = [newUser]);

      localStorage.setItem('allUsers', JSON.stringify(users));

      return newUser;
    }
  }

  getAllUsers() {
    const allUsers: IUser[] = JSON.parse(
      localStorage.getItem('allUsers') || '[]',
    );
    return allUsers;
  }
}

export const authApi = new AuthApi();
