-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "cover" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "ownerId" INTEGER NOT NULL,
    CONSTRAINT "Book_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("author", "cover", "createdAt", "id", "ownerId", "progress", "title", "updateAt") SELECT "author", "cover", "createdAt", "id", "ownerId", "progress", "title", "updateAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
