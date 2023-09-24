import { Program } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js';
import { Posts } from '@target/types/posts';

type PostsProgram = Program<Posts> | null;

interface ProgramResponse<T> {
  publicKey: PublicKey | null,
  account: T
}

export { PostsProgram, ProgramResponse };