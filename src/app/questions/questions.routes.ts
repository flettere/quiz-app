import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: ':topic',
        loadComponent: () => import('./questions.component').then((m) => m.QuestionsComponent),
    }
]