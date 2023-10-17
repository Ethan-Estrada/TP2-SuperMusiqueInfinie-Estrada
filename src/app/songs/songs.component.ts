import { Song } from './../models/song';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GoogleService } from '../services/google.service';

const youtubeURL = "https://www.youtube.com/embed/";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  albumId: string | null = null;
  artistName: string | null = null;
  listsongs?: Song[] = [];
  albumName:string | undefined;

  videoId : string = "";
  videoUrl ?: SafeResourceUrl;

  constructor(public route: ActivatedRoute, public spotify: SpotifyService,public sanitizer : DomSanitizer, public google : GoogleService) { }

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get("id");
    this.artistName = this.route.snapshot.paramMap.get("artiste");
    this.getSongs();
  }

  async getSongs(): Promise<void> {
    this.listsongs = await this.spotify.searchSongs(this.albumId);
    this.albumName = this.listsongs.at(0)?.albumName;
  }

  async searchVideo(song:string):Promise<void>{
    this.videoId = await this.google.searchVideoId(song);
    this.videoUrl = youtubeURL + this.videoId;
  }


}
