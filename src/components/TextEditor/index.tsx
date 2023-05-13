import { styled } from '@styles/index'
import { Editor } from '@tinymce/tinymce-react'
interface ITextEditorProps {
  initialValue?: string
  setValue: (newValue: string) => void
  permission?: 'edit' | 'view' | 'comment' | undefined
}

export function TextEditor({
  setValue,
  initialValue,
  permission,
}: ITextEditorProps) {
  return (
    <TextEditorContainer>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_API_EDITOR}
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks fullscreen',
            'insertdatetime media table paste wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat',
          allow_script_urls: false,
          allow_html_data_urls: false,
          allow_conditional_comments: true,
          allow_svg_data_urls: false,
          color_default_background: '#fff',
        }}
        disabled={permission !== 'edit'}
        onEditorChange={(e: string) => setValue(e)}
      />
    </TextEditorContainer>
  )
}

const TextEditorContainer = styled('div', {
  '.tox .tox-edit-area__iframe': {
    background: '$base700',
  },

  '.tox-promotion': {
    visibility: 'hidden',
  },

  padding: '$2',
})
