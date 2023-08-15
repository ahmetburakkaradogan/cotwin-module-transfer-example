import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumPageComponent } from 'src/forum/pages/forum-page/forum-page.component';
import { ForumSearchPageComponent } from 'src/forum/pages/search/forum-search-page.component';
import { CreateThreadPageComponent } from 'src/forum/pages/thread/create-thread-page/create-thread-page.component';
import { ThreadViewPageComponent } from 'src/forum/pages/thread/thread-view-page/thread-view-page.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: ForumPageComponent},
    {path: ForumPageComponent.ROUTE.substring(1), component: ForumPageComponent},
    {path: ForumSearchPageComponent.ROUTE.substring(1), component: ForumSearchPageComponent},
    {path: ThreadViewPageComponent.ROUTE.substring(1), component: ThreadViewPageComponent},
    {path: CreateThreadPageComponent.ROUTE.substring(1), component: CreateThreadPageComponent}
  ])],
  exports: [RouterModule]

})
export class AppRoutingModule { }
