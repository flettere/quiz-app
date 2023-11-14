import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicGuard implements CanLoad {
  topics = ['angular', 'react', 'vue'];

  constructor(private router: Router){}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.topics.includes(segments[segments.length - 1].path)) {
      this.router.navigate(['/start']);
    }
    return true;
  }
}
