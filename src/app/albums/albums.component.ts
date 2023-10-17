import { Album } from './../models/album';
import { SpotifyService } from '../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  artiste : string | null = null;
  listAlbums?: Album[]=[];
  nomArtist:string | undefined;

  constructor( public route : ActivatedRoute, public spotify: SpotifyService) { }

  ngOnInit() {
    this.artiste = this.route.snapshot.paramMap.get("artiste");
    this.getAlbum();

  }

  async getAlbum() : Promise<void>{
    this.listAlbums = await this.spotify.searchAlbums(this.artiste);
    this.nomArtist = this.listAlbums.at(0)?.artistName;
    console.log(this.spotify.albumsListe);
  }

}
