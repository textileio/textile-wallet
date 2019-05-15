import { PhotosState } from './reducer'
import { Item } from './models'

export const lastQueriedTime = (state: PhotosState) => state.queryData.lastQueriedTime

export const makeProcessingPhoto = (id: string) => (state: PhotosState) => state.processingPhotos[id]

export const items = (state: PhotosState) => {
  const filesItems = state.photosData.items
    .map((files): Item => {
      return { type: 'files', files }
    })
    .reverse()
  return filesItems

  // return Object.keys(state.processingPhotos).map((key): Item => {
  //   const processingPhoto = state.processingPhotos[key]
  //   return { type: 'processingItem', processingPhoto }
  // })
}
