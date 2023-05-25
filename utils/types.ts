export interface IArtist {
  id: number;
  followers: number;
  photo_url: string;
  username: string;
}

export interface ISong {
  id: number;
  song_name: string;
  song_cover_url: string;
  song_file_url: string;
  likes: number;
  artist_id: number;
  artist: {
    username: string;
  };
}

export interface IContextPlayer {
  setSong?: (song: ISong) => void;
}

export interface IContextJoin {
  setShow?: (value: boolean) => void;
}

export interface InboxCardType {
  id: number;
  trigger_id: number;
  nottifer_id: number;
  song_id: number | null;
  message_detail: string;
  trigger: {
    photo_url: string;
    username: string;
  };
}

export interface IComment {
  id: number;
  artist_id: number;
  song_id: number;
  details: string;
  artist: {
    username: string;
    photo_url: string;
  };
}
