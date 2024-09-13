const dialog = document.getElementById('dialog');
let txtTitl;
let txtDesc;
let txtFile;

function add(){
    txtTitl = document.getElementById('inpTitle');
    txtDesc = document.getElementById('inpDesc');
    txtFile = document.getElementById('inpFile');

    if (txtTitl.value == '' || txtDesc.value == '' || txtFile.value == ''){
        alert('Complete todos los campos');
        return -1;
    } else {
        createItem();
    }
}

function createItem(){
    const container = document.getElementById('photos');
    const photoItem = document.createElement('div');
    photoItem.classList.add('photo-item');
    
    const file = txtFile.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'Foto Test';

        const title = document.createElement('h2');
        title.textContent = txtTitl.value;

        const desc = document.createElement('p');
        desc.textContent = txtDesc.value;

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.setAttribute('onclick', 'deleteItem(this)');

        
        const overlayImg = document.createElement('img');
        overlayImg.src = '/images/borrar.png';
        overlayImg.alt = 'Eliminar';
        
        const overlayTitle = document.createElement('h2');
        overlayTitle.textContent = 'Eliminar Recuerdo';

        overlay.appendChild(overlayImg);
        overlay.appendChild(overlayTitle);

        photoItem.appendChild(img);
        photoItem.appendChild(title);
        photoItem.appendChild(desc);
        photoItem.appendChild(overlay);


        container.prepend(photoItem);

        saveToLocalStorage(photoItem, e.target.result, title.textContent, desc.textContent);
    };

    reader.readAsDataURL(file);

    closeDialog();
}

function deleteItem(overlayElement){
    const photoItem = overlayElement.closest('.photo-item'); 
    if (photoItem) {
        const items = JSON.parse(localStorage.getItem('photoItems')) || [];
        const imgSrc = photoItem.querySelector('img').src;
        const titleText = photoItem.querySelector('h2').textContent;

        const filteredItems = items.filter(item => !(item.imgSrc === imgSrc && item.title === titleText));
        
        localStorage.setItem('photoItems', JSON.stringify(filteredItems));

        photoItem.remove();
    }
}

function saveToLocalStorage(photoItem, imgSrc, titleText, descText) {
    let items = JSON.parse(localStorage.getItem('photoItems')) || [];
    
    const newItem = {
        imgSrc: imgSrc,
        title: titleText,
        desc: descText
    };

    items.push(newItem);
    localStorage.setItem('photoItems', JSON.stringify(items));
}

function loadItems() {
    const container = document.getElementById('photos');
    const items = JSON.parse(localStorage.getItem('photoItems')) || [];

    items.forEach(item => {
        const photoItem = document.createElement('div');
        photoItem.classList.add('photo-item');

        // Crear y añadir la imagen
        const img = document.createElement('img');
        img.src = item.imgSrc;
        img.alt = 'Foto Test';

        // Crear y añadir el título
        const title = document.createElement('h2');
        title.textContent = item.title;

        // Crear y añadir la descripción
        const desc = document.createElement('p');
        desc.textContent = item.desc;

        // Crear y añadir el overlay
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.setAttribute('onclick', 'deleteItem(this)'); 
        
        // Añadir contenido al overlay
        const overlayImg = document.createElement('img');
        overlayImg.src = '/images/borrar.png';
        overlayImg.alt = 'Eliminar';
        
        const overlayTitle = document.createElement('h2');
        overlayTitle.textContent = 'Eliminar Recuerdo';
        
        overlay.appendChild(overlayImg);
        overlay.appendChild(overlayTitle);

        // Añadir los elementos al photoItem
        photoItem.appendChild(img);
        photoItem.appendChild(title);
        photoItem.appendChild(desc);
        photoItem.appendChild(overlay);

        // Añadir el photoItem al contenedor
        container.appendChild(photoItem);

        container.prepend(photoItem);
    });
}

function openDialog(){
    dialog.showModal();
}

function closeDialog(){
    dialog.close();
}

document.addEventListener('DOMContentLoaded', loadItems);