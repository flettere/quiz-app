import { Routes } from "@angular/router";
import { TopicGuard } from "./topic.guard";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'start',
        pathMatch: 'full'
    },
    {
        path: 'start',
        loadChildren: () => import('./topic-choice/topic.routes').then(m => m.routes)
    },
    {
        path: 'quiz',
        loadChildren: () => import('./questions/questions.routes').then(m => m.routes),
        canLoad: [TopicGuard]
    },
    {
        path: '**',
        redirectTo: 'start'
    }
]