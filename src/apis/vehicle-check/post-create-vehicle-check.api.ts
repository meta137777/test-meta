import { FRONT2MESSAGE } from '@/config/url';
import httpService from '@/services/http-service';

export default async function postCreateVehicleCheckAPI(data:any) {
    try {
        const res = await httpService.post(`${FRONT2MESSAGE}/VehicleCheck`,data);
        return res.data;
      } catch (error) {
        return await Promise.reject(error);
      }
}
