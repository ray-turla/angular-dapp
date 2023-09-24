import { Injectable } from '@angular/core';
import { AnchorProvider, Program, ProgramAccount, Wallet, web3 } from '@coral-xyz/anchor';
import { Posts } from '@target/types/posts';
import { PhantomProvider, PostsProgram, ProgramResponse } from 'src/app/interfaces';
import { Web3ProviderService } from '../web3provider/web3provider.service';
import posts from '@target/idl/posts.json';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../../interfaces';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  provider: PhantomProvider | null;
  private _posts = new BehaviorSubject<ProgramResponse<Post>[]>([])
  // private _posts= new BehaviorSubject<Post[]>([])
  readonly posts$ = this._posts.asObservable();
  private _selectedPost = new BehaviorSubject<ProgramResponse<Post> | null>(null)
  readonly selectedPost$ = this._selectedPost.asObservable()
  constructor(private web3Provider: Web3ProviderService) {
    this.provider = this.web3Provider.getProvider()
  }

  
  private getProgram = async (provider: any): Promise<PostsProgram> => {
    window.Buffer = window.Buffer || require("buffer").Buffer;
    let connection = this.web3Provider.connection;
    const anchorProvider = new AnchorProvider(connection, provider as Wallet, AnchorProvider.defaultOptions())
    return new Program<Posts>(
      await Program.fetchIdl(posts.metadata.address || "", anchorProvider) as Posts,
      new web3.PublicKey(posts.metadata.address || ""),
      anchorProvider
    )
  }

  getPosts = async () => {
    console.log("ENTER SERVICE GET POSTS")
    const program: PostsProgram =  await this.getProgram(this.provider)
    const response = await program?.account.post.all() as ProgramResponse<Post>[]
    // const posts = response.map(m => m.account)
    this._posts.next(response.sort(this.dateSortFn))
  }

  getPost = async () => {
    console.log("ENTER SERVICE GET SINGLE POST")
    const program: PostsProgram =  await this.getProgram(this.provider)
    const response = await program?.account.post.fetch(new web3.PublicKey("GaHDpPowCpbMqAGRURqExfZSQcxsa22UN3xCA1C1KNL5"))
    console.log(response)
  }

  selectedPost = (post: ProgramResponse<Post>): void => {
    this._selectedPost.next(post)
  }

  getSelectedPost = () => this._selectedPost.getValue()

  createPost = async <T>(postData: T): Promise<Boolean> => {
    const program: PostsProgram =  await this.getProgram(this.provider)
    const post_account = web3.Keypair.generate()
    const accounts = {
      post: post_account.publicKey,
      author: new web3.PublicKey(this.provider?.publicKey || ""),
      system_program: web3.SystemProgram.programId
    }

    try {
      const tx = await program?.methods.createPost(postData).accounts(accounts).signers([post_account]).rpc()
      console.log("Transaction Signature: ", tx)
      const newPost = await program?.account.post.fetch(accounts.post) as Post
      console.log("Created Post: ", newPost)
      this._posts.next([...this._posts.getValue(), {publicKey: accounts.post, account: newPost}].sort(this.dateSortFn))
      return true
    } catch (e) {
      console.log("ERROR ON CREATE POST: ", e)
      return false
    }
  }

  deletePost = async (postData: ProgramResponse<Post> | null): Promise<void> => {
    const program: PostsProgram =  await this.getProgram(this.provider)
    const accounts = {
      post: postData?.publicKey as web3.PublicKey,
      author: postData?.account.author as web3.PublicKey
    }
    
    console.log("TO DELETE: ", postData)

    try {
      const tx = await program?.methods.deletePost().accounts(accounts).rpc()

      console.log("Transaction Signature: ", tx)

      this._posts.next(
        this._posts.getValue().filter(p => p.publicKey?.toBase58() !== postData?.publicKey?.toBase58()).sort(this.dateSortFn)
      )

    } catch (e) {
      console.log("ERROR ON DELETE POST: ", e)
    }
  }

  updatePost = async <T>(postData: T, post: ProgramResponse<Post>): Promise<void> => {
    const program: PostsProgram =  await this.getProgram(this.provider)
    const accounts = {
      post: post?.publicKey as web3.PublicKey,
      author: post?.account.author as web3.PublicKey
    }
    
    console.log("TO UPDATE: ", postData)
    console.log("CURRENT POST", post)

    try {
      const tx = await program?.methods.updatePost(postData).accounts(accounts).rpc()

      console.log("Transaction Signature: ", tx)

      const updatedPost = postData as Post
      this._posts.next(
        this._posts.getValue().map(p => p.publicKey?.toBase58() === accounts.post.toBase58() ?{...post, account: {...post.account, title: updatedPost?.title, content: updatedPost?.content, updatedAt: updatedPost.updatedAt}}: p).sort(this.dateSortFn)
      )

      this.selectedPost(this._posts.getValue().filter(p => p.publicKey?.toBase58() === post.publicKey?.toBase58())[0])


    } catch (e) {
      console.log("ERROR ON UPDATE POST: ", e)
    }
  }

  sortCreated = () => this._posts.next(this._posts.getValue().sort(this.dateSortFn))

  dateSortFn = (a: ProgramResponse<Post>, b: ProgramResponse<Post>) => {
    let dateA = new Date(a.account.createdAt as string).valueOf()
    let dateB = new Date(b.account.createdAt as string).valueOf()
    return dateB - dateA
  }
}
