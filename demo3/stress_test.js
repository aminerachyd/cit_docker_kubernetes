import http from 'k6/http';

import { sleep } from 'k6';


export default function () {
  http.get('http://34.140.108.193:8081/stress_test');
}
