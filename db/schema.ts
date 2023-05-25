import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  primaryKey,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";

let default_url =
  "https://res.cloudinary.com/dwnvkwrox/image/upload/v1671018225/123456789.png";

export const Artists = mysqlTable("Artists", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }),
  followers: int("followers").default(0),
  follwoing: int("follwoing").default(0),
  songs: int("songs").default(0),
  cover: varchar("cover", { length: 256 }).default(default_url),
});

export const artists_relation = relations(Artists, ({ many }) => ({
  songs: many(Songs),
  artist: many(Follower),
  fan: many(Follower),
  like: many(Like),
  comment: many(Comments),
  trigger: many(Notification),
  nottifier: many(Notification),
}));

export const Songs = mysqlTable("Songs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  likes: int("likes").default(0),
  song: varchar("song", { length: 256 }).notNull(),
  cover: varchar("cover", { length: 256 }).notNull(),
  artist: int("artist"),
});

export const songs_relation = relations(Songs, ({ one, many }) => ({
  artist: one(Artists, {
    fields: [Songs.artist],
    references: [Artists.id],
  }),
  comment: many(Comments),
  like: many(Like),
  nottification: many(Notification),
}));

export const Follower = mysqlTable(
  "Follower",
  {
    artist: int("artist"),
    fan: int("fan"),
  },
  (table) => {
    return {
      pk: primaryKey(table.artist, table.fan),
    };
  }
);

export const follower_relation = relations(Follower, ({ one }) => ({
  artist: one(Artists, {
    fields: [Follower.artist],
    references: [Artists.id],
  }),
  fan: one(Artists, {
    fields: [Follower.fan],
    references: [Artists.id],
  }),
}));

export const Comments = mysqlTable("Comments", {
  id: serial("id").primaryKey(),
  details: varchar("details", { length: 999 }).notNull(),
  artist: int("artist"),
  song: int("song"),
});

export const comments_relation = relations(Comments, ({ one }) => ({
  artist: one(Artists, {
    fields: [Comments.artist],
    references: [Artists.id],
  }),
  song: one(Songs, {
    fields: [Comments.song],
    references: [Songs.id],
  }),
}));

export const Like = mysqlTable(
  "Like",
  {
    artist: int("artist"),
    song: int("song"),
  },
  (table) => {
    return {
      pk: primaryKey(table.artist, table.song),
    };
  }
);

export const like_relation = relations(Like, ({ one }) => ({
  artist: one(Artists, {
    fields: [Like.artist],
    references: [Artists.id],
  }),
  song: one(Songs, {
    fields: [Like.song],
    references: [Songs.id],
  }),
}));

export const Notification = mysqlTable("Notification", {
  id: serial("id").primaryKey(),
  trigger: int("trigger"),
  nottifier: int("nottifier"),
  song: int("song"),
  message: varchar("message", { length: 256 }).notNull(),
});

export const notification_relation = relations(Notification, ({ one }) => ({
  trigger: one(Artists, {
    fields: [Notification.trigger],
    references: [Artists.id],
  }),
  nottifier: one(Artists, {
    fields: [Notification.nottifier],
    references: [Artists.id],
  }),
  song: one(Songs, {
    fields: [Notification.song],
    references: [Songs.id],
  }),
}));
