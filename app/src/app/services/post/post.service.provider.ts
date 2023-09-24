import { Web3ProviderService } from "../web3provider/web3provider.service";
import { PostService } from "./post.service";

export const PostServiceProvider = {
  provide: PostService,
  useFactory: (web3ProviderService: Web3ProviderService) => {
    return new PostService(web3ProviderService)
  },
  deps: [Web3ProviderService]
}