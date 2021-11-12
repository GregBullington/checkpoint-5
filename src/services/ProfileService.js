import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { networkApi } from "./AxiosService";


class ProfileService {
  async getProfile(id) {
    const res = await networkApi.get('/profiles/' + id)
    logger.log('profile', res.data)
    AppState.profile = res.data
  }
}

export const profileService = new ProfileService()