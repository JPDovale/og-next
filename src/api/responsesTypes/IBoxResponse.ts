export interface IImage {
  id: string
  image_filename: string
  image_url: string
  archive_id: string | null
}

export interface IArchive {
  id: string
  title: string
  description: string
  created_at: Date
  box_id: string | null
  project_id: string | null
  person_id: string | null
  book_id: string | null
  gallery?: IImage[]
}

export interface ITag {
  id: number
  name: string
  box_id: string | null
}
export interface IBoxResponse {
  id: string
  name: string
  description: string | null
  created_at: Date
  user_id: string
  tags?: ITag[]
  archives?: IArchive[]
}
