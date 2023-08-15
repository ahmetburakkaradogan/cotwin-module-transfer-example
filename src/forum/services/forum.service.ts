import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pageable } from "../models/Pageable.class";
import { PagedModelEntityModelPostDto } from "../models/post/paged-model-entity-model-post-dto";
import { PostDto } from "../models/post/post-dto";
import { PostRequestBodyDto } from "../models/post/post-request-body-dto";
import { PagedModelEntityModelThreadDto } from "../models/thread/paged-model-entity-model-thread-dto";
import { ThreadDetailDto } from "../models/thread/thread-detail-dto";
import { ThreadDto } from "../models/thread/thread-dto";
import { ThreadRequestBodyDto } from "../models/thread/thread-request-body-dto";
import { ThreadSearchDto } from "../models/thread/thread-search-dto";
import { VoteDto } from "../models/vote/vote-dto";
import { ApiServiceAbstract } from "./api-service.abstract";
import { PagedModeEntityDto } from "../models/paged-mode-entity-dto";


class VoteRequestBodyDto {
}

@Injectable({
  providedIn: 'root'
})
export class ForumService extends ApiServiceAbstract {

  // Thread

  public getThreadList(filter: ThreadSearchDto, pageable: Pageable): Observable<PagedModelEntityModelThreadDto> {
    let params = {...filter, ...pageable};
    params = this.removeUndefinedAndNull(params);

    return this.getForPageableObject<PagedModelEntityModelThreadDto>('/threads', params);
  }

  public searchThreads(query: String, pageable: Pageable): Observable<PagedModeEntityDto<ThreadDetailDto>> {
    let params = {query: query, ...pageable};
    params = this.removeUndefinedAndNull(params);

    return this.getForPageableObject<PagedModeEntityDto<ThreadDto>>('/threads/search', params);
  }


  public getThreadById(id: string): Observable<ThreadDto> {
    return this.getForObject<ThreadDto>(`/threads/${id}`, {});
  }

  public createThread(create: ThreadRequestBodyDto): Observable<ThreadDto> {
    const createFiltered = this.removeUndefinedAndNull(create);
    return this.postForObject<ThreadDto>(`/threads`, createFiltered, {});
  }

  public updateThread(id: string, update: ThreadRequestBodyDto): Observable<ThreadDto> {
    const updateFiltered = this.removeUndefinedAndNull(update);
    return this.putForMultipart<ThreadDto>(`/threads/${id}`, updateFiltered, {});
  }

  public deleteThread(id: string): Observable<any> {
    return this.delete<any>(`/threads/${id}`);
  }


  // Post
  public getPostList(): Observable<PostDto[]> {
    return this.getForObject<PostDto[]>('/posts', {});
  }

  public getPostById(id: string): Observable<PostDto> {
    return this.getForObject<PostDto>(`/posts/${id}`, {});
  }

  public createPost(create: PostRequestBodyDto): Observable<PostDto> {
    const createFiltered = this.removeUndefinedAndNull(create);
    return this.postForObject<PostDto>(`/posts`, createFiltered, {});
  }

  public updatePost(id: string, update: PostRequestBodyDto): Observable<PostDto> {
    const updateFiltered = this.removeUndefinedAndNull(update);
    return this.putForMultipart<PostDto>(`/posts/${id}`, updateFiltered, {});
  }

  public deletePost(id: string): Observable<any> {
    return this.delete<any>(`/posts/${id}`);
  }

  public getPostListByThreadId(id: string, filter: ThreadSearchDto, pageable: Pageable): Observable<PagedModelEntityModelPostDto> {
    let params = {...filter, ...pageable};
    params = this.removeUndefinedAndNull(params);

    return this.getForPageableObject<PagedModelEntityModelPostDto>(`/posts/byThread/${id}`, params);
  }

  // Votes

  public getVoteList(): Observable<VoteDto[]> {
    return this.getForObject<VoteDto[]>('/votes', {});
  }

  public getVoteById(id: string): Observable<VoteDto> {
    return this.getForObject<VoteDto>(`/votes/${id}`, {});
  }

  public createVote(create: VoteRequestBodyDto): Observable<VoteDto> {
    const createFiltered = this.removeUndefinedAndNull(create);
    return this.postForObject<VoteDto>(`/votes`, createFiltered, {});
  }

  public updateVote(id: string, update: VoteRequestBodyDto): Observable<VoteDto> {
    const updateFiltered = this.removeUndefinedAndNull(update);
    return this.putForMultipart<VoteDto>(`/votes/${id}`, updateFiltered, {});
  }

  public deleteVote(id: string): Observable<any> {
    return this.delete<any>(`/votes/${id}`);
  }

  public getVoteListByPostId(id: string): Observable<VoteDto[]> {
    return this.getForObject<VoteDto[]>(`/votes/byPost/${id}`, {});
  }
}
