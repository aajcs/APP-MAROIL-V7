export class PhotoService {
  getImages() {
    return fetch('/assets/photos.json')
      .then((res) => res.json())
      .then((d) => d.data)
  }
}
