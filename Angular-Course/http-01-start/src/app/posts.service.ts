import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "./post.model";
import { Subject, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  error = new Subject<String>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json",
        postData,
        { observe: "response" }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error = error.message;
        }
      );
  }

  fetchPosts() {
    const searchParams = new HttpParams()
      .set("print", "pretty")
      .set("custom", "key");

    return this.http
      .get<{ [key: string]: Post }>(
        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json",
        {
          headers: new HttpHeaders({ "Custom-Header": "Hello" }),
          params: searchParams,
        }
      )
      .pipe(
        map((responseData) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (!responseData.hasOwnProperty(key)) continue;
            postArray.push({ ...responseData[key], id: key });
          }
          return postArray;
        }),
        catchError((errorRes) => {
          //Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete<{ [key: string]: Post }>(
        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json",
        {
          observe: "events",
          responseType: "json",
        }
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            //when type is Sent, we cannont access body because we don't have one.
            console.log("Sent");
          }

          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
