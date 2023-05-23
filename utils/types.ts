export interface IArtist {
  id: number;
  username: string;
  followers: number;
  following: number;
  songs: number;
  photo: string;
}

export interface ISong {
  id: number;
  name: string;
  song: string;
  cover: string;
  likes: number;
  artist: {
    id: number;
    username: string;
    photo: string;
  };
}

export interface IContextPlayer {
  setSong?: (song: ISong) => void;
}

export interface IContextJoin {
  setShow?: (value: boolean) => void;
}

export interface InboxCardType {
  trigger: number;
  nottifier: number;
  song: number | null;
  message: string;
  artist: {
    photo: string;
    username: string;
  };
}
