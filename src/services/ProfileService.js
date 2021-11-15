import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";
import Pop from "../utils/Pop"


class ProfileService {
  async getProfile(id) {
    const res = await api.get('api/profiles/' + id)
    // logger.log('profile', res.data)
    AppState.profile = res.data
  }
  async editProf(data) {
    try {
      const res = await api.put('account/', data)
      logger.log(res.data)
      AppState.profile = res.data
      Pop.toast("Your Profile has been Updated!", 'success')
    } catch (error) {
      logger.error(error)
      Pop.toast("Something isnt right.", 'error')
    }
  }
}

export const profileService = new ProfileService()