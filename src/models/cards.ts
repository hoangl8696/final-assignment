

export class CardModel {
  private userName;
  private timeAdded;
  private thumbnailImg;
  private description;
  private likes;
  private comments;
  private titles;
  getUserName () {return this.userName;}
  getTimeAdded () {return this.timeAdded;}
  getThumbnailImg () {return this.thumbnailImg;}
  getDescription () {return this.description;}
  getLikes () {return this.likes;}
  getComments () {return this.comments;}
  getTitles () {return this.titles;}
  setUserName (username) {this.userName = username;}
  setTimeAdded (timeAdded) {this.timeAdded = timeAdded;}
  setThumbnailImg (thumbnailImg) {this.thumbnailImg = thumbnailImg;}
  setDescription (description) {this.description = description;}
  setLikes (likes) {this.likes = likes;}
  setComments (comments) {this.comments = comments;}
  setTitles (titles) {this.titles = this.titles;}
}
