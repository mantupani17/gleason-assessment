import { Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { SigninComponent } from "./Auth/signin/signin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserComponent } from "./user/user.component";

export const appRoutes : Routes = [
    { path:'login', component: SigninComponent, children:[
        { path:'', component:SigninComponent }
    ]},
    { path:'' , redirectTo: '/login', pathMatch:'full'},
    { path: 'dashboard' , component: DashboardComponent, canActivate:[AuthGuard] },
    { path: 'user-management' , component: UserComponent, canActivate:[AuthGuard] },
    // { path: 'todo-analytics' , component:TodoAnalyticsComponent, canActivate:[AuthGuard]},
    // { path: 'students' , component:StudentsComponent, canActivate:[AuthGuard]},
    // { path: 'upload' , component:UploadComponent, canActivate:[AuthGuard]}
];