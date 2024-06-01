import { Routes } from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { AdsListComponent } from './ads/ads-list/ads-list.component';
import { AdDetailComponent } from './ads/ad-detail/ad-detail.component';
import { AdUploadComponent } from './ads/ad-upload/ad-upload.component';
import { MyAdsListComponent } from './ads/my-ads-list/my-ads-list.component';
import { FavAdsListComponent } from './ads/fav-ads-list/fav-ads-list.component';
import { AdEditComponent } from './ads/ad-edit/ad-edit.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {path: 'members', component: MemberListComponent, canActivate: [authGuard]},
            {path: 'members/:username', component: MemberDetailComponent},
            {path: 'myAdds', component: MyAdsListComponent},
            {path: 'myFavAds', component: FavAdsListComponent},
            {path: 'member/edit', component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard]},
            {path: 'lists', component: ListsComponent},
            {path: 'messages', component: MessagesComponent},
            {path: 'ads', component: AdsListComponent},
            {path: 'ads/upload', component: AdUploadComponent, canDeactivate: [preventUnsavedChangesGuard]},
            {path: 'ads/:id', component: AdDetailComponent},
            {path: 'ads/edit/:id', component: AdEditComponent, canDeactivate: [preventUnsavedChangesGuard]}
        ]
    },
    {path: 'errors', component: TestErrorComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'server-error', component: ServerErrorComponent},
    {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];
