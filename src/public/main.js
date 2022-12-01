

const noteForm = document.getElementById('noteForm')
const title = document.getElementById('title')
const description = document.getElementById('description')


noteForm.addEventListener('submit', (e) => {
    e.preventDefault()    

    if(saveId){
        updateNote(saveId, title.value, description.value)
    }else{
        saveNote(title.value, description.value)
    }

    title.value = ''
    description.value = ''

    title.focus()


})
