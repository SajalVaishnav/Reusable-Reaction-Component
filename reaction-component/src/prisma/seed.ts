import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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

    await prisma.post.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.reaction.deleteMany({})
    await prisma.reactionEmoji.deleteMany({})

    let seededUsers: { id: number; username: string; }[] = [];
    for (const u of userData) {
        const user = await prisma.user.create({
          data: u,
        })
        console.log(`Created user with id: ${user.id}`)
        seededUsers.push(user);
    }

    let seededReactionEmojis: { id: number; typeDetails: string; }[] = [];
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
        uid: seededUsers[0].id, 
        header: 'Header',
        content: 'Interesting content',
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
