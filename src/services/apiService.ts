import { Observable } from 'rxjs';
import { AjaxRequest, AjaxResponse, ajax } from 'rxjs/ajax';

type GetAjaxRequest = Omit<AjaxRequest, 'method'>;
export const get = (options: GetAjaxRequest): Observable<AjaxResponse> =>
  ajax({ ...options, method: 'GET' });
