export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  gender: string;
  role?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface AddTask {
  username: string;
  task: string[];
}
