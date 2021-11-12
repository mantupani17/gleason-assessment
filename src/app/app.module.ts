import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { SigninComponent } from './Auth/signin/signin.component';
import { HeaderComponent } from './Templates/header/header.component';
import { FooterComponent } from './Templates/footer/footer.component';
import { ContentComponent } from './Templates/content/content.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthgaurdService } from './authgaurd.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    DashboardComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    AuthgaurdService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
