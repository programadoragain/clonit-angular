import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../subreddit/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  ROUTE_SERVER: string= "http://localhost:8080/";  

  constructor(private httpClient: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(this.ROUTE_SERVER + 'api/post/getAllPosts');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.httpClient.post(this.ROUTE_SERVER + 'api/posts/', postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(this.ROUTE_SERVER + 'api/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.httpClient.get<PostModel[]>(this.ROUTE_SERVER + 'posts/by-user/' + name);
  }
}