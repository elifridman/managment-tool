import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TagListPageComponent} from "./pages/tag-list-page/tag-list-page.component";
import {TileListPageComponent} from "./pages/tiles-list-page/tiles-list-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";

const routes: Routes = [
  { path: 'tag-list', component: TagListPageComponent, children: [
      {
        path: 'new',
        component: TagListPageComponent,
      },
      {
        path: ':tagId/details',
        component: TagListPageComponent,
      },
    ], },
  { path: 'tile-list', component: TileListPageComponent },
  { path: '',   redirectTo: '/tag-list', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
