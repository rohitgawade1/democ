

export const convertAfterImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            resolve(fileReader.result)
            // setafterDocument(fileReader.result.split(",")[1])
        }

        fileReader.onerror = (error) => {
            reject(error)
        }

        // if (file.size >= "16000000") {
        //     setafterImageSizeError("Please upload a file smaller than 2 MB")
        // }

    })
}