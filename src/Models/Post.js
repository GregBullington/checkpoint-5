

export class Post {
  constructor(data) {
    this.creatorId = data.creatorId
    this.id = data._id
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creator = data.creator
    this.likes = data.likes
    this.timeStamp = data.updatedAt
  }
}