import { Show } from './../models/show';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';


const key: string = "2b32475766802ac01eefda45e9e42ea0";

@Injectable({
  providedIn: 'root'
})
export class BandsintownService {

  artistShows: Show[] = [];

  constructor(public http: HttpClient) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async searchShows( artist?: string | null): Promise<Show[]> {
  this.artistShows = [];

    let x = await lastValueFrom(this.http.get<any>('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=' + key));
    for(let i = 0; i < x.length; i++){
      this.artistShows.push(new Show(x[i].datetime, x[i].venue.country, x[i].venue.city, x[i].venue.latitude, x[i].venue.longitude));
    }

    return this.artistShows;
  }
}
