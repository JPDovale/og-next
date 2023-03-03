import { styled } from '@og-ui/react'
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
        apiKey="ac8wrme08a5w1b4hv0glq02gzp61kn4gc049y8znk9w1re1k"
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
        onEditorChange={(e) => setValue(e)}
      />
    </TextEditorContainer>
  )
}

const TextEditorContainer = styled('div', {
  '.tox .tox-edit-area__iframe': {
    background: '$base700',
  },

  padding: '$2',
})
