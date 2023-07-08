import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { PostService } from '../post.service';
import { PostModel } from '../post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {

  faComments = faComments;
  @Input() posts: PostModel[] | undefined;

  constructor(private postService: PostService, private router: Router) {
    this.postService.getAllPosts().subscribe((post: PostModel[]) => {
      this.posts = post;
    });
  }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}