import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, APP_INITIALIZER, Injector, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateService, TranslateModule, TranslateLoader, TranslateStore } from "@ngx-translate/core";
import { MessageService } from "primeng/api";
import { PageheaderComponent } from "src/forum/components/pageheader/pageheader.component";
import { CreatePostComponent } from "src/forum/components/post/create-post/create-post.component";
import { EditPostComponent } from "src/forum/components/post/edit-post/edit-post.component";
import { ListPostsComponent } from "src/forum/components/post/list-posts/list-posts.component";
import { QuotePostComponent } from "src/forum/components/post/quote-post/quote-post.component";
import { ViewPostComponent } from "src/forum/components/post/view-post/view-post.component";
import { ForumSearchResultsComponent } from "src/forum/components/search/forum-search-results/forum-search-results.component";
import { ForumSearchComponent } from "src/forum/components/search/forum-search.component";
import { CreateThreadComponent } from "src/forum/components/thread/create-thread/create-thread.component";
import { FilterThreadComponent } from "src/forum/components/thread/filter-thread/filter-thread.component";
import { ListThreadsComponent } from "src/forum/components/thread/list-threads/list-threads.component";
import { ViewThreadComponent } from "src/forum/components/thread/view-thread/view-thread.component";
import { VoteComponent } from "src/forum/components/vote/vote.component";
import { ForumPageComponent } from "src/forum/pages/forum-page/forum-page.component";
import { ForumSearchPageComponent } from "src/forum/pages/search/forum-search-page.component";
import { CreateThreadPageComponent } from "src/forum/pages/thread/create-thread-page/create-thread-page.component";
import { ThreadViewPageComponent } from "src/forum/pages/thread/thread-view-page/thread-view-page.component";
import { StaticInjectorService } from "src/forum/services/static-injector.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LanguageService } from "src/forum/services/language.service";
import {ButtonModule} from 'primeng/button';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function appInitializerFactory(translate: TranslateService, languageService: LanguageService) {
  return () => {
    const langToSet = languageService.getLanguageFromStorage();
    translate.setDefaultLang(langToSet);
    return translate.use(langToSet).toPromise();
  };
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    ButtonModule,
  ],
  declarations: [
    AppComponent,
    PageheaderComponent,
    ForumPageComponent,
    ListPostsComponent,
    CreatePostComponent,
    CreateThreadComponent,
    ListThreadsComponent,
    CreateThreadPageComponent,
    ThreadViewPageComponent,
    ViewThreadComponent,
    ViewPostComponent,
    QuotePostComponent,
    VoteComponent,
    EditPostComponent,
    ForumSearchComponent,
    ForumSearchPageComponent,
    ForumSearchResultsComponent,
    FilterThreadComponent,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, LanguageService, Injector, TranslateLoader],
      multi: true
    },
    MessageService,
    LanguageService,
    TranslateService,
    TranslateStore,
],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(
    private injector: Injector
  ) {
    StaticInjectorService.init(injector);
  }
}
