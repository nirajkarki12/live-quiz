import {environment} from '../../environments/environment';

export class ApiConstants {
  public static API_ENDPOINT = environment.API;
  public static socketUrl = environment.socketUrl;

  public static AUTH = '/auth';
  public static V1 = '/v1';
  public static ADMIN = '/admin';
  public static LOGIN = '/login';
  public static PROFILE = '/user-info';
  public static USER = '/user';
  public static BANK = '/bank';
  public static PAGINATE = '/paginate';
  public static DETAIL = '/detail';
  public static STORE = '/store';
  public static CREATE = '/create';
  public static UPDATE = '/update';
  public static DELETE = '/delete';
  public static QUESTION = '/question';
  public static SET = '/set';
  public static QUESTIONSETS = '/questionsets';
  public static ACTIVE = '/active';
  public static VERIFY_TOKEN = '/verify-token';
  public static TOKEN = '/token';
}
