import React from 'react'
import { FilePond, registerPlugin} from 'react-filepond'

import 'filepond/dist/filepond.min.css'

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginMediaPreview from 'filepond-plugin-media-preview'

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import 'filepond-plugin-media-preview/dist/filepond-plugin-media-preview.css'


registerPlugin(
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginMediaPreview
)

export default  function PondInput({files, setFiles, allowMultiple, maxFile, serverOptions, type, name, label, progressStatus}) {
        return (
            <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={allowMultiple}
            max-file={maxFile}
            acceptedFileTypes={type}
            server={serverOptions}
            name={name}
            labelIdle={label}
            onprocessfileprogress={progressStatus}
            />

        )
}
