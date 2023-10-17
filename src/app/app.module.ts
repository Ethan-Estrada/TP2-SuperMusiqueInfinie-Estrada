import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { YoutubePipe } from './pipes/youtube.pipe';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ShowsComponent } from './shows/shows.component';
import { SongsComponent } from './songs/songs.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
      AppComponent,
      ShowsComponent,
      AlbumsComponent,
      ArtistsComponent,
      SongsComponent,
      YoutubePipe
   ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:"", redirectTo:"/artists", pathMatch:"full"},
      {path: "artists", component: ArtistsComponent},
      {path: "albums/:artiste", component: AlbumsComponent},
      {path: "albums", component: AlbumsComponent},
      {path: "shows/:artiste", component: ShowsComponent},
      {path: "shows", component: ShowsComponent},
      {path:"songs/:id/:artiste", component: SongsComponent},
      {path:"songs", component: SongsComponent},
    ]),
    GoogleMapsModule,
    YouTubePlayerModule,
    TranslateModule.forRoot({
      loader : {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })


  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
