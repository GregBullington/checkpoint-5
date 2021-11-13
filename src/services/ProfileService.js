import { AppState } from "../AppState";
import { Post } from "../Models/Post";
import { logger } from "../utils/Logger";
import { networkApi } from "./AxiosService";


class ProfileService {
  async getProfile(id) {
    const res = await networkApi.get('/profiles/' + id)
    logger.log('profile', res.data)
    AppState.profile = res.data
  }
  // async getAllProfiles(query) {

  //   const res = await networkApi.get('/profiles/' + query)
  //   logger.log('profile', res.data)
  //   AppState.profile = res.data
  // }

  async createPost(data) {
    const res = await networkApi.post('posts', data)
    logger.log('data', res.data)
    AppState.posts.push(new Post(res.data))
  }
}

export const profileService = new ProfileService()