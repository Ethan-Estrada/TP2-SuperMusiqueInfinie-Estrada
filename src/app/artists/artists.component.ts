import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  artistFavoris ?: Artist[] = [];
  artistName : string = "";
  artist ?: Artist;
  jsonData : string | null = null;


  constructor(public spotify : SpotifyService) { }

  ngOnInit():void {
    this.spotify.connect();

    this.jsonData = localStorage.getItem("artiste");
    if(this.jsonData != null){
      this.artistFavoris = JSON.parse(this.jsonData);
    }

  }

  async getArtist() : Promise<void>{
    this.artist = await this.spotify.searchArtist(this.artistName);
    this.artistFavoris?.push(this.artist);
    this.saveArtist();
  }

  saveArtist(){
    localStorage.setItem("artiste", JSON.stringify(this.artistFavoris));
  }

  clearArtist(){
    localStorage.clear();
    window.location.reload();
  }

}
