import { Injectable } from '@angular/core';

@Injectable()
export class Cards {
  userName;
  timeAdded;
  fileName;
  description;
  likes;
  comments;
  titles;
  mediaType;
  mimeType;
  alreadyLiked;
  fileID;

  setMedia(title, description, timeAdded, type, mimeType, fileName, fileID) {
    this.titles = title;
    this.description = description;
    this.timeAdded = timeAdded;
    this.mediaType = type;
    this.fileName = fileName;
    this.mimeType = mimeType;
    this.fileID = fileID;
  }
  setUser(username) {
    this.userName = username;
  }
  setComments(comments){
    this.comments = comments;
  }
  setLikes(likes, alreadyLiked){
    this.likes = likes;
    this.alreadyLiked = alreadyLiked;
  }

  incrementLike() {
    this.likes++;
  }
}
