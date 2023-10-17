import { Song } from './../models/song';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Album } from '../models/album';
import { Artist } from '../models/artist';

const CLIENT_ID: string = "e1d2e41666564add9a7307b7ca5358f1";
const CLIENT_SECRET: string = "e26fd840782f45298657db24845aba0f";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyToken: string | null = null;

  albumsListe: Album[] = [];

  songsListe: Song[] = [];

  constructor(public http: HttpClient) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async connect(): Promise<void> {
    let body = new HttpParams().set('grant_type', 'client_credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      })
    };
    let x = await lastValueFrom(this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), httpOptions));
    console.log(x);
    this.spotifyToken = x.access_token;
  }

  async searchArtist(artist: string): Promise<Artist> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.spotifyToken
      })
    };

    let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artist, httpOptions));
    console.log(x);
    return new Artist(x.artists.items[0].id, x.artists.items[0].name, x.artists.items[0].images[0].url);
  }

  async searchAlbums(artist: string | null): Promise<Album[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.spotifyToken
      })
    };

    let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/artists/' + artist + '/albums?include_groups=album,single', httpOptions));
    this.albumsListe = [];
    x.items.forEach((album: any) => {
      this.albumsListe.push(new Album(album.id, album.artists[0].name, album.name, album.images[0].url));
    });
    return this.albumsListe;
  }

  async searchSongs(albumId: string | null): Promise<Song[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.spotifyToken
      })
    };

    let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/albums/' + albumId, httpOptions))
    this.songsListe = [];
    console.log(x);
    for(let i = 0; i < x.tracks.items.length; i++){
      this.songsListe.push(new Song(x.name,x.tracks.items[i].name))
    }
    console.log(this.songsListe);

    return this.songsListe;

  };

}






