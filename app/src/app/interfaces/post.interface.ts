import { PublicKey } from "@solana/web3.js";

interface Post {
  title: string | null;
  content: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  author: PublicKey
}

export { Post }