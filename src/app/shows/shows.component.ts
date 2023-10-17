import { Bandsintown } from './../../../../../../$RECYCLE.BIN/S-1-5-21-753748746-4169569375-1234410340-1001/$RFTFYOP';
import { Show } from './../models/show';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BandsintownService } from '../services/bandsintown.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  artiste: string | null = null;
  Shows: Show[] = [];
  show?: Show;

  center : google.maps.LatLngLiteral = {lat: 40, lng: -73};
  zoom : number = 3;
  markerPositions : google.maps.LatLngLiteral[] = [];

  constructor(public route: ActivatedRoute, public bandsintown: BandsintownService) { }

  ngOnInit() {
    this.artiste = this.route.snapshot.paramMap.get("artiste");
    this.getShow();
  }

  async getShow() : Promise<void> {
    this.Shows = await this.bandsintown.searchShows(this.artiste);
    console.log(this.Shows);
    this.addMarker();
  }

  addMarker():void{
    for(let i = 0; i < this.Shows.length; i++){
      this.markerPositions.push({lat: Number(this.Shows[i].latitude), lng : Number(this.Shows[i].longitude)});
    }
  }

}
