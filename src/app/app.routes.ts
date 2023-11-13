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
    },
    {
        path: 'quiz/:topic',
        loadComponent: () => import('./questions/questions.component').then((m) => m.QuestionsComponent)
    }
]