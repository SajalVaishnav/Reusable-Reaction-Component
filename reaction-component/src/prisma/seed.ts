import { PrismaClient, Prisma } from '@prisma/client';
import { User, ReactionEmoji } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Deletes all existing entries
    {
      const tablenames = await prisma.$queryRaw<
        Array<{ tablename: string }>
      >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

      const tables = tablenames
        .map(({ tablename }) => tablename)
        .filter((name) => name !== '_prisma_migrations')
        .map((name) => `"public"."${name}"`)
        .join(', ')

      try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
      } catch (error) {
        console.log({ error })
      }
    }

    const userData = [
        { username: 'johndoe0' },
        { username: 'johndoe1' },
        { username: 'johndoe2' },
        { username: 'johndoe3' },
        { username: 'johndoe4' },
    ] satisfies Prisma.UserCreateInput[]

    const reactionEmojis = [
        { typeDetails: '❤️' },
        { typeDetails: '👍' },
        { typeDetails: '😉' },
        { typeDetails: '😂' },
        { typeDetails: '😅' },
    ] satisfies Prisma.ReactionEmojiCreateInput[]
    
    let seededUsers: User[] = [];
    for (const u of userData) {
        const user = await prisma.user.create({
          data: u,
        })
        console.log(`Created user with id: ${user.id}`)
        seededUsers.push(user);
    }

    let seededReactionEmojis: ReactionEmoji[] = [];
    for (const r of reactionEmojis) {
        const reaction = await prisma.reactionEmoji.create({
          data: r,
        })
        console.log(`Created reaction with id: ${reaction}`)
        seededReactionEmojis.push(reaction);
    }
    
    // Seed Post
    const mockPost = await prisma.post.create({
        data: {
        uId: seededUsers[0].id, 
        title: 'This is the Discussion Title',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut re et doshu dgna aliqua. Ut enim ad minim veniam, quis...',
        },
    });

    // Seed Reactions
    const reactions = await prisma.reaction.createMany({
        data: [
        { postId: mockPost.id, uId: seededUsers[0].id, reactionEmojiId: seededReactionEmojis[0].id }, 
        { postId: mockPost.id, uId: seededUsers[1].id, reactionEmojiId: seededReactionEmojis[1].id },
        { postId: mockPost.id, uId: seededUsers[2].id, reactionEmojiId: seededReactionEmojis[2].id },
        { postId: mockPost.id, uId: seededUsers[3].id, reactionEmojiId: seededReactionEmojis[3].id },
        { postId: mockPost.id, uId: seededUsers[4].id, reactionEmojiId: seededReactionEmojis[4].id }, 
        ],
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
