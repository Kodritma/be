## Question

### Difficulty

Enum: "0" | "1" | "2" | "3"

"0" means the question is related to a video.

Other options indicate that the question is a general algorithm question.

## Playlist

| Method | Endpoint         | Request Body | Returns                |
| ------ | ---------------- | ------------ | ---------------------- |
| GET    | `/playlists`     | -            | `[{ ID, name, slug }]` |
| POST   | `/playlists`     | `{ name }`   | `{ ID, name, slug}`    |
| PUT    | `/playlists/:id` | `{ name }`   | `[{ VIDEO_DATA }]`     |

## Video

| Method | Endpoint      | Request Body                                                    | Returns                                                               |
| ------ | ------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- |
| GET    | `/videos`     | -                                                               | `[{ ID, url, title, description, playlist_order, playlistID, slug }]` |
| GET    | `/videos/:id` | -                                                               | `{ ID, url, title, description, playlist_order, playlistID, slug }`   |
| POST   | `/videos`     | `{ url, title, description, playlist_order, playlistID, slug }` | `{ ID, url, title, description, playlist_order, playlistID, slug }`   |
| PUT    | `/videos/:id` | `{ url, title, description, playlist_order, playlistID, slug }` | `{ ID, url, title, description, playlist_order, playlistID, slug }`   |
| DELETE | `/videos/:id` | -                                                               | -                                                                     |

## Authentication

> Authentication endpoints utilize http cookies saved in the browser. Front-end application does not have to send any request body or token in request header.

| Method | Endpoint       | Request Body | Returns                                                                                                                |
| ------ | -------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| GET    | `/auth/login`  | -            | `{ ID, display_name, email, first_name, isLoggedIn, is_admin, last_name, picture, slug, token, login, logout, check }` |
| GET    | `/auth/logout` | -            | -                                                                                                                      |
| GET    | `/auth/check`  | -            | `{ ID, display_name, email, first_name, isLoggedIn, is_admin, last_name, picture, slug, token, login, logout, check }` |
