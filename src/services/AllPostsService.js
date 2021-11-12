import { AppState } from "../AppState"
import { Post } from "../Models/Post"
import { logger } from "../utils/Logger"
import { networkApi } from "./AxiosService"



class AllPostsService {
  async getAllPosts(query = "") {
    const res = await networkApi.get("/posts" + query)
    logger.log(res.data)
    AppState.allPosts = res.data.posts.map(p => new Post(p))
    logger.log(AppState.allPosts)
  }
}
export const allPostsService = new AllPostsService()