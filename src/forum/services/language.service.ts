import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import { IdAndLabel } from '../models/IdAndLabel.class';

@Injectable({
  providedIn: 'root'
})
export class LanguageService{

  private languagesObjectArray: IdAndLabel[] = [{ id: 'en', label: 'English'}, { id: 'de', label: 'Deutsch'}];
  private fallbackLang = 'de';

  constructor(public translateService: TranslateService, public router: Router) {
  }

  public initLocalization(): void {
      this.setLanguages(this.languagesObjectArray.map(value => value.id));
      this.getLanguageFromStorage();
  }

  private setLanguages(languages: string[]): void {
      this.translateService.addLangs(languages);
  }

  public getLanguages(): IdAndLabel[] {
      return this.languagesObjectArray;
  }

  public async changeLanguage(language: string): Promise<void> {
      const previousLanguage = this.translateService.currentLang;
      await this.translateService.use(language).toPromise();

      this.setLanguageToStorage(language);
      // reload view if actually changed

      if (previousLanguage && previousLanguage !== language) {
          this.reloadCurrentRoute();
      }
  }

  private setLanguageToStorage(language: string): void {
      localStorage.setItem('language', language);
  }

  public getLanguageFromStorage(): string {
      if (!localStorage.getItem('language'))
      {
          this.changeLanguage(this.fallbackLang);
          this.translateService.setDefaultLang(this.fallbackLang);
          return this.translateService.currentLang;
      }
      return localStorage.getItem('language');
  }

    private reloadCurrentRoute(): void {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/tmp', {skipLocationChange: true}).then(async () => {
            await this.router.navigateByUrl(currentUrl);
        });
    }


}
