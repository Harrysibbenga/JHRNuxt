<template>
  <div>
    <ckeditor
      :editor="editor"
      :config="editorConfig"
      :value="content"
      @input="(content) => $emit('update:content', content)"
    ></ckeditor>
  </div>
</template>

<script>
let ClassicEditor
let CKEditor
if (process.client) {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
  CKEditor = require('@ckeditor/ckeditor5-vue2')
} else {
  CKEditor = { component: { template: '<div></div>' } }
}
export default {
  components: {
    ckeditor: CKEditor.component,
  },
  props: {
    content: {
      type: String,
      required: true,
      default: 'Enter text here',
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        fontFamily: {
          options: [
            'default',
            'Ubuntu, Arial, sans-serif',
            'Ubuntu Mono, Courier New, Courier, monospace',
          ],
          supportAllValues: true,
        },
        fontSize: {
          options: [9, 11, 13, 'default', 17, 19, 21],
        },
        fontColor: {
          colors: [
            {
              color: 'hsl(0, 0%, 0%)',
              label: 'Black',
            },
            {
              color: '#010e5c',
              label: 'Blue',
            },
            {
              color: '#cba052',
              label: 'Yellow',
            },
            {
              color: 'hsl(0, 0%, 30%)',
              label: 'Dim grey',
            },
            {
              color: 'hsl(0, 0%, 60%)',
              label: 'Grey',
            },
            {
              color: 'hsl(0, 0%, 90%)',
              label: 'Light grey',
            },
            {
              color: 'hsl(0, 0%, 100%)',
              label: 'White',
              hasBorder: true,
            },
          ],
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3',
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4',
            },
            {
              model: 'heading5',
              view: 'h5',
              title: 'Heading 5',
              class: 'ck-heading_heading5',
            },
          ],
        },
        link: {
          // Automatically add target="_blank" and rel="noopener noreferrer" to all external links.
          addTargetToExternalLinks: true,
          // Let the users control the "download" attribute of each link.
          decorators: [
            {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'download',
              },
            },
          ],
        },
        toolbar: [
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          '|',
          'imageUpload',
          'insertTable',
          '|',
          'alignment',
          'outdent',
          'indent',
          '|',
          'link',
          'undo',
          'redo',
        ],
        language: 'en',
        image: {
          toolbar: [
            'imageTextAlternative',
            '|',
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageStyle:alignLeft',
            'imageStyle:alignRight',
            'imageStyle:alignCenter',
          ],
          styles: ['full', 'alignLeft', 'alignRight', 'side', 'alignCenter'],
        },
        alignment: {
          options: ['left', 'right'],
        },
        tableProperties: {
          borderColors: [
            {
              color: 'hsl(0, 0%, 0%)',
              label: 'Black',
            },
            {
              color: '#010e5c',
              label: 'Blue',
            },
            {
              color: '#cba052',
              label: 'Yellow',
            },
            {
              color: 'hsl(0, 0%, 30%)',
              label: 'Dim grey',
            },
            {
              color: 'hsl(0, 0%, 60%)',
              label: 'Grey',
            },
            {
              color: 'hsl(0, 0%, 90%)',
              label: 'Light grey',
            },
            {
              color: 'hsl(0, 0%, 100%)',
              label: 'White',
            },
          ],
          backgroundColors: [
            {
              color: 'hsl(0, 0%, 0%)',
              label: 'Black',
            },
            {
              color: '#010e5c',
              label: 'Blue',
            },
            {
              color: '#cba052',
              label: 'Yellow',
            },
            {
              color: 'hsl(0, 0%, 30%)',
              label: 'Dim grey',
            },
            {
              color: 'hsl(0, 0%, 60%)',
              label: 'Grey',
            },
            {
              color: 'hsl(0, 0%, 90%)',
              label: 'Light grey',
            },
            {
              color: 'hsl(0, 0%, 100%)',
              label: 'White',
            },
          ],
        },
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties',
          ],
        },
      },
    }
  },
}
</script>
