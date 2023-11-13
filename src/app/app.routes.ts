import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'start',
        pathMatch: 'full'
    },
    {
        path: 'start',
        loadComponent: () => import('./topic-choice/topic-choice.component').then((m) => m.TopicChoiceComponent)
    }
]