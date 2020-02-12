import {environment} from '../../environments/environment';

export class AppRoutes {
  public static login = 'login';
  public static dashboard = 'dashboard';
  public static edit = 'edit/:id';
  public static create = 'create';
  public static list = 'list';
  public static users = 'users';
  public static detail = 'detail/:id';
  public static chat = 'chat';
  public static questions = 'questions';
  public static sets = 'sets';
  public static message = 'message/:nickname';
  // pages
  public static serverError = '500';
  public static notFound = '404';
  public static forbidden = '403';
}
