import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryListComponent } from './story-list/story-list.component';
import { TimePassedPipe } from './timepassed.pipe';
import { GetDomainPipe } from './getdomain.pipe';
import { HeaderComponent } from './layout/header/header.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent,
    TimePassedPipe,
    GetDomainPipe,
    HeaderComponent,
    ItemDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
