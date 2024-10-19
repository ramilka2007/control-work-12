export interface RegisterMutation {
  username: string;
  displayName: string;
  password: string;
  avatar: File | null;
}

export interface User {
  _id: string;
  username: string;
  role: string;
  token: string;
  displayName: string;
  googleAccount?: boolean;
  avatar?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface PhotoForm {
  title: string;
  image: File | null;
}

export interface Photo {
  _id: string;
  user: User;
  title: string;
  image: string;
}