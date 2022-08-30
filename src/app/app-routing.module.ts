import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {ManagementToolPageComponent} from "./pages/management-tool-page/management-tool-page.component";

const routes: Routes = [
  { path: 'tag-list', component: ManagementToolPageComponent, data: {pageType: 'tags' } },
  { path: 'tile-list', component: ManagementToolPageComponent, data: {pageType: 'tiles' } },
  { path: '',   redirectTo: '/tag-list', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
