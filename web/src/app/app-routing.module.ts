import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment, UrlMatchResult } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';

function i18nMatcher(regex: RegExp): (url: UrlSegment[]) => UrlMatchResult | null {
  function matcher(url: UrlSegment[]): UrlMatchResult | null {
    const [segment] = url;

    if (url.length === 1 && segment.path.match(regex)) {
      return {
        consumed: url,
      };
    }

    return null;
  }

  return matcher;
}

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    matcher: i18nMatcher(/^about|acerca-de$/gm),
    component: AboutComponent,
    pathMatch: 'full',
  },
  {
    matcher: i18nMatcher(/^portfolio|portafolio$/gm),
    component: PortfolioComponent,
    pathMatch: 'full',
  },
  {
    matcher: i18nMatcher(/^contact|contacto$/gm),
    component: ContactComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
