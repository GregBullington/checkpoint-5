import { AppState } from "../AppState"
import { Post } from "../Models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class AllPostsService {
  async getAllPosts(query = "") {
    const res = await api.get("api/posts" + query)
    // logger.log(res.data)
    AppState.allPosts = res.data.posts.map(p => new Post(p))
    // logger.log(AppState.allPosts)
  }
  async createPost(data) {
    const res = await api.post("api/posts", data)
    // logger.log(res.data)
    AppState.posts.push(new Post(res.data))
    this.getAllPosts()
  }
  async removePost(id) {
    const res = await api.delete("api/posts/" + id)
    // logger.log(res.data)
    AppState.posts = AppState.posts.filter(p => p.id !== AppState.posts.id)
    this.getAllPosts()
  }
  async likePost(id) {
    const res = await api.post("api/posts/" + id + "/like")
    // logger.log(res.data)
    this.getAllPosts()
  }
}
export const allPostsService = new AllPostsService()