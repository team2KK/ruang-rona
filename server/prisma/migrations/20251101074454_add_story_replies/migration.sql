-- CreateTable
CREATE TABLE `story_replies` (
    `id` VARCHAR(191) NOT NULL,
    `storyId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `isAnonymous` BOOLEAN NOT NULL DEFAULT true,
    `upvoteCount` INTEGER NOT NULL DEFAULT 0,
    `downvoteCount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `story_replies_storyId_idx`(`storyId`),
    INDEX `story_replies_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reply_votes` (
    `id` VARCHAR(191) NOT NULL,
    `replyId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `voteType` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `reply_votes_replyId_idx`(`replyId`),
    INDEX `reply_votes_userId_idx`(`userId`),
    UNIQUE INDEX `reply_votes_replyId_userId_key`(`replyId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `story_replies` ADD CONSTRAINT `story_replies_storyId_fkey` FOREIGN KEY (`storyId`) REFERENCES `stories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `story_replies` ADD CONSTRAINT `story_replies_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reply_votes` ADD CONSTRAINT `reply_votes_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `story_replies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reply_votes` ADD CONSTRAINT `reply_votes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
