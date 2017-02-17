import { UploadComponent } from './../../components/upload/upload';
import { Cards } from './../../providers/cards';
import { Storage } from '@ionic/storage';
import { ApiHelper } from './../../providers/api-helper';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, Content, ToastController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-front',
  templateUrl: 'front.html'
})
export class FrontPage {

  @ViewChild(Content) content: Content;
  private checker: boolean = false;
  private cardList: Cards[] = [];
  private times = 0;
  private posts = 20;
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiHelper: ApiHelper,
    private storage: Storage, private detector: ChangeDetectorRef, private card: Cards,
    private toastCtrl: ToastController, private modalCtrl: ModalController) { }

  fetchMediaListData(event?) {
    this.apiHelper.getMedia(this.times * 20, this.posts)
      .map(res => res.json())
      .subscribe(mediaList => {
        let length = mediaList.length;
        let i = 0;
        let check = false;
        mediaList
          .map(media => {
            if (++i === length) { check = true; }
            let card: Cards = new Cards();
            this.fetchMediaData(media, card, check, event);
          });
      });
  }

  fetchMediaData(media, card, check, event?) {
    this.apiHelper.getFile(media.file_id)
      .map(res => res.json())
      .subscribe(media => {
        card.setMedia(media.title, media.description, media.time_added, media.media_type, media.mime_type, media.filename, media.file_id);
        this.fetchUserData(media, card, check, event);
      });
  }

  fetchUserData(media, card, check, event?) {
    this.storage.get('userToken')
      .then(token => {
        this.apiHelper.getUser(media.user_id, token)
          .map(res => res.json())
          .subscribe(user => {
            card.setUser(user.username);
            this.fetchCommentsData(media, card, check, event);
          });
      });
  }

  fetchCommentsData(media, card, check, event?) {
    this.apiHelper.getCommentsOfFile(media.file_id)
      .map(res => res.json())
      .subscribe(comments => {
        card.setComments(comments.length);
        this.fetchLikesData(media, card, check, event);
      });
  }

  fetchLikesData(media, card, check, event?) {
    this.apiHelper.requestFavouritesById(media.file_id)
      .map(res => res.json())
      .subscribe(likes => {
        this.storage.get('userID').then(ID => {
          let alreadyLiked = false;
          likes.map(like => {
            if (like.file_id == media.file_id && like.user_id == ID) {
              alreadyLiked = true;
            }
          });
          card.setLikes(likes.length, alreadyLiked);
          this.finalizeCardList(card, check, event);
        });
      });
  }

  finalizeCardList(card, check, event?) {
    this.cardList.push(card);
    if (event && check) {
      event.complete();
    };
  }

  ionViewDidLoad() {
    this.fetchMediaListData();
  }

  refresh(event?) {
    this.cardList = [];
    this.fetchMediaListData(event);
  }

  getMore(event) {
    this.times++;
    this.checker = true;
    this.fetchMediaListData(event);
  }

  goUp(event) {
    this.content.scrollToTop().then(res => {
      this.cardList = [];
      this.times = 0;
      this.checker = false;
      this.fetchMediaListData();
    });
  }

  like(event, card) {
    this.storage.get('userToken').then(token => {
      let data = {
        file_id: card.fileID
      };
      this.apiHelper.favourite(data, token).subscribe(res => {
        card.incrementLike();
      }, error => {
        let toast = this.toastCtrl.create({
          message: 'like already added',
          duration: 1000,
          position: 'middle'
        });
        toast.present();
      });
    });
  }

  comment(card) {

  }

  logOut(event) {
    this.storage.clear();
  }

  upload(event) {
    let modal = this.modalCtrl.create(UploadComponent);
    modal.present();
    modal.onDidDismiss(data => {
      this.cardList = [];
      this.fetchMediaListData();
    });
  }


}
