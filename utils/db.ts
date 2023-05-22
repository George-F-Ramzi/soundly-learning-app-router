import loki from "lokijs";
import {
  artists_data,
  comments_data,
  followers_data,
  likes_data,
  notification_data,
  songs_data,
} from "./base_data";

let mem = new loki.LokiMemoryAdapter();
let db = new loki("soundly.db", { adapter: mem });

let artists = db.addCollection("artists");
let songs = db.addCollection("songs");
let likes = db.addCollection("likes");
let followers = db.addCollection("followers");
let comments = db.addCollection("comments");
let notification = db.addCollection("notification");

artists.insert(artists_data);
songs.insert(songs_data);
comments.insert(comments_data);
likes.insert(likes_data);
followers.insert(followers_data);
notification.insert(notification_data);

export { artists, songs, likes, followers, comments, notification };
