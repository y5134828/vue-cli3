import Mock from 'mockjs';
import { login, userInfo } from './module/login';

// user
Mock.mock('/api/user/login', 'post', login);
Mock.mock('/api/user/info', 'post', userInfo);
